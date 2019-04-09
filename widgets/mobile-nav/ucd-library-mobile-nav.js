import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-media-query/iron-media-query.js';

import template from "./template.js";
import style from "./style.js";

import LightDom from './light-dom.js';

class UCDLibraryMobileNav extends Mixin(PolymerElement)
.with(LightDom) {
    static get template(){
        return html([template + style]);
      }

  static get is() { return 'ucd-library-mobile-nav'; }
  static get properties() {
    return {
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
      }
      api_pages_url: {
        type: String,
        value: "/wp/v2/pages"
      }
    };
  }

  constructor() {
      super();
  }

  ready(){
      super.ready();
      if (this.verbose) {
        console.log("Mobile nav widget loaded.");
      }

  }


}

customElements.define(UCDLibraryMobileNav.is, UCDLibraryMobileNav);
