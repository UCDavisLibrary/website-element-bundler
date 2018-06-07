import {PolymerElement, html} from "@polymer/polymer"
import "@ucd-lib/cork-app-utils/lib/Mixin"

import "@polymer/iron-media-query"
import "@polymer/iron-pages"

import "./elements/styles/style-properties"
import "./elements/styles/shared-styles"
import "./elements/ucd-library-search-nav"
import "./elements/panels/ucd-library-search-catalog"
import "./elements/panels/ucd-library-search-courses"
import "./elements/panels/ucd-library-search-databases"
import "./elements/panels/ucd-library-search-guide"
import "./elements/panels/ucd-library-search-melvyl"
import "./elements/panels/ucd-library-search-website"

import template from "./ucd-library-search.html"
import LightDom from "./elements/utils/light-dom"

class UCDLibrarySearch extends Mixin(PolymerElement)
  .with(LightDom) {

  static get properties() {
    return {
      section : {
        type : String,
        value : 'library'
      },
      rootUrl : {
        type : String,
        value : ''
      },
      popularDatabases : {
        type : Array,
        value : () => []
      }
    }
  }

  static get template() {
    return html([template]);
  }

  ready() {
    super.ready();

    /**
     * Check UCD library url parameters
     */
    var postType = this.getParameterByName('post_type');
    var search = this.getParameterByName('s');
    var nav = this.getParameterByName('search_nav');

    if( postType === 'article' ) {
      this.section = 'guide';
      this._setValues(search);
    } else if( postType === 'database' ) {
      this.section = 'databases';
      this._setValues(search);
    } else if( this.getParameterByName('search-option') === '3' || postType ) {
      this.section = 'website';
      this._setValues(search);
      if( postType ) {
        this.$.website.setFilter(postType);
      }
    } else if( nav ) {
      this.section = nav;
    }
  }
  
  _setValues(text) {
    this.dispatchEvent(
      new CustomEvent('ui-search-text-change', {
        bubbles: true, 
        composed: true,
        detail : {
          value: text
        }
      })
    );
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

customElements.define('ucd-library-search', UCDLibrarySearch);