__webpack_public_path__ = elementThemeDir || '';

if( window.elementBundles ) {
  if( window.elementBundles.indexOf('search') > -1 ) {
    import(/* webpackChunkName: "search" */ './widgets/search/ucd-library-search.js');
  }

  if( window.elementBundles.indexOf('hours-week') > -1 ) {
    import(/* webpackChunkName: "hours-week" */ './widgets/hours-week/library-hours-week.js');
  }

  if( window.elementBundles.indexOf('hours-today') > -1 ) {
    import(/* webpackChunkName: "hours-today" */ './widgets/hours-today/library-hours.js');
  }

  if( window.elementBundles.indexOf('hours-single') > -1 ) {
    import(/* webpackChunkName: "hours-single" */ './widgets/hours-single/library-hours-single.js');
  }
}