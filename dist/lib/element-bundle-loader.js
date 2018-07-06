var CUSTOM_ELEMENT_VERSION = '2.0.0';

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

  console.log('Webcomponents ready.');

  var dir = '';
  if( window.elementThemeDir ) {
    dir = elementThemeDir;
  }

  var file = 'main.bundle.js'
  if( !classSupport() ) suffix = 'main.ie-bundle.js';

  let script = document.createElement('script');
  script.src = dir+file+'?_='+CUSTOM_ELEMENT_VERSION;
  document.head.appendChild(script);
}

if( !window.customElements ) { // we are using polyfill and it's still loading
  window.addEventListener('WebComponentsReady', initCustomElements);
} else {
  setTimeout(function(){ initCustomElements() }, 0);
}
