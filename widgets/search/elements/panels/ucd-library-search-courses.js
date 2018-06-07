import {PolymerElement, html} from "@polymer/polymer"
import UCDLibrarySearchBase from "../utils/ucd-library-search-base"
import LightDom from "../utils/light-dom"
import PrimoUtils from "../utils/primo"

import template from "./ucd-library-search-courses.html"

class UCDLibrarySearchCourses extends Mixin(PolymerElement)
  .with(UCDLibrarySearchBase, LightDom) {

  static get properties() {
    return {
      flat : {
        type : Boolean,
        value : false
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
      tab : PrimoUtils.TABS.RESERVES
    }

    var link = PrimoUtils.createPrimoLink(params);
    this.sendGAEvent({eventAction: 'primo-basic-'+params.tab, eventLabel: this.$.input.value});
    window.location = link;
  }

  _advancedSearch() {
    var params = {
      query : this.$.input.value,
      mode : PrimoUtils.MODES.ADVANCED,
      tab : PrimoUtils.TABS.RESERVES
    }

    var link = PrimoUtils.createPrimoLink(params);
    this.sendGAEvent({eventAction: 'primo-advanced-'+params.tab, eventLabel: this.$.input.value});
    this.setOutboundEvent(link);
    window.location = link;
  }

}

customElements.define('ucd-library-search-courses', UCDLibrarySearchCourses);