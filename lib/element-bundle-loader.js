var CUSTOM_ELEMENT_VERSION = '1.1.0';

function classSupport() {
  try {
    eval("class Foo {}");
  } catch (e) { return false; }
  return true;
}

function initCustomElements() {
  if( !window.elementBundles ) {
    console.warn('No elementBundles defined');
    return;
  }

  // add the vender bundle first
  elementBundles.unshift('vendor');

  initCustomEleSafeCheck();
  console.log('Webcomponents ready.');

  var prefix = '';
  if( window.elementThemeDir ) {
    prefix = elementThemeDir;
  }

  var suffix = '.bundle.js'
  if( !classSupport() ) suffix = '.ie-bundle.js';

  for( var i = 0; i < elementBundles.length; i++ ) {
    let script = document.createElement('script');
    script.src = prefix+elementBundles[i]+suffix+'?_='+CUSTOM_ELEMENT_VERSION;
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
  setTimeout(function(){ initCustomElements() }, 0);
}
