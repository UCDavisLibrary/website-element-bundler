import {PolymerElement, html} from "@polymer/polymer"
import UCDLibrarySearchBase from "../utils/ucd-library-search-base"
import LightDom from "../utils/light-dom"

import template from "./ucd-library-search-website.html"

class UCDLibrarySearchWebsite extends Mixin(PolymerElement)
  .with(UCDLibrarySearchBase, LightDom) {

  static get properties() {
    return {
      showFilter : {
        type : Boolean,
        value : false
      },
      rootUrl : {
        type : String,
        value : ''
      },
      parameters : {
        type : Object,
        value : () => ({
          's' : '',
          'search-option' : '3'
        })
      }
    }
  }

  static get template() {
    return html([template]);
  }

  _search() {
    this.parameters.s = this.$.input.value;

    var params = [];
    for( var key in this.parameters ) {
      params.push(key+'='+encodeURIComponent(this.parameters[key]));
    }

    this.sendGAEvent({eventAction: 'website-search', eventLabel: this.$.input.value});
    window.location = (this.rootUrl || '') + '/?' + params.join('&');
  }

  setFilter(value) {
    this.showFilter = true;
    this.filterValue = value;
  }
}

customElements.define('ucd-library-search-website', UCDLibrarySearchWebsite);