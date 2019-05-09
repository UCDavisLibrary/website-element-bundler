import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
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
      next_menu: {
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
      // and set selected_menu property
      let menu_location = this._integrate_page_menu();
      this.queue_menu(menu_location);

      // display menu if all sibling and parent children have been fetched
      // have a function that listens to changes in selected_menu
      // and checks that 1. parent's children are loaded
      // and 2. siblings children and sets menu_loaded property
      // this.set('menu_loaded', true); NOT HERE

      // fire lookahead function
      // parent's grandchildren
      // sibling's grandchildren
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
                  return menu_location
              }

              // page is deep
              let parent_ids = this.parents.map(parent => parent.id);
              for (var i = 0; i < flat_menu[page_match.path].child_ids.length; i++) {
                  let tier2_id = flat_menu[page_match.path].child_ids[i];
                  menu_location = [flat_menu[page_match.path].location];

                  // page is second level
                  if (tier2_id == WP_POST_ID) {
                      return menu_location
                  }

                  // page is beyond default limit of menu
                  if (parent_ids.includes(tier2_id)) {
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
      /* Sets 'next menu' property. Fires fetch requests if data object not complete. */

      // Get url paths of location in case object index changes on fetch
      // might not need to do this if make sort a computed function right before render
      /*
      let obj_paths = [];
      for (var i = 1; i < obj_index.length + 1; i++) {
          let getter = `menu_data`;
          let obj_index_slice = obj_index.slice(0, i);
          for (var ii = 0; ii < obj_index_slice.length; ii++ ) {
              if (ii == obj_index_slice.length - 1) {
                  getter += `.${obj_index_slice[ii]}.path`
              }
              else {
                  getter += `.${obj_index_slice[ii]}.children`
              }
          }
          obj_paths.push(this.get(getter))
      }
      let obj_location = {'index': obj_index, 'paths': obj_paths}
      */
      let obj_location = {'index': obj_index}
      this.set('next_menu', {'location': obj_location});
      if (this.verbose) {
          console.log("Queuing menu with location:", obj_location);
      }


      // ensure grandchildren of every level have been fetched (including self)
      // loop object index and then slice, get full object
      // check retrieved_children, loop children and check their status (if i doesnt equal next)
      // needs reindex if retrieved children = false, but has children

      // Make use children have been retrieved for all ancestors in selected menu
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
              this.get_page_descendents(this.get(getter + "id"), obj_index_slice, true);

          }
      }

      if ( this._api_calls_made == true ) {
          // call display_menu(obj_location, transition)
      }

  }

  _api_calls_made_comp(_api_calls_needed){
      /* Function that sets _api_calls_made property.
      Returns true if all needed api calls have been made for the requested menu.
      */
      for (var key in this._api_calls_needed) {
          if (object.hasOwnProperty(key)) {
              if (this._api_calls_needed[key] == false) {
                  return false
              }
          }
      }
      if (this.verbose) {
          console.log("All page descendents api calls have been made.", this._api_calls_needed);
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
                  link_filtered['link_style']  = "menu_info";
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

              }, function(rejected) {}
          )
          }

          // Constuct main data array. ensure main-nav is displayed first
          if (menu == 'main-nav') {
              element.menu_data = output.concat(element.menu_data);
          }
          else {
              element.menu_data = element.menu_data.concat(output);
          }

        }, function(rejected) {}
      )

      if (element.verbose) {
          console.log("Retrieved menu", menu, output);
      }
  }

  get_page_descendents(id, menu_index=false, lookahead=false){
      /* Get children or all descendents of a page */
      let output = [];

      if (this.verbose) {
          console.log("Retrieving children for page", id, menu_index, lookahead);
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
                  element.push(getter + "children", output[i]);

                  // get grandchildren
                  if (lookahead) {
                      let child_index = Array.from(menu_index);
                      if (existing_children.length > 0) {
                          child_index.push(i + 1)
                      }
                      else {
                          child_index.push(i)
                      }
                      element.get_page_descendents(output[i].id, child_index, false);
                  }

              }
              element.set("_api_calls_needed." + menu_index.toString(), true);
              element.notifyPath("menu_data");
              element.notifyPath("_api_calls_needed");
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
      output['id'] = item.object_id;
      output['object'] = item.object;
      output['link'] = item.url;
      output['path'] = this._get_link_path(item.url);
      output['label'] = this._decodeHtml(item.title);
      output['order'] = item.menu_order;
      output['children'] = [];
      output['retrieved_children'] = false;
      output['link_style'] = "parent";

      return output;
  }

  _parse_page_item(item){
      /* Extract relevant data from a page item */
      let output = {};
      output['id'] = item['id'];
      output['object'] = 'page';
      output['label'] = this._decodeHtml(item['title']['rendered'])
      output['link'] = item['link'];
      output['path'] = this._get_link_path(item.link);
      output['children'] = [];
      output['retrieved_children'] = false;
      output['link_style'] = "standard";
      output['order'] = 'read acf field';

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
