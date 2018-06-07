import {PolymerElement, html} from "@polymer/polymer"
import UCDLibrarySearchBase from "../utils/ucd-library-search-base"
import LightDom from "../utils/light-dom"
import PrimoUtils from "../utils/primo"

import template from "./ucd-library-search-melvyl.html"

class UCDLibrarySearchMelvyl extends Mixin(PolymerElement)
  .with(UCDLibrarySearchBase, LightDom) {

  static get properties() {
    return {
      flat : {
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
          'search-option' : '2'
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

    this.sendGAEvent({eventAction: 'melvyl-search', eventLabel: this.$.input.value});
    this.setOutboundEvent((this.rootUrl || '') + '?' + params.join('&'));
    window.location = (this.rootUrl || '') + '?' + params.join('&');
  }

}

customElements.define('ucd-library-search-melvyl', UCDLibrarySearchMelvyl);