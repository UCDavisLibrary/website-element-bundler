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
    };
  }
  constructor() {
      super();
  }

  ready(){
      super.ready();
      if (this.verbose){
        console.log("Advanced database search widget loaded.");
      }
      this.fetch_filters();

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
    console.log(this.materials);
    request_materials.completes.then(function(req) {
      var response = req.response;
      console.log(response);
      for (var material of response){
        element.push('materials',material);
      }
      //req.response.map(material => element.push('materials',material));

      if (element.verbose) {
          console.log("Materials List: ", element.materials);
      }

    }, function(rejected) {}
  )

    // Push subject names to array
    this.subjects = [{"name": "Any Material", "slug": "any", "id": 0}];
    request_subjects.completes.then(function(req) {
      var response = req.response;
      //req.response.map(subject => element.push('subjects',subject.name));
      for (var subject of response){
        element.push('subjects',subject);
      }
      if (element.verbose) {
          console.log("Subjects List: ", element.subjects);
      }

    }, function(rejected) {}
  )
  }

  _open_dropdown(e){
    /* Opens dropdown depending on button pressed*/
    var drop_type = e.target.getAttribute('drop_type');
    if (drop_type == 'materials'){
      this.$.drop_materials.open()
    }
  }



}

customElements.define(LibrarySearchDB.is, LibrarySearchDB);
