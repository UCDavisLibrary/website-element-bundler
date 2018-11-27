import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-label/iron-label.js';

import template from "./template.js";
import style from "./style.js";

import LightDom from './light-dom.js';


class LibrarySearchDB extends Mixin(PolymerElement)
.with(LightDom) {
    static get template(){
        return html([template + style]);
      }

  static get is() { return 'library-search-db'; }
  static get properties() {
    return {
      subjects: {
          type: Array,
          value: [],
      },
      materials: {
          type: Array,
          value: [],
      },
      verbose: {
        type: Boolean
      },
      library_url: {
          type: String,
          value: "https://www.library.ucdavis.edu"
      },
      api_base_url: {
        type: String,
        value: "/wp-json"
      },
      api_materials_url: {
        type: String,
        value: "/wp/v2/categories"
      },
      api_subjects_url: {
        type: String,
        value: "/wp/v2/categories"
      },
      vpn_url: {
        type: String,
        computed: "_vpn_url(library_url)"
      },
      query: {
        type: Object
      },
      a11y_target: {
        type: Object,
      }
    };
  }

  static get observers() {
    return [
        '_query_change(query.*)'
    ]
  }
  constructor() {
      super();
  }

  ready(){
      super.ready();
      this.a11y_target = this.$.db_search_input;
      var element = this;
      if (this.verbose){
        console.log("Advanced database search widget loaded.");
      }
      this.reset_query();
      this.fetch_filters();

      this.$.db_search_input.addEventListener('iron-input-validate', function(){
        /* Listener for search box. */
        element.set("query.q", element.$.db_search_input.bindValue);
      })

  }

  reset_query(){
    /* Restores query object and form elements to default values. */

    var query = {"q": "",
                 "material": "any",
                 "subject": "any",
                 "check_everyone": true,
                 "check_vpn": true
    };
    this.set('query', query);

    this.$.materials_button.textContent = "Any Material";
    this.$.subjects_button.textContent = "Any Subject";

  }

  submit_query(){
    /* Constructs query string from object and redirects traffic */

    var send_traffic_to = this.library_url + "/?post_type=database";

    if (this.query['q'] != "") {
        send_traffic_to += "&s=" + encodeURIComponent(this.query['q']);
    }
    if (this.query['material'] != "any") {
        send_traffic_to += "&material=" + encodeURIComponent(this.query['material']);
    }
    if (this.query['subject'] != "any") {
        send_traffic_to += "&subject=" + encodeURIComponent(this.query['subject']);
    }
    if (this.query['check_everyone'] == true) {
        send_traffic_to += "&everyone=true";
    }
    if (this.query['check_vpn'] == true) {
        send_traffic_to += "&vpn=true";
    }
    if ( this.verbose ) {
        console.log(send_traffic_to);
    }

  }

  fetch_filters(){
    /* Queries Wordpress API for materials and subject taxonomy items*/

    // Set urls
    let url_params = "?per_page=100";
    this.$.ajax_materials.url = this.library_url + this.api_base_url + this.api_materials_url + url_params;
    this.$.ajax_subjects.url = this.library_url + this.api_base_url + this.api_subjects_url + url_params;

    if ( this.verbose ){
      this.$.ajax_materials.verbose = true;
      this.$.ajax_subjects.verbose = true;
    }

    // Make requests
    let request_materials = this.$.ajax_materials.generateRequest();
    let request_subjects = this.$.ajax_subjects.generateRequest();
    var element = this;

    // Push material names to array
    this.materials = [{"name": "Any Material", "slug": "any", "id": 0}];
    request_materials.completes.then(function(req) {
      var response = req.response;

      for (var material of response){
        element.push('materials',material);
      }

      if (element.verbose) {
          console.log("Materials List: ", element.materials);
      }

    }, function(rejected) {}
  )

    // Push subject names to array
    this.subjects = [{"name": "Any Material", "slug": "any", "id": 0}];
    request_subjects.completes.then(function(req) {
      var response = req.response;

      for (var subject of response){
        element.push('subjects',subject);
      }
      if (element.verbose) {
          console.log("Subjects List: ", element.subjects);
      }

    }, function(rejected) {}
  )
  }

  _vpn_url(base_url){
    return base_url + "/service/connect-from-off-campus";
  }

  _toggle_checkbox(e){
      /* Listener for updating query object from checkboxes */
      var check_id =  e.target.getAttribute('id');
      this.set('query.' + check_id, this.$[check_id].checked);
  }

  _query_change(){
    /* Observer for when query object changes. */
    if ( this.verbose ) {
      console.log("Query changed: ", this.query);
    }
  }

  _open_dropdown(e){
    /* Listener. Opens dropdown depending on button pressed. */
    var drop_type = e.target.getAttribute('drop_type');
    if (drop_type == 'materials'){
      this.$.drop_materials.open();
    }
    else if (drop_type == 'subjects') {
      this.$.drop_subjects.open();
    }
  }

  _select_dropdown(e){
    /* Listener for material/subject dropdowns. Updates query object. */
    var drop_type = e.target.getAttribute('drop_type');
    var selection = e.target.getAttribute('slug');
    var selection_pretty = e.target.textContent;

    if (drop_type == 'materials'){
      this.$.materials_button.textContent = selection_pretty;
      this.$.drop_materials.close();
      this.set('query.material', selection);
    }
    else if (drop_type == 'subjects') {
      this.$.subjects_button.textContent = selection_pretty;
      this.$.drop_subjects.close();
      this.set('query.subject', selection);
    }

  }



}

customElements.define(LibrarySearchDB.is, LibrarySearchDB);
