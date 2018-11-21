import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-dropdown/iron-dropdown.js';

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
      api_base_url: {
        type: String,
        value: "https://www.library.ucdavis.edu/wp-json"
      },
      api_materials_url: {
        type: String,
        value: "/wp/v2/categories"
      },
      api_subjects_url: {
        type: String,
        value: "/wp/v2/categories"
      },
      query: {
        type: Object
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
      if (this.verbose){
        console.log("Advanced database search widget loaded.");
      }
      this.reset_query();
      this.fetch_filters();

  }

  reset_query(){
    /* Restores query object and form elements to default values. */

    var query = {"q": "",
                 "material": "any",
                 "subject": "any"
    };
    this.set('query', query);

    this.$.materials_button.textContent = "Any Material";
    this.$.subjects_button.textContent = "Any Subject";

  }

  fetch_filters(){
    /* Queries Wordpress API for materials and subject taxonomy items*/

    // Set urls
    let url_params = "?per_page=100";
    this.$.ajax_materials.url = this.api_base_url + this.api_materials_url + url_params;
    this.$.ajax_subjects.url = this.api_base_url + this.api_subjects_url + url_params;

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
