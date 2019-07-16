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
      },
      largeScreen : {
        type : Boolean,
        value : false
      },
      smallScreen : {
        type : Boolean,
        value : false
      },
      flexButtons : {
        type : Boolean,
        false : false,
        computed : '_onSizeUpdate(largeScreen, smallScreen)'
      }
    }
  }

  static get template() {
    return html([template]);
  }

  ready() {
    super.ready();
    this._resetBtns();
  }

  /**
   * @method initBtn
   * @description rendering order and initialization order of selected button is a pain.
   * Parent will manually set init state of buttons via this method. 
   * 
   * @param {String} selected name of button to select
   */
  initBtn(selected) {
    selected = this.querySelector('button[value="'+this.selected+'"]');
    if( selected ) {
      selected.classList.add('selected');
    }

    this.$.selector.value = selected;
    selected = this.querySelector('option[value="'+this.selected+'"]');
    if( selected ) {
      selected.selected = 'selected'; // for FF
      selected.setAttribute('selected', 'selected');
    }
  }

  _onSizeUpdate() {
    return !this.largeScreen && !this.smallScreen;
  }

  _select(e) {
    console.log(e);
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