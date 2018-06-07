

const UCDLibrarySearchBase = subclass =>
  class UCDLibrarySearchBaseMixin extends subclass {

  ready() {
    super.ready();
    window.addEventListener('ui-search-text-change', this._setSearchText.bind(this));
  }
  
  _onKeyUp(e) {
    if( e.which === 13 ) this._search();
    else this._tiggerTextChange();
  }

  _tiggerTextChange() {
    this.dispatchEvent(
      new CustomEvent('ui-search-text-change', {
        bubbles: true, 
        composed: true,
        detail : {
          value: this.$.input.value,
          nodeName : this.nodeName
        }
      })
    );
  }
  
  _setSearchText(e) {
    if( e.detail.nodeName === this.nodeName ) return;
    
    this.$.input.value = e.detail.value;
  }
  
  /**
   * @method setOutboundEvent
   * @description use to send output link events from anchor tags
   *
   * @param {Object|String} e html click event, from a anchor tag or a url string
   **/
  setOutboundEvent(e) {
    if( !window.trackOutboundLink ) return;
    if( typeof e === 'string' ) trackOutboundLink(e);
    else trackOutboundLink.call(e.currentTarget);
  }

  /**
   * @method sendGAEvent
   *
   * @param {Object} event event object
   * @param {String} event.eventAction type of search
   * @param {String} event.eventLabel search text
   */
  sendGAEvent(event) {
    if( !window.ga ) return;
    event.hitType = 'event';
    event.eventCategory = 'search-widget';
    event.eventValue = 1;
    ga('send', event);
  }

  setValue(val) {
    this.$.input.value = val;
  }
}

export default UCDLibrarySearchBase;