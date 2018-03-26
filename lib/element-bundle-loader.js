function initCustomElements() {
  if( !window.elementBundles ) {
    console.warn('No elementBundles defined');
    return;
  }

  initCustomEleSafeCheck();

  for( var i = 0; i < elementBundles.length; i++ ) {
    let script = document.createElement('script');
    script.src = elementBundles[i];
    document.head.appendChild(script);
  }
}

// only allow one element of type, do not throw error,
// ie check before insert
function initCustomEleSafeCheck() {
  var customElementsDefine = customElements.define;
  var definedCustomElementsMap = {};
  customElements.define = function(name, def) {
    if( definedCustomElementsMap[name] ) return;
    definedCustomElementsMap[name] = true;
    customElementsDefine.call(customElements, name, def);
  }
}

if( !window.customElements ) { // we are using polyfill and it's still loading
  window.addEventListener('WebComponentsReady', initCustomElements);
} else {
  initCustomElements();
}