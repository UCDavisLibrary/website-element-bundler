// Question.  what is institution code?

class PrimoUtils {

  constructor() {
    this.host = 'https://search.library.ucdavis.edu';
    // this.path = '/primo_library/libweb/action/dlSearch.do';
    this.searchPath = '/primo-explore/search';
    this.browsePath = '/primo-explore/browse';
    
    this.TABS = {
      DEFAULT : 'default_tab',
      CATALOG : 'catalog_tab',
      RESERVES : 'ucd_course_reserves'
    }

    this.MODES = {
      BASIC : 'Basic',
      ADVANCED : 'advanced',
      BROWSE : 'BrowseSearch'
    }

    this.BROWSE_SCOPES = {
      SUBJECT : 'subject',
      AUTHOR : 'author',
      TITLE : 'title',
      CONGRESS_CALL_NUMBER : 'callnumber.0',
      OTHER_CALL_NUMBER : 'callnumber',
      SUDOC_CALL_NUMBER : 'callnumber.3',
      NLM_CALL_NUMBER : 'callnumber.2'
    }

    // Note.  This will autofill given a tab
    this.SEARCH_SCOPES = {
      default_tab : 'everything_scope',
      catalog_tab : ['alma_scope', 'special_collections'],
      ucd_course_reserves : '01UCD_CR'
    }

    this.defaultParams = {
      vid : '01UCD_V1',
      lang: 'en_US'
    }

    this.fixedSearchParams =  {
      displayMode : 'full',
      bulkSize : '10',
      highlight : 'true',
      dum : 'true',
      displayField : 'all'
    }
  }


  /**
   * 
   * @param {object} args - arguments to be added to query
   * @param {string} args.query - text query
   * @param {string} args.tab - should be from TABS
   * @param {string} args.mode - search mode, should be from MODES
   * @param {string} args.browseScope - for mode=BrowserSearch, should be from BROWSE_SCOPES
   */
  createPrimoLink(args = {}) {
    var isBrowse = (args.mode === this.MODES.BROWSE) ? true : false;

    if( args.query ) {
      if( isBrowse ) {
        args.browseQuery = args.query.replace(/,/g, ' ');
        delete args.query;
      } else {
        args.query = 'any,contains,' + args.query.replace(/,/g, ' ');
      }
    }

    if( args.tab && !args.search_scope ) {
      if( args.tab === this.TABS.CATALOG ) {
        args.search_scope = this.SEARCH_SCOPES.catalog_tab[0];
      } else {
        args.search_scope = this.SEARCH_SCOPES[args.tab];
      }
    }
    
    var url = this.host+(isBrowse ? this.browsePath : this.searchPath);
    var params = [];
    var hashes = [this.defaultParams, args];
    if( !isBrowse ) hashes.push(this.fixedSearchParams);

    hashes.forEach(hash => this._appendParams(params, hash));

    return url+'?'+params.join('&');
  }

  _appendParams(params, hash) {
    for( var key in hash ) {
      params.push(key+'='+encodeURIComponent(hash[key]));
    }
  }
}

module.exports = new PrimoUtils();