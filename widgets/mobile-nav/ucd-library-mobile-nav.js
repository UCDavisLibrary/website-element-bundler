import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-if.js';
//import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-pages/iron-pages.js';

import template from "./template.js";
import style from "./style.js";

import LightDom from './light-dom.js';

class UCDLibraryMobileNav extends Mixin(PolymerElement)
.with(LightDom, MutableData) {
    static get template(){
        return html([template + style]);
      }

  static get is() { return 'ucd-library-mobile-nav'; }
  static get observers() {
      return [
          '_selected_menu_comp(next_menu, _api_calls_made)'
      ]
  }
  static get properties() {
    return {
      verbose: {
        type: Boolean
      },
      element_loaded: {
        type: Boolean,
        value: false,
        computed: "_element_loaded_comp(all_menus_retrieved, is_hierarchical)",
        observer: "_element_loaded_obs"
      },
      library_url: {
        type: String,
        value: "https://www.library.ucdavis.edu"
      },
      facebook: {
        type: String
      },
      twitter: {
        type: String
      },
      instagram: {
        type: String
      },
      youtube: {
        type: String
      },
      pinterest: {
        type: String
      },
      api_base_url: {
        type: String,
        value: "/wp-json"
      },
      api_menu_url: {
        type: String,
        value: "/menus/v1/menus"
      },
      api_pages_url: {
        type: String,
        value: "/wp/v2/pages"
    },
      look_ahead: {
        type: Number,
        value: 1
    },
      menu_data: {
        type: Array,
        value: []
    },
      selected_menu: {
        type: Object,
        value: {}
    },
      show_menu: {
        type: Boolean,
        value: false
    },
      next_menu: {
        type: Object,
        value: {}
    },
      trans_menu: {
        type: Object,
        value: {}
    },
      animation_duration: {
        type: String,
        value: "2s"
    },
      _api_calls_needed: {
        type: Object,
        value: {}
    },
      _api_calls_made: {
        type: Boolean,
        value: true,
        computed: "_api_calls_made_comp(_api_calls_needed)"
    },
      menu_loaded: {
        type: Boolean,
        value: false
    },
      menus_to_retrieve: {
        type: Object
    },
      n_menus_to_retrieve: {
        type: Number,
        computed: "_n_menus_to_retrieve(menus_to_retrieve)"
    },
      menus_retrieved: {
        type: Array,
        value: []
    },
      all_menus_retrieved: {
        type: Boolean,
        computed: "_all_menus_retrieved(menus_retrieved)"
    },
      current_page: {
        type: Object
    },
      has_parents: {
        type: Boolean
    },
      parents: {
        type: Array,
        value: []
    },
      parents_loaded: {
        type: Boolean
    },
      has_children: {
        type: Boolean
    },
      is_hierarchical: {
        type: Boolean,
        observer: "_is_hierarchical_obs",
        computed: "_is_hierarchical_comp(has_children, has_parents)"
      }

    };
  }

  constructor() {
      super();
  }

  ready(){
      /* TODO:
      Create field on pages to hide/order on menu. expose via api.
      adjust fetch parse functions accordingly.
      create function that sorts according to these values.
      */

      super.ready();
      if (this.verbose) {
        console.log("Mobile nav widget loaded.");
      }

      // Retrieve official wp menus
      let menus = {'main-nav':['library-locations', 'alumni-and-friends', 'about'],
                   'info': ['lang-prize']};
      this.set('menus_to_retrieve', menus);
      this.$.ajax_descendents.url = this.library_url + this.api_base_url + this.api_pages_url;
      this.get_wp_menu('main-nav');
      this.get_wp_menu('info');

      // Check if current page is hierarchical
      // Get parents(all) and children of page
      if (WP_POST_TYPE == 'page'){
          this.get_current_page();
      }
      else {
          this.set('has_parents', false);
          this.set('has_children', false);
      }

  }

  changeMenu(e){
      /* Handles menu change clicks from user */
      let array_loc = e.target.getAttribute('arrayloc').split(",");
      array_loc = array_loc.map(e=>Number(e));
      let transition = e.target.getAttribute('trans');
      if (this.verbose) {
          console.log(`Changing menu to: ${array_loc} with transition ${transition}`);
      }
      this.queue_menu(array_loc, transition)
  }

  get_current_page(){
      /* Get data for the current page (and its family) from WP API */

      if (this.verbose) {
          console.log("Retrieving structure for page id", WP_POST_ID);
      }

      // Set up API query and make call
      let params = {"_fields": "title,id,link,parent"};
      this.$.ajax_page.url = this.page_url(WP_POST_ID);
      this.$.ajax_page.params = params;
      let page_request = this.$.ajax_page.generateRequest();
      var element = this;

      page_request.completes.then(function(req){
          var response = req.response;
          var output = element._parse_page_item(response);

          // Get all parents (if any)
          if (response.parent != 0) {
              element.get_parents(response.parent);
          }
          else {
              element.set('has_parents', false);
          }

          // Get all children (if any)
          output['children'] = element.get_page_descendents(output['id'])
          output['retrieved_children'] = true;

          if (element.verbose) {
              console.log("Current page object:", output);
          }
          element.set("current_page", output);
      }, function(rejected) {
      }
  )
  }

  get_parents(id){
      /* Fetches all ancestors of a page. appends to parents property. */
      let params = {"_fields": "title,id,link,parent"};
      this.$.ajax_page.url = this.page_url(id);
      this.$.ajax_page.params = params;
      let page_request = this.$.ajax_page.generateRequest();
      var element = this;
      page_request.completes.then(function(req){
          var response = req.response;
          var parent = element._parse_page_item(response);
          element.push('parents', parent)
          if (response.parent == 0) {
              element.notifyPath("parents");
              element.set('has_parents', true);
          }
          else {
              element.get_parents(response.parent)
          }
          }, function(rejected) {
          }
      )
  }

  _element_loaded_comp(all_menus_retrieved, is_hierarchical) {
      /* Function for computing element_loaded property */
      if ( (typeof is_hierarchical !== 'undefined') && all_menus_retrieved ) {
          return true;
      }
  }
  _element_loaded_obs(newValue, oldValue){
      /* Observer that fires when all api calls are completed after initial load */
      if (typeof newValue == 'undefined') {
          return;
      }
      if (this.verbose) {
          console.log('Element is loaded:', newValue);
      }

      // integrate current page into menu if possible
      // and ensure data object is complete to display menu for current page.
      let menu_location = this._integrate_page_menu();
      this.queue_menu(menu_location);
  }

  _integrate_page_menu(){
      /* Finds location of current page in menu (if possible) */
      if (this.verbose) {
          console.log("Integrating menu...");
      }

      this.notifyPath("current_page");
      var menu_location = [-1];

      // Construct object of flattened page ids/paths from menu
      var flat_menu = {};
      for (var i = 0; i < this.menu_data.length; i++) {
          let link_obj = {};
          link_obj['location'] = i;
          link_obj['id'] = this.menu_data[i]['id'];
          link_obj['path'] = this.menu_data[i]['path'];
          link_obj['child_ids'] = this.menu_data[i].children.map(link=>Number(link.id));
          link_obj['child_paths'] =this.menu_data[i].children.map(link=>link.path);
          flat_menu[this.menu_data[i]['path']] = link_obj;
      }

      // Library policies page is hierarchical but does not get an expand arrow
      if (WP_POST_ID == 3967) {
          if (this.verbose) {
              console.log("page is library policy");
          }
          for (var i = 0; i < this.menu_data.length; i++) {
              if ( this.menu_data[i]['id'] == this.current_page.id) {
                  menu_location = [i];
                  break;
              }
          }
      }

      // page is a service
      else if (WP_POST_TYPE == "service" || WP_POST_ID == 3858) {
          for (var i = 0; i < this.menu_data.length; i++) {
              if ( this.menu_data[i]['path'] == "/services/") {
                  menu_location = [i];
                  break;
              }
          }
      }

      // Integrate if a library under Visit section, which has custom post type
      else if (WP_POST_TYPE == 'library') {
          if (this.verbose) {
              console.log("page is library");
          }
          let v = flat_menu['/library/'];
          for (var i = 0; i < v.child_ids.length; i++) {
              if (v.child_ids[i] == WP_POST_ID) {
                  menu_location = [v.location, i];
                  break;
              }
          }
      }

      // Integrate hierarchical page tree into the menu_data property
      else if (this.is_hierarchical) {

          // Check if page or its oldest ancestor is an existing menu item
          let in_nav = false;
          let page_match = this.current_page;
          if (this.has_parents) {
              page_match = this.parents.slice(-1)[0];
          }
          let h_menus = ['/about/', '/alumni-friends/', '/lang-prize/'];
          if (h_menus.includes(page_match.path)) {
              in_nav = true;
          }

          // Incorporate menu into nav
          if (in_nav) {
              if (this.verbose) {
                  console.log("page is hierarchy and in nav");
              }

              // page is top level
              if (h_menus.includes(this.current_page.path)) {
                  menu_location = [flat_menu[page_match.path].location]
                  if (this.verbose) {
                      console.log("page is in top level nav");
                  }
                  return menu_location
              }

              // page is deep
              let parent_ids = this.parents.map(parent => parent.id);
              for (var i = 0; i < flat_menu[page_match.path].child_ids.length; i++) {
                  let tier2_id = flat_menu[page_match.path].child_ids[i];
                  menu_location = [flat_menu[page_match.path].location];

                  // page is second level
                  if (tier2_id == WP_POST_ID) {
                      if (this.verbose) {
                          console.log("Page is in tier 2 of main nav.");
                      }
                      menu_location.push(i)
                      let menu_path = `menu_data.${menu_location[0]}.children`;
                      menu_path += `.${menu_location[1]}.`;
                      this.set(menu_path + `children`, this.current_page.children);
                      this.set(menu_path + `retrieved_children`, this.current_page.retrieved_children);
                      this.notifyPath('menu_data');
                      return menu_location;
                  }

                  // page is beyond default limit of menu
                  if (parent_ids.includes(tier2_id)) {
                      if (this.verbose) {
                          console.log("Page is beyond tier 2 of main nav.");
                      }
                      menu_location.push(i);
                      let flat_branch = this.parents.slice(0);
                      flat_branch.reverse();
                      flat_branch.push(this.current_page);
                      flat_branch.splice(0, 2);
                      let new_branch = this._nest_menu(flat_branch, this.current_page.children);
                      let menu_path = `menu_data.${menu_location[0]}.children`;
                      menu_path += `.${menu_location[1]}.children`;
                      this.set(menu_path, [new_branch]);
                      this.notifyPath('menu_data');
                      for (var i = 0; i < this.parents.length - 1; i++) {
                          menu_location.push(0);
                      }
                      break;
                  }
              }


          }

          // Create new hidden menu branch
          else {
              if (this.verbose) {
                  console.log("page is part of floating hierarchy");
              }
              let flat_branch = this.parents.slice(0);
              flat_branch.reverse();
              flat_branch.push(this.current_page);
              let new_branch = this._nest_menu(flat_branch, this.current_page.children);

              new_branch.link_style = 'menu_float';
              menu_location = [this.menu_data.length];
              for (parent of this.parents) {
                  menu_location.push(0);
              }
              this.push('menu_data', new_branch);

          }

      }

      // Check if non hierarchical page is in main nav
      else if (WP_POST_TYPE == 'page'){
          if (this.verbose) {
              console.log("Page is not hierarchical");
          }
          for (var i = 0; i < this.menu_data.length; i++) {
              if (this.menu_data[i].path == this.current_page.path) {
                  menu_location = [i];
                  break;
              }
          }
      }

      return menu_location
  }

  queue_menu(obj_index, transition=false){
      /* Sets 'next menu' property if data object is complete using _selected_menu_comp observer
      Fires fetch requests if data object not complete.
      Fires lookahead fetch requests, which are not required to display menu, but decrease future load time.
      */
      var element = this;
      if (this.verbose) {
          console.log("Queuing menu with location:", obj_index);
      }

      if (obj_index.length == [-1]) {
          this.set('next_menu', {'location': obj_index, 'transition': transition});
          return
      }

      // Make sure children have been retrieved for all ancestors in selected menu
      // Fire lookaheads for grandchildren
      for (var i = 1; i < obj_index.length + 1; i++) {
          let getter = `menu_data`;
          let obj_index_slice = obj_index.slice(0, i);
          for (var ii = 0; ii < obj_index_slice.length; ii++ ) {
              if (ii == obj_index_slice.length - 1) {
                  getter += `.${obj_index_slice[ii]}.`
              }
              else {
                  getter += `.${obj_index_slice[ii]}.children`
              }
          }
          let parent_status =  this.get(getter + "retrieved_children");
          let parent_object = this.get(getter + "object");

          if ( parent_status == false && parent_object == 'page') {
              this.set("_api_calls_needed." + obj_index_slice.toString(), false);
              this.notifyPath("_api_calls_needed");

              // get children of ancestor, and grandchildren on delay
              if (i < obj_index.length) {
                  if (this.verbose) {
                      console.log("Fetching children of parent", obj_index_slice);
                  }
                  this.get_page_descendents(this.get(getter + "id"), obj_index_slice, true);
              }

              // Get children and grandchildren of current page selection immediately
              else {
                  if (this.verbose) {
                      console.log("Fetching children and grandchildren of current page selection", obj_index_slice);
                  }
                  this.get_page_descendents(this.get(getter + "id"), obj_index_slice, 'now');
              }
          }
          else if ( parent_status == true ) {
              let parent_children = this.get(getter + "children");
              for (var child_i = 0; child_i < parent_children.length; child_i++) {
                  let child_object = parent_children[child_i]['object'];
                  if (child_object != 'page') {
                      continue;
                  }
                  let child_id = parent_children[child_i]['id'];
                  let child_slice = Array.from(obj_index_slice);
                  let child_status = parent_children[child_i]['retrieved_children'];
                  child_slice.push(child_i);
                  if (child_status) {
                      continue;
                  }

                  // get grandchildren of ancestors on a delay
                   if (i < obj_index.length){
                       if (this.verbose) {
                           console.log("Scheduling fetch of ancestor grandchild", child_slice);
                       }
                       setTimeout(function(){
                           element.get_page_descendents(child_id, child_slice, false, false);
                       }, 2000);
                   }

                   // only display menu if granchildren of current selection have been retrieved
                   // and get great grandchildren on delay
                   else {
                       if (this.verbose) {
                           console.log("Fetching current page selection granchildren", child_slice);
                       }
                       this.set("_api_calls_needed." + child_slice.toString(), false);
                       this.notifyPath("_api_calls_needed");
                       this.get_page_descendents(child_id, child_slice, true);
                   }

              }
          }

      }

      this.set('next_menu', {'location': obj_index, 'transition': transition});

  }

  _selected_menu_comp(next_menu, _api_calls_made) {
      /* Observer for next_menu, _api_calls_made
      Constructs and sets visibile menu object.
      Fires CSS animations if necessary */

      next_menu = this.next_menu;
      _api_calls_made = this._api_calls_made;
      let menu_items = []
      let selected_menu = {}
      if (_api_calls_made == false || Object.keys(next_menu).length === 0) {
          return {}
      }

      if (this.verbose) {
          console.log("Ready to display menu", next_menu);
      }

      // Handle non-deep menuing
      if (next_menu.location.length <= 1) {
          let has_children = false;
          menu_items = JSON.parse(JSON.stringify(this.menu_data));
          for (var i = 0; i < menu_items.length; i++) {
              if (i == next_menu.location[0] ) {
                  menu_items[i].selected = true;
                  if (menu_items[i].children.length > 0) {
                      has_children = true;
                  }
              }
              else {
                  menu_items[i].selected = false;
              }
              if (menu_items[i].children.length > 0) {
                  menu_items[i].has_children = true;
              }
              menu_items[i]['array_loc'] = i;
          }

          // show second level menu
          if (has_children) {
              let breadcrumbs = [{"label": "Back to Main Menu", "link": "/", "link_style": "parent", "array_loc": "-1", "mm_link": true}];
              let children = menu_items[next_menu.location[0]].children;
              let array_loc = [next_menu.location[0]];
              for (var i = 0; i < children.length; i++) {
                  children[i].array_loc = array_loc.concat([i]).toString();
                  if (children[i].children.length > 0) {
                      children[i].has_children = true;
                  }
                  else {
                      children[i].has_children = false;
                  }
                  children[i].link_style = 'standard';
              }
              let ms = [];
              ms.push(menu_items[next_menu.location[0]]);
              ms = ms.concat(children);
              ms[0].has_children = false;
              ms[0].link_style = "parent";
              ms[0].array_loc = array_loc.toString();
              selected_menu = {"breadcrumbs": breadcrumbs, "socialmedia": false, "main": ms};
              this.set('selected_menu', selected_menu);
              this.notifyPath('selected_menu');
              this.set('show_menu', true);
              if (this.verbose) {
                  console.log("Selected menu object constructed:", selected_menu);
              }
              this.notifyPath('show_menu');
              return;
          }

          // show top level menu
          else {
              selected_menu = {"breadcrumbs": [], "socialmedia": true, "main": menu_items};
              this.set('selected_menu', selected_menu);
              this.notifyPath('selected_menu');
              this.set('show_menu', true);
              if (this.verbose) {
                  console.log("Selected menu object constructed:", selected_menu);
              }
              this.notifyPath('show_menu');
              return
          }
      }

      // construct a deep menu
      let getter = `menu_data`;
      let siblings = [];
      let parent = {};
      let array_loc = [];
      let loc = next_menu.location;
      for (var i = 0; i < loc.length; i++) {
          if (i == loc.length - 1) {
              parent = this.get(getter.slice(0, -9));
              parent = JSON.parse(JSON.stringify(parent));
              parent.array_loc = array_loc.toString();
              siblings = this.get(getter);
              siblings = JSON.parse(JSON.stringify(siblings));
              for (var ii = 0; ii < siblings.length; ii++) {
                  siblings[ii].array_loc = array_loc.concat([ii]).toString();
                  siblings[ii].selected = false;
                  if (siblings[ii].children.length > 0) {
                     siblings[ii].has_children = true;
                  }
                  else {
                     siblings[ii].has_children = false;
                  }
              }
              getter += `.${loc[i]}`;
          }
          else {
              getter += `.${loc[i]}.children`;
          }
          array_loc.push(loc[i]);
      }
      let selected_children = this.get(getter + ".children");
      selected_children = JSON.parse(JSON.stringify(selected_children));
      for (var ii = 0; ii < selected_children.length; ii++) {
          selected_children[ii].array_loc = array_loc.concat([ii]).toString();
          if (selected_children[ii].children.length > 0) {
              selected_children[ii].has_children = true;
          }
      }

      // Show selected page as parent with children
      if (selected_children.length > 0) {
          let ch = this.get(getter);
          ch = JSON.parse(JSON.stringify(ch));
          menu_items.push( ch );
          menu_items[0].selected = true;
          menu_items[0].has_children = false;
          menu_items[0].link_style = 'parent';
          menu_items = menu_items.concat(selected_children);
      }

      // Show selected page as sibling
      else {
          menu_items.push( parent );
          menu_items[0].link_style = 'parent';
          siblings[loc.slice(-1)]['selected'] = true;
          menu_items = menu_items.concat(siblings);

      }

      // Get grandparents (breadcrumbs)
      let breadcrumbs = [{"label": "Back to Main Menu", "link": "/", "link_style": "parent", "array_loc": "-1", "mm_link": true}];
      if (loc.length > 1) {
          for (var i = 1; i < loc.length + 1; i++) {
              let getter = `menu_data`;
              let loc_slice = loc.slice(0, i);
              for (var ii = 0; ii < loc_slice.length; ii++ ) {
                  if (ii == loc_slice.length - 1) {
                      getter += `.${loc_slice[ii]}`
                  }
                  else {
                      getter += `.${loc_slice[ii]}.children`
                  }
              }

              if (loc_slice.length == loc.length) {
                  continue;
              }
              let breadcrumb = this.get(getter);
              breadcrumb = JSON.parse(JSON.stringify(breadcrumb));
              if (breadcrumb.path == menu_items[0].path) {
                  continue;
              }
              breadcrumb.array_loc = loc_slice.toString();
              breadcrumb.mm_link = false;
              breadcrumb.link_style = 'standard';
              breadcrumbs.push(breadcrumb)
          }
      }
      selected_menu = {"breadcrumbs": breadcrumbs, "socialmedia": false, "main": menu_items};
      this.set('selected_menu', selected_menu);
      this.notifyPath('selected_menu');
      this.set('show_menu', true);
      if (this.verbose) {
          console.log("Selected menu object constructed:", selected_menu);
      }
      this.notifyPath('show_menu');
      return

  }

  _api_calls_made_comp(_api_calls_needed){
      /* Function that sets _api_calls_made property.
      Returns true if all needed api calls have been made for the requested menu.
      */
      _api_calls_needed = this._api_calls_needed;
      for (var key in _api_calls_needed) {
          if (_api_calls_needed.hasOwnProperty(key)) {
              if (_api_calls_needed[key] == false) {
                  this.set('show_menu', false);
                  return false
              }
          }
      }
      if (this.verbose) {
          console.log("All page descendents api calls have been made.", _api_calls_needed);
      }

      return true
  }

  _get_from_menu_data(obj_index, formatted=false){
      /* Retrieves data from primary menu object given index array */

      let getter = `menu_data`;
      for (var i = 0; i < obj_index.length; i++) {
          if (i == obj_index.length - 1) {
              getter += `.${obj_index}`
          }
      }
  }

  _nest_menu(flat_branch, last_children=[]) {
      /* Nests an array of links under the preceding's children property */
      let new_branch = {}
      for(let i = flat_branch.length - 1; i >= 0 ; i--){
          if (i == flat_branch.length - 1) {
              new_branch = flat_branch[i];
              new_branch['children'] = last_children;
          }
          else {
              flat_branch[i]['children'] = [new_branch];
              new_branch = flat_branch[i]
          }
      }
      return new_branch
  }

  _is_hierarchical_obs(newValue, oldValue) {
      /* Observer that fires depending on if the current page needs a menu */
      if (this.verbose) {
          console.log(`Current post (${WP_POST_ID}) hierarchy status:`, newValue);
          console.log(`Has parent(s):`, this.has_parents);
          console.log(`Has children:`, this.has_children);
      }
  }

  _is_hierarchical_comp(has_children, has_parents){
      /* Computed function is_hierarchical property */
      if ( (typeof has_children == 'undefined') || (typeof has_parents == 'undefined') ) {
          return
      }
      if (has_children || has_parents) {
          return true
      }
      else {
          return false
      }

  }

  get_wp_menu(menu) {
      /* Queries Wordpress API for ucdlib menu including submenus */
      var output = []

      // Get parent menu
      this.$.ajax_menu.url = this.menu_url(menu);
      let request_parent = this.$.ajax_menu.generateRequest();
      var element = this;
      request_parent.completes.then(function(req){
          var response = req.response;
          for (var link of response.items) {
              let link_filtered = element._parse_menu_item(link);
              if (menu == 'info') {
                  link_filtered['link_style']  = "menu-info";
              }
              output.push(link_filtered);
          }

          // Fetch and combine the various submenus of the parent menu
          // First attempt to match on page id, then the label
          let submenus = element.menus_to_retrieve[menu];
          for (var submenu of submenus) {
              element.$.ajax_menu.url = element.menu_url(submenu);
              let request_child = element.$.ajax_menu.generateRequest();
              request_child.completes.then(function(child_req){
                  var child_response = child_req.response;
                  let parent = child_response.items.shift();
                  parent = element._parse_menu_item(parent)
                  var in_output = false;
                  for (var i = 0; i < output.length; i++) {
                      if ( (output[i]['id'] == parent['id']) && (output[i]['object'] == parent['object']) ) {
                          in_output = true;
                          break;
                      }
                      else if ( output[i]['path'] == parent['path'] ) {
                          in_output = true;
                          break;
                      }
                  }
                  if (in_output == true) {
                      for (var child_link of child_response.items) {
                          let child_link_filtered = element._parse_menu_item(child_link);
                          output[i]['children'].push(child_link_filtered);
                          output[i]['retrieved_children'] = true;
                      }
                  }
                  element.push("menus_retrieved", [menu, submenu]);
                  element.notifyPath("menus_retrieved");

              }, function(rejected) {
              }
          )
          }

          // Constuct main data array. ensure main-nav is displayed first
          if (menu == 'main-nav') {
              element.menu_data = output.concat(element.menu_data);
          }
          else {
              element.menu_data = element.menu_data.concat(output);
          }

        }, function(rejected) {
            console.error("Unable to retrieve menus. Ensure Wordpress API Plugin extension is installed.");
        }
      )

      if (element.verbose) {
          console.log("Retrieved menu", menu, output);
      }
  }

  get_page_descendents(id, menu_index=false, lookahead=false, notify=true){
      /* Get children or all descendents of a page */
      let output = [];

      if (this.verbose) {
          console.log("Retrieving children for page", id, "of menu_index", menu_index, "Fetching grandchildren:", lookahead);
      }

      // Set up API query and make call
      let params = {"parent":id, "_fields": "title,id,link",
                    "per_page": "20", "orderby":"title", "order":"asc"};
      this.$.ajax_descendents.params = params;
      let request = this.$.ajax_descendents.generateRequest();
      var element = this;
      request.completes.then(function(req) {
          var response = req.response;

          for (var page of response) {
              var page_filtered = element._parse_page_item(page);
              output.push(page_filtered);
          }

          // Main data structure has already been constructed
          if ( menu_index ) {
              let getter = `menu_data`;
              for (var ii = 0; ii < menu_index.length; ii++ ) {
                  if (ii == menu_index.length - 1) {
                      getter += `.${menu_index[ii]}.`
                  }
                  else {
                      getter += `.${menu_index[ii]}.children`
                  }
              }
              element.set(getter + "retrieved_children", true);
              let existing_children = element.get(getter + "children");


              for (var i = 0; i < output.length; i++) {

                  // push children to existing menu object
                  if (existing_children.length > 0) {
                      if (output[i].id == existing_children[0].id) {
                          continue
                      }
                  }
                  let data_i = element.push(getter + "children", output[i]) - 1;

                  // get grandchildren
                  if (lookahead) {
                      let child_index = Array.from(menu_index);
                      let child_id = output[i].id
                      child_index.push(data_i);

                      if (lookahead == 'now') {
                          element.set("_api_calls_needed." + child_index.toString(), false);
                          element.notifyPath("_api_calls_needed");
                          element.get_page_descendents(child_id, child_index, false);
                      }
                      else {
                          setTimeout(function(){
                              element.get_page_descendents(child_id, child_index, false, false);
                          }, 2000)
                      }

                  }

              }
              element.notifyPath("menu_data");
              if (notify) {
                  element.set("_api_calls_needed." + menu_index.toString(), true);
                  element.notifyPath("_api_calls_needed");
              }
          }

          // Part of initial element set up
          else if ( id == WP_POST_ID ) {
              if (response.length > 0) {
                  element.set('has_children', true);
              }
              else {
                  element.set('has_children', false)
              }
          }

      }, function(rejected) {}
    )

    return output;

  }

  menu_url(menu){
      /* Constructs menu api url */
      let output = this.library_url + this.api_base_url + this.api_menu_url;
      output += ("/" + menu);
      return output;
  }

  page_url(page){
      /* Constructs page api url */
      let output = this.library_url + this.api_base_url + this.api_pages_url;
      output += ("/" + page);
      return output;
    }

  _parse_menu_item(item){
      /* Extract relevant data from a menu item */
      let output = {};
      output['id'] = Number(item.object_id);
      output['object'] = item.object;
      output['link'] = item.url;
      output['path'] = this._get_link_path(item.url);
      output['label'] = this._decodeHtml(item.title);
      output['order'] = item.menu_order;
      output['children'] = [];
      output['retrieved_children'] = false;
      output['link_style'] = "parent";
      output['selected'] = false;

      return output;
  }

  _parse_page_item(item){
      /* Extract relevant data from a page item */
      let output = {};
      output['id'] = Number(item['id']);
      output['object'] = 'page';
      output['label'] = this._decodeHtml(item['title']['rendered'])
      output['link'] = item['link'];
      output['path'] = this._get_link_path(item.link);
      output['children'] = [];
      output['retrieved_children'] = false;
      output['link_style'] = "standard";
      output['order'] = 'read acf field';
      output['selected'] = false;

      return output;
  }

  _decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  _all_menus_retrieved(menus_retrieved) {
      /* Checks if all the main-nav menus were retrieved */
      if (this.menus_retrieved.length >= this.n_menus_to_retrieve){
          this.menu_data.map(link => link.retrieved_children = true);
          this.notifyPath('menu_data');
          if (this.verbose) {
              console.log("Entire main nav menu retrieved:", this.menu_data);
          }


          return true
      }
      else {
          return false
      }
  }
  _n_menus_to_retrieve(menus_to_retrieve) {
      let i = 0;
      for (var menu in menus_to_retrieve) {
          if (menus_to_retrieve.hasOwnProperty(menu)) {
              i += menus_to_retrieve[menu].length
          }
      }
      return i
  }

  _get_link_path(href){
      /* Return a path, given a link. Used to match menu/page items. */
      let l = document.createElement("a");
      l.href = href;
      if ( l.pathname.endsWith("/") == false ) {
          l.pathname += "/"
      }
      return l.pathname;
  }



}

customElements.define(UCDLibraryMobileNav.is, UCDLibraryMobileNav);
