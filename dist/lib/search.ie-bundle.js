!function(e){function t(t){for(var r,i,l=t[0],s=t[1],u=t[2],d=0,p=[];d<l.length;d++)i=l[d],a[i]&&p.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(c&&c(t);p.length;)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={2:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=s;o.push([87,0]),n()}([,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function e(t,n,r){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(r):void 0};t.default=function(e){return function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e),r(n,[{key:"_attachDom",value:function(e){if(window.ShadyDOM&&window.ShadyDOM.inUse)return a(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"_attachDom",this).call(this,e);for(var t=e.querySelectorAll("style"),r=0;r<t.length;r++)t[r].parentNode.removeChild(t[r]),this._stylesInserted||(t[r].setAttribute("id",this.nodeName.toLowerCase()+"-styles"),document.head.appendChild(t[r]));return this.appendChild(e),e}},{key:"querySelector",value:function(e){return this.shadowRoot?this.shadowRoot.querySelector(e):a(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"querySelector",this).call(this,e)}},{key:"querySelectorAll",value:function(e){return this.shadowRoot?this.shadowRoot.querySelectorAll(e):a(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"querySelectorAll",this).call(this,e)}}]),n}()}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.default=function(e){return function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e),r(n,[{key:"ready",value:function(){(function e(t,n,r){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(r):void 0})(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"ready",this).call(this),window.addEventListener("ui-search-text-change",this._setSearchText.bind(this))}},{key:"_onKeyUp",value:function(e){13===e.which?this._search():this._tiggerTextChange()}},{key:"_tiggerTextChange",value:function(){this.dispatchEvent(new CustomEvent("ui-search-text-change",{bubbles:!0,composed:!0,detail:{value:this.$.input.value,nodeName:this.nodeName}}))}},{key:"_setSearchText",value:function(e){e.detail.nodeName!==this.nodeName&&(this.$.input.value=e.detail.value)}},{key:"setOutboundEvent",value:function(e){window.trackOutboundLink&&("string"==typeof e?trackOutboundLink(e):trackOutboundLink.call(e.currentTarget))}},{key:"sendGAEvent",value:function(e){window.ga&&(e.hitType="event",e.eventCategory="search-widget",e.eventValue=1,ga("send",e))}},{key:"setValue",value:function(e){this.$.input.value=e}}]),n}()}},,,,,,,function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.host="https://search.library.ucdavis.edu",this.searchPath="/primo-explore/search",this.browsePath="/primo-explore/browse",this.TABS={DEFAULT:"default_tab",CATALOG:"catalog_tab",RESERVES:"ucd_course_reserves"},this.MODES={BASIC:"Basic",ADVANCED:"advanced",BROWSE:"BrowseSearch"},this.BROWSE_SCOPES={SUBJECT:"subject",AUTHOR:"author",TITLE:"title",CONGRESS_CALL_NUMBER:"callnumber.0",OTHER_CALL_NUMBER:"callnumber",SUDOC_CALL_NUMBER:"callnumber.3",NLM_CALL_NUMBER:"callnumber.2"},this.SEARCH_SCOPES={default_tab:"everything_scope",catalog_tab:["alma_scope","special_collections"],ucd_course_reserves:"01UCD_CR"},this.defaultParams={vid:"01UCD_V1",lang:"en_US"},this.fixedSearchParams={displayMode:"full",bulkSize:"10",highlight:"true",dum:"true",displayField:"all"}}return r(e,[{key:"createPrimoLink",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.mode===this.MODES.BROWSE;t.query&&(n?(t.browseQuery=t.query.replace(/,/g," "),delete t.query):t.query="any,contains,"+t.query.replace(/,/g," ")),t.tab&&!t.search_scope&&(t.tab===this.TABS.CATALOG?t.search_scope=this.SEARCH_SCOPES.catalog_tab[0]:t.search_scope=this.SEARCH_SCOPES[t.tab]);var r=this.host+(n?this.browsePath:this.searchPath),a=[],o=[this.defaultParams,t];return n||o.push(this.fixedSearchParams),o.forEach(function(t){return e._appendParams(a,t)}),r+"?"+a.join("&")}},{key:"_appendParams",value:function(e,t){for(var n in t)e.push(n+"="+encodeURIComponent(t[n]))}}]),e}();e.exports=new a},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){e.exports='<style>\n  :host, ucd-library-search {\n    text-align: left;\n    max-width: 1200px;\n    display: block;\n    padding: 15px;\n    min-width: 275px;\n  }\n\n  /* @media(min-width: 900px) {\n    :host, .ucd-library-search {\n      padding: 20px;\n    }\n  } */\n\n  .ucd-library-search [padded] {\n    padding-left: 50px\n  }\n\n  .ucd-library-search iron-pages > * {\n    display: block;\n\n    -webkit-animation:bounceIn 400ms ease-out;\n    -ms-animation:bounceIn 400ms ease-out;\n    animation:bounceIn 400ms ease-out;\n  }\n</style>\n\n<iron-media-query query="min-width: 800px" query-matches="{{largeScreen}}"></iron-media-query>\n\n<div class="ucd-library-search" layout$="[[largeScreen]]">\n  <ucd-library-search-nav id="nav" selected="{{section}}" ></ucd-library-search-nav>\n\n  <div flex$="[[largeScreen]]" padded$="[[largeScreen]]">\n    <iron-pages selected="{{section}}" attr-for-selected="id">\n      <ucd-library-search-catalog id="library"></ucd-library-search-catalog>\n      <ucd-library-search-databases id="databases" popular-databases="[[popularDatabases]]" root-url$="[[rootUrl]]"></ucd-library-search-databases>\n      <ucd-library-search-guide id="guide" root-url$="[[rootUrl]]"></ucd-library-search-guide>\n      <ucd-library-search-courses id="courses"></ucd-library-search-courses>\n      <ucd-library-search-melvyl id="melvyl" root-url$="[[rootUrl]]"></ucd-library-search-melvyl>\n      <ucd-library-search-website id="website" root-url$="[[rootUrl]]"></ucd-library-search-website>\n    </iron-pages>\n  </div>\n</div>\n    '},function(e,t){e.exports='<div class="text">\n  <h1 class="title">Site Search</h1>\n  <div class="help">Search library web pages for resources such as research guides, manuscripts and archives, services, and people.</div>\n\n  <div class="layout">\n    <div class="flex">\n      <input type="text" id="input" placeholder="Search Website" on-keyup="_onKeyUp" />\n    </div>\n    <div>\n      <button class="search-btn" id="btn" on-click="_search">Search</button>\n    </div>\n  </div>\n\n  <div hidden="[[!showFilter]]" style="margin-top: 15px; font-size: 14px">\n    <span style="color:#666">Filtered by: </span> <b style="color: #333">[[filterValue]]</b> | <a id="btn2" on-click="_search">Remove Filter</a>\n  </div>\n</div>'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=s(n(6)),i=s(n(3)),l=s(n(46));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,[{key:"_search",value:function(){this.parameters.s=this.$.input.value;var e=[];for(var t in this.parameters)e.push(t+"="+encodeURIComponent(this.parameters[t]));this.sendGAEvent({eventAction:"website-search",eventLabel:this.$.input.value}),window.location=(this.rootUrl||"")+"/?"+e.join("&")}},{key:"setFilter",value:function(e){this.showFilter=!0,this.filterValue=e}}],[{key:"properties",get:function(){return{showFilter:{type:Boolean,value:!1},rootUrl:{type:String,value:""},parameters:{type:Object,value:function(){return{s:"","search-option":"3"}}}}}},{key:"template",get:function(){return(0,a.html)([l.default])}}]),t}();customElements.define("ucd-library-search-website",u)},function(e,t){e.exports='<div class="text" flat$="[[flat]]">\n  <h1 class="title">All UC Libraries (Melvyl)</h1>\n  <div class="help">Find books, journals, media, and other materials held in UC libraries and other libraries worldwide.</div>\n  \n  <div class="layout">\n    <div class="flex">\n      <input type="text" id="input" placeholder="Search Melvyl" on-keyup="_onKeyUp" />\n    </div>\n    <div>\n      <button class="search-btn" id="btn" on-click="_search">Search</button>\n    </div>\n  </div>\n</div>'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=s(n(6)),i=s(n(3)),l=(s(n(13)),s(n(48)));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,[{key:"_search",value:function(){this.parameters.s=this.$.input.value;var e=[];for(var t in this.parameters)e.push(t+"="+encodeURIComponent(this.parameters[t]));this.sendGAEvent({eventAction:"melvyl-search",eventLabel:this.$.input.value}),this.setOutboundEvent((this.rootUrl||"")+"?"+e.join("&")),window.location=(this.rootUrl||"")+"?"+e.join("&")}}],[{key:"properties",get:function(){return{flat:{type:Boolean,value:!1},rootUrl:{type:String,value:""},parameters:{type:Object,value:function(){return{s:"","search-option":"2"}}}}}},{key:"template",get:function(){return(0,a.html)([l.default])}}]),t}();customElements.define("ucd-library-search-melvyl",u)},function(e,t){e.exports='<div class="text">\n  <h1 class="title">Subject and Course Guides</h1>\n  <div class="help">Find article databases, ebooks, handbooks, properties and other resources by academic subject.</div>\n\n  <div class="layout">\n    <div class="flex">\n      <input id="input" type="text" placeholder="Search Subject and Course Guides" on-keyup="_onKeyUp" />\n    </div>\n    <div>\n      <button class="search-btn" id="btn" on-click="_search">Search</button>\n    </div>\n  </div>\n  <div style="padding: 5px 0">\n    <a href="/course-guides" type="course" on-click="_onBrowse">All Course Guides</a> | \n    <a href="/browse-subjects" type="subject" on-click="_onBrowse">All Subject Guides</a>\n  </div>\n</div>\n\n'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=s(n(6)),i=s(n(3)),l=s(n(50));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,[{key:"_onBrowse",value:function(e){this.sendGAEvent({eventAction:"guide-browse",eventLabel:e.currentTarget.getAttribute("type")})}},{key:"_search",value:function(){this.sendGAEvent({eventAction:"guide-search",eventLabel:this.$.input.value}),window.location=(this.rootUrl||"")+"/?post_type=article&s="+this.$.input.value}}],[{key:"properties",get:function(){return{rootUrl:{type:String,value:""}}}},{key:"template",get:function(){return(0,a.html)([l.default])}}]),t}();customElements.define("ucd-library-search-guide",u)},function(e,t){e.exports='\n<style>\n  .ucd-library-search-databases .popular {\n    display: flex;\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .ucd-library-search-databases .popular > * {\n    margin: 0 5px 0 0;\n  }\n\n  .ucd-library-search-databases .popular div span[last-child] {\n    display: none;\n  }\n\n  .ucd-library-search-databases .bottom {\n    margin: 15px 0 0 0;\n    display: flex;\n    align-items: flex-start;\n    white-space: nowrap;\n    font-weight: var(--default-font-weight);\n  }\n\n  .ucd-library-search-databases .break {\n    margin: 0 10px;\n  }\n\n  @media( max-width: 600px ) {\n    .ucd-library-search-databases .bottom {\n      display: block;\n    }\n    .ucd-library-search-databases .bottom :first-child {\n      margin-left: 0;\n    }\n    .ucd-library-search-databases .break {\n      display: none;\n    }\n    .ucd-library-search-databases .popular {\n      margin-top: 10px;\n      margin-left: 0;\n    }\n  }\n</style>\n\n<div class="ucd-library-search-databases">\n  <div class="text" flat$="[[flat]]">\n    <h1 class="title">Databases</h1>\n    <div class="help">Find databases for scholarly articles, newspapers, popular literature, properties, statistics, images, dissertations and more.</div>\n\n    <div class="layout">\n      <div class="flex">\n        <input id="input" type="text" placeholder="Search For Databases" on-keyup="_onKeyUp" />\n      </div>\n      <div>\n        <button class="search-btn" id="btn" on-click="_search">Search</button>\n      </div>\n    </div>\n  </div>\n\n  <div flat$="[[flat]]" class="bottom">\n    <div><a href="/database/">Browse A-Z</a></div>\n    <div class="break">|</div>\n\n    <div class="popular">\n      <div>Popular:</div>\n      <template is="dom-repeat" items="[[databases]]">\n          <div>\n            <a href$="[[item.url]]" on-click="setOutboundEvent">[[item.label]]</a><span last-child$="[[item.last]]">,</span>\n          </div>\n      </template>\n    </div>\n  </div>\n</div>'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=s(n(6)),i=s(n(3)),l=s(n(52));function s(e){return e&&e.__esModule?e:{default:e}}var u=[{label:"PubMed",url:"http://uclibs.org/PID/10354"},{label:"JSTOR",url:"http://www.jstor.org/"},{label:"Web of Science",url:"http://isiknowledge.com/wos"},{label:"PsycINFO",url:"http://search.proquest.com/psycinfo/advanced"},{label:"BIOSIS",url:"http://webofscience.com/biosis"}],c=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._onPopularDatabaseUpdate(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,null,[{key:"properties",get:function(){return{properties:{flat:{type:Boolean,value:!1},rootUrl:{type:String,value:""},popularDatabases:{type:Array,value:function(){return[]},observer:"_onPopularDatabaseUpdate"}}}}},{key:"template",get:function(){return(0,a.html)([l.default])}}]),r(t,[{key:"_onPopularDatabaseUpdate",value:function(){var e;(e=(e=this.popularDatabases&&this.popularDatabases.length?this.popularDatabases:u).map(function(e){return Object.assign({},e)}))[e.length-1].last=!0,this.databases=e}},{key:"_search",value:function(){this.sendGAEvent({eventAction:"database-search",eventLabel:this.$.input.value}),window.location=(this.rootUrl||"")+"/?post_type=database&s="+this.$.input.value}}]),t}();customElements.define("ucd-library-search-databases",c)},function(e,t){e.exports='<div class="text" flat$="[[flat]]">\n  <h1 class="title">Course Reserves</h1>\n  <div class="help">Find required and/or recommended reading materials put on reserve by your instructor or TA via course number (e.g. ENL-003) or title.</div>\n  \n  <div class="layout">\n    <div class="flex">\n      <input type="text" id="input" placeholder="Search Course Reserves" on-keyup="_onKeyUp" />\n    </div>\n    <div>\n      <button class="search-btn" id="btn" on-click="_search">Search</button>\n    </div>\n  </div>\n  \n  <div style="text-align: right; padding: 5px 0">\n    <a extra id="advanced" on-click="_advancedSearch">Advanced Search</a>\n  </div>\n</div>'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=u(n(6)),i=u(n(3)),l=u(n(13)),s=u(n(54));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,[{key:"_search",value:function(){var e={query:this.$.input.value,mode:l.default.MODES.BASIC,tab:l.default.TABS.RESERVES},t=l.default.createPrimoLink(e);this.sendGAEvent({eventAction:"primo-basic-"+e.tab,eventLabel:this.$.input.value}),window.location=t}},{key:"_advancedSearch",value:function(){var e={query:this.$.input.value,mode:l.default.MODES.ADVANCED,tab:l.default.TABS.RESERVES},t=l.default.createPrimoLink(e);this.sendGAEvent({eventAction:"primo-advanced-"+e.tab,eventLabel:this.$.input.value}),this.setOutboundEvent(t),window.location=t}}],[{key:"properties",get:function(){return{flat:{type:Boolean,value:!1}}}},{key:"template",get:function(){return(0,a.html)([s.default])}}]),t}();customElements.define("ucd-library-search-courses",c)},function(e,t){e.exports='<style>\n  /*hack for website layout */\n  .ucd-library-search-catalog input[type="checkbox"] {\n    width: auto\n  }\n\n  .ucd-library-search-catalog label {\n    display: inline-block !important;\n    margin-top: 5px !important;\n  }\n\n  @media(max-width: 1200px) {\n    .ucd-library-search-catalog .weight-one {\n      display: block;\n    }\n    .ucd-library-search-catalog .weight-one.break {\n      display: none;\n    }\n  }\n\n  @media(max-width: 1075px) {\n    .ucd-library-search-catalog .weight-two {\n      display: block;\n    }\n    .ucd-library-search-catalog .weight-two.break {\n      display: none;\n    }\n  }\n</style>\n\n<iron-media-query query="min-width: 1050px" query-matches="{{xlargeScreen}}"></iron-media-query>\n<iron-media-query query="min-width: 950px" query-matches="{{largeScreen}}"></iron-media-query>\n<iron-media-query query="max-width: 500px" query-matches="{{smallScreen}}"></iron-media-query>\n\n<div class="text ucd-library-search-catalog" flat$="[[flat]]">\n  <h1 class="title">Search Library Catalog + Articles</h1>\n  <div class="help">\n    Find books, ebooks, journals, movies and music, government documents, and more.\n  </div>\n  <div class="layout">\n    <div class="flex">\n      <input type="text" id="input" placeholder="Search Library Catalog + Articles" on-keyup="_onKeyUp" />\n    </div>\n    <div>\n      <button class="search-btn" id="btn" on-click="_search">Search</button>\n    </div>\n  </div>\n\n  <div layout$="[[largeScreen]]">\n    <div style="padding-top: 5px; flex: 1; white-space: nowrap;">\n      <input type="checkbox" id="noextra" />\n      <label for="noextra" class="blue">\n        Library Catalog only\n      </label>\n    </div>\n\n    <div style="text-align: right; padding: 5px 0; margin: 5px 0">\n      <a extra id="advanced" on-click="_advancedSearch" class="weight-two">Advanced Search</a>\n      <span class="weight-two break">&nbsp;|&nbsp;</span>\n      <a extra href$="[[browseLink]]" on-click="_onBrowse" class="weight-two" on-click="setOutboundEvent">Browse Search</a>\n      <span class="weight-one break">&nbsp;|&nbsp;</span>\n      <a extra href="/library-search-faq" class="weight-one" on-click="setOutboundEvent">Search Tips</a>\n    </div>\n  </div>\n</div>'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=u(n(6)),i=u(n(3)),l=u(n(13)),s=u(n(56));function u(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default,i.default)),r(t,[{key:"_search",value:function(){var e={query:this.$.input.value,mode:l.default.MODES.BASIC,tab:this.$.noextra.checked?l.default.TABS.CATALOG:l.default.TABS.DEFAULT},t=l.default.createPrimoLink(e);this.sendGAEvent({eventAction:"primo-basic-"+e.tab,eventLabel:this.$.input.value}),window.location=t}},{key:"_advancedSearch",value:function(){var e={query:this.$.input.value,mode:l.default.MODES.ADVANCED,tab:this.$.noextra.checked?l.default.TABS.CATALOG:l.default.TABS.DEFAULT},t=l.default.createPrimoLink(e);this.sendGAEvent({eventAction:"primo-advanced-"+e.tab,eventLabel:this.$.input.value}),this.setOutboundEvent(t),window.location=t}},{key:"_onBrowse",value:function(){this.sendGAEvent({eventAction:"primo-browse",eventLabel:l.default.browsePath})}}],[{key:"properties",get:function(){return{browseLink:{type:String,value:function(){return l.default.createPrimoLink({mode:l.default.MODES.BROWSE})}}}}},{key:"template",get:function(){return(0,a.html)([s.default])}}]),t}();customElements.define("ucd-library-search-catalog",c)},function(e,t){e.exports='<style>\n  :host, ucd-library-search-nav {\n    display: block;\n  }\n\n  .ucd-library-search-nav div.btn-nav button {\n    border-radius: 0px;\n    font-weight: var(--default-font-weight);\n    margin: 5px;\n    font-size: 12px;\n    cursor: pointer;\n    color: var(--default-primary-color);\n    display: block;\n    float: left;\n    height: 65px;\n    width: 80px;\n    border: solid 1px var(--default-primary-yellow);\n    background: var(--default-secondary-yellow);\n    padding: 0px 5px;\n    transition: background 400ms ease-out, transform 400ms ease-out;\n    transform: scale(1);\n  }\n\n  .ucd-library-search-nav div.btn-nav button.selected:focus, \n  .ucd-library-search-nav div.btn-nav button.selected:hover {\n    border: solid 2px var(--default-primary-color);\n    padding: 4px;\n    outline:0;\n  }\n  .ucd-library-search-nav div.btn-nav button:focus, \n  .ucd-library-search-nav div.btn-nav button:hover {\n    border: solid 2px var(--default-primary-color);\n    color: var(--default-primary-color);\n    background: var(--default-secondary-yellow);\n    padding: 4px;\n    outline:0;\n  }\n\n  .ucd-library-search-nav div.btn-nav button.selected {\n    transform: scale(1.05);\n    border: solid 1px var(--default-primary-color);\n    padding: 0px 5px;\n    background: var(--default-secondary-color);\n    color: white;\n    text-shadow: none;\n    z-index: 20;\n  }\n\n  @media(min-width: 700px) {\n    .ucd-library-search-nav div.btn-nav button {\n      font-size: var(--default-font-size);\n      height: 80px;\n      width: 95px;\n    }\n  }\n\n  @media(min-width: 900px) {\n    .ucd-library-search-nav div.btn-nav button {\n      font-size: var(--default-font-size);\n      height: 90px;\n      width: 120px;\n    }\n  }\n</style>\n\n<iron-media-query query="min-width: 800px" query-matches="{{largeScreen}}"></iron-media-query>\n<iron-media-query query="max-width: 600px" query-matches="{{smallScreen}}"></iron-media-query>\n\n<div class="ucd-library-search-nav">\n  <div hidden$="[[!smallScreen]]">\n    <h2>Search...</h2>\n    <select id="selector" on-change="_select" style="display:block; margin-bottom: 20px">\n      <option value="library">Library Catalog + Articles</option>\n      <option value="courses">Course Reserves</option>\n      <option value="databases">Databases</option>\n      <option value="melvyl">Melvyl</option>\n      <option value="guide">Subject + Course Guides</option>\n      <option value="website">Site Search</option>\n    </select>\n  </div>\n\n  <div class="btn-nav" layout$="[[!largeScreen]]" hidden$="[[smallScreen]]" flat$="[[flat]]">\n    <div class="layout">\n      <button on-click="_select" value="library"><div>Library Catalog + Articles</div></button>\n      <button on-click="_select" value="courses"><div>Course Reserves</div></button>\n      <button on-click="_select" value="databases"><div>Databases</div></button>\n    </div>\n    <div class="layout center">\n      <button on-click="_select" value="melvyl"><div>All UC Libraries (Melvyl)</div></button>\n      <button on-click="_select" value="guide"><div>Subject + Course Guides</div></button>\n      <button on-click="_select" value="website"><div>Site Search</div></button>\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),o=l(n(3)),i=l(n(58));function l(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(o.default)),r(t,[{key:"ready",value:function(){(function e(t,n,r){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(r):void 0})(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"ready",this).call(this),this._resetBtns();var e=this.querySelector('button[value="'+this.selected+'"]');e&&e.classList.add("selected"),this.$.selector.value=this.selected}},{key:"_select",value:function(e){this._resetBtns(),this.selected=e.currentTarget.value||e.currentTarget.getAttribute("value"),this.querySelector('button[value="'+this.selected+'"]').classList.add("selected"),this.$.selector.value=this.selected}},{key:"_resetBtns",value:function(){for(var e=this.querySelectorAll("button"),t=0;t<e.length;t++)e[t].classList.remove("selected")}}],[{key:"properties",get:function(){return{selected:{type:String,value:"library",notify:!0},flat:{type:Boolean,value:!1}}}},{key:"template",get:function(){return(0,a.html)([i.default])}}]),t}();customElements.define("ucd-library-search-nav",s)},function(e,t){e.exports='<style>\n  ucd-library-search .layout, ucd-library-search [layout] {\n    display: flex;\n  }\n\n  ucd-library-search .flex, ucd-library-search [flex] {\n    flex: 1;\n  }\n\n  ucd-library-search .center, ucd-library-search [center] {\n    align-items: center;\n    justify-content: center;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  ucd-library-search a {\n    color: var(--default-primary-color) !important;\n    cursor: pointer;\n    text-decoration: underline !important;\n  }\n\n  ucd-library-search .search-btn {\n    text-align: center;\n    display: inline-block;\n    background: var(--default-primary-color);\n    color: #fff;\n    text-decoration: none;\n    padding: 15px;\n    transition: all .2s ease-in-out;\n    font-weight: 600;\n    font-size: 1rem;\n    line-height: 1.25;\n    border: 1px solid transparent;\n    cursor: pointer;\n    border-radius: 0;\n  }\n\n  ucd-library-search .search-btn:hover {\n    background: var(--default-secondary-color);\n  }\n\n  /* h1, h2 {\n    color: var(--default-primary-color);\n    margin-top: 0;\n    margin-bottom: 5px;\n    font-weight: var(--default-font-weight);\n  }\n\n  h1 {\n    font-size: 40px;\n  } */\n\n  .blue {\n    color: var(--default-primary-color);\n  }\n\n  select, input[type="text"] {\n    box-sizing: border-box;\n    display: block;\n    width: 100%;\n    background-color: white;\n    padding: 15px;\n    color: var(--default-primary-color);\n    border: 1px solid #d6dce6;\n    border-radius: 0;\n    font-weight: 600;\n    font-size: 1rem;\n    line-height: 1.25;\n    background-clip: padding-box;\n  }\n\n  select {\n    border-radius: 0;\n    border: 1px solid var(--default-primary-yellow);\n    background-color: var(--default-secondary-yellow);\n    color: var(--default-primary-color);\n\n    background-image:\n      linear-gradient(45deg, transparent 50%, var(--default-primary-color) 50%),\n      linear-gradient(135deg, var(--default-primary-color) 50%, transparent 50%);\n    background-position:\n      calc(100% - 20px) calc(1em + 2px),\n      calc(100% - 15px) calc(1em + 2px),\n      calc(100% - 2.5em) 0.5em;\n    background-size:\n      5px 5px,\n      5px 5px,\n      1px 1.5em;\n    background-repeat: no-repeat;\n\n    \n    padding-right: 20px;\n    -webkit-appearance: none;\n    -webkit-border-radius: 0px;\n    height: 52px;\n  }\n\n  .help {\n    font-size: var(--default-font-size);\n    padding-bottom: 15px;\n  }\n\n  @media(max-width: 600px) {\n    select, input[type="text"], .search-btn {\n      padding: 10px;\n      font-size: .75rem;\n    }\n    select {\n      height: 37px;\n      padding-right: 15px;\n    }\n\n    h1.title {\n      display: none;\n    }\n  }\n\n  @media(max-width: 700px) {\n    h1.title {\n      font-size: 30px;\n    }\n  }\n\n  input[type="text"]:focus, select:focus {\n    outline:0;\n    border: 1px solid var(--default-primary-color);\n    color: var(--default-primary-color);\n  }\n\n  @keyframes bounceIn {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes -webkit-bounceIn {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  @keyframes -webkit-bounceIn {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n\n</style>'},function(e,t,n){"use strict";var r,a=n(60),o=(r=a)&&r.__esModule?r:{default:r};var i=document.createElement("div");i.style.display="none",i.innerHTML=o.default,document.head.appendChild(i)},function(e,t){e.exports="<custom-style>\n  <style>\n    :root {\n      --default-primary-color: #002655;\n      --default-secondary-color: #335379;\n      --default-primary-yellow: #dAAA00;\n      --default-secondary-yellow: #E9CC66;\n      --default-primary-gray: #808080;\n      --default-font-size : 17px;\n      --default-font-weight: 400;\n      --heavy-font-weight: 700;\n      --extra-heavy-font-weight: 900;\n    }\n  </style>\n</custom-style>"},function(e,t,n){"use strict";var r,a=n(62),o=(r=a)&&r.__esModule?r:{default:r};var i=document.createElement("div");i.style.display="none",i.innerHTML=o.default,document.head.appendChild(i)},,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2);n(34),n(33),n(67),n(63),n(61),n(59),n(57),n(55),n(53),n(51),n(49),n(47);var o=l(n(45)),i=l(n(3));function l(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,Mixin(a.PolymerElement).with(i.default)),r(t,[{key:"ready",value:function(){(function e(t,n,r){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(r):void 0})(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"ready",this).call(this);var e=this.getParameterByName("post_type"),n=this.getParameterByName("s"),r=this.getParameterByName("search_nav");"article"===e?(this.section="guide",this._setValues(n)):"database"===e?(this.section="databases",this._setValues(n)):"3"===this.getParameterByName("search-option")||e?(this.section="website",this._setValues(n),e&&this.$.website.setFilter(e)):r&&(this.section=r)}},{key:"_setValues",value:function(e){this.dispatchEvent(new CustomEvent("ui-search-text-change",{bubbles:!0,composed:!0,detail:{value:e}}))}},{key:"getParameterByName",value:function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}}],[{key:"properties",get:function(){return{section:{type:String,value:"library"},rootUrl:{type:String,value:""},popularDatabases:{type:Array,value:function(){return[]}}}}},{key:"template",get:function(){return(0,a.html)([o.default])}}]),t}();customElements.define("ucd-library-search",s)}]);