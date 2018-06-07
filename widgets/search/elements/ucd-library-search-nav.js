import {PolymerElement, html} from "@polymer/polymer"
import LightDom from "./utils/light-dom"

import template from "./ucd-library-search-nav.html"

class UCDLibrarySearchNav extends Mixin(PolymerElement)
  .with(LightDom) {

  static get properties() {
    return {
      selected : {
        type : String,
        value : 'library',
        notify : true
      },
      flat : {
        type : Boolean,
        value : false
      }
    }
  }

  static get template() {
    return html([template]);
  }

  ready() {
    super.ready();
    this._resetBtns();

    let selected = this.querySelector('button[value="'+this.selected+'"]');
    if( selected ) {
      selected.classList.add('selected');
    }
    
    this.$.selector.value = this.selected;
  }

  _select(e) {
    this._resetBtns();
    this.selected = e.currentTarget.value || e.currentTarget.getAttribute('value');
    this.querySelector('button[value="'+this.selected+'"]').classList.add('selected');
    this.$.selector.value = this.selected;
  }

  _resetBtns() {
    var eles = this.querySelectorAll('button');
    for( var i = 0; i < eles.length; i++ ) {
      eles[i].classList.remove('selected');
    }
  }
}

customElements.define('ucd-library-search-nav', UCDLibrarySearchNav);