import {PolymerElement, html} from "@polymer/polymer"
import UCDLibrarySearchBase from "../utils/ucd-library-search-base"
import LightDom from "../utils/light-dom"

import template from "./ucd-library-search-databases.html"

const DEFAULT_DATABASES = [
  {
    label : 'PubMed',
    url : 'http://uclibs.org/PID/10354'
  },
  {
    label : 'JSTOR',
    url : 'http://www.jstor.org/'
  },
  {
    label : 'Web of Science',
    url : 'http://isiknowledge.com/wos'
  },
  {
    label : 'PsycINFO',
    url : 'http://search.proquest.com/psycinfo/advanced'
  },
  {
    label : 'BIOSIS',
    url : 'http://webofscience.com/biosis'
  }
]

class UCDLibrarySearchDatabases extends Mixin(PolymerElement)
  .with(UCDLibrarySearchBase, LightDom) {

  static get properties() {
    return {
      properties : {
        flat : {
          type : Boolean,
          value : false
        },
        rootUrl : {
          type : String,
          value : ''
        },
        popularDatabases : {
          type : Array,
          value : () => [],
          observer : '_onPopularDatabaseUpdate'
        }
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._onPopularDatabaseUpdate();
  }

  _onPopularDatabaseUpdate() {
    var dbs;
    if( !this.popularDatabases ) {
      dbs = DEFAULT_DATABASES;
    } else if( !this.popularDatabases.length ) {
      dbs = DEFAULT_DATABASES;
    } else {
      dbs = this.popularDatabases;
    }

    // deep clone
    dbs = dbs.map(db => Object.assign({}, db));
    dbs[dbs.length-1].last = true;
    this.databases = dbs;
  }

  _search() {
    this.sendGAEvent({eventAction: 'database-search', eventLabel: this.$.input.value});
    window.location = (this.rootUrl || '') + '/?post_type=database&s=' + this.$.input.value;
  }
}

customElements.define('ucd-library-search-databases', UCDLibrarySearchDatabases);
