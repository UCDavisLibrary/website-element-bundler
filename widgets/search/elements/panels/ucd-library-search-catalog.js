import {PolymerElement, html} from "@polymer/polymer"
import UCDLibrarySearchBase from "../utils/ucd-library-search-base"
import LightDom from "../utils/light-dom"
import PrimoUtils from "../utils/primo"

import template from "./ucd-library-search-catalog.html"

class UCDLibrarySearchCatalog extends Mixin(PolymerElement)
  .with(UCDLibrarySearchBase, LightDom) {

  static get properties() {
    return {
      browseLink : {
        type : String,
        value : () => PrimoUtils.createPrimoLink({
            mode : PrimoUtils.MODES.BROWSE
        })
      }
    }
  }

  static get template() {
    return html([template]);
  }

  _search() {
    var params = {
      query : this.$.input.value,
      mode : PrimoUtils.MODES.BASIC,
      tab : this.$.noextra.checked ? PrimoUtils.TABS.CATALOG : PrimoUtils.TABS.DEFAULT
    }

    var link = PrimoUtils.createPrimoLink(params);
    this.sendGAEvent({eventAction: 'primo-basic-'+params.tab, eventLabel: this.$.input.value});
    window.location = link;
  }

  _advancedSearch() {
    var params = {
      query : this.$.input.value,
      mode : PrimoUtils.MODES.ADVANCED,
      tab : this.$.noextra.checked ? PrimoUtils.TABS.CATALOG : PrimoUtils.TABS.DEFAULT
    }

    var link = PrimoUtils.createPrimoLink(params);
    this.sendGAEvent({eventAction: 'primo-advanced-'+params.tab, eventLabel: this.$.input.value});
    this.setOutboundEvent(link);
    window.location = link;
  }

  _onBrowse() {
    this.sendGAEvent({eventAction: 'primo-browse', eventLabel: PrimoUtils.browsePath});
  }

}

customElements.define('ucd-library-search-catalog', UCDLibrarySearchCatalog);