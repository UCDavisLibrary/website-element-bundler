import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
//import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-pages/iron-pages.js';

import template from "./template.js";
import style from "./style.js";

import LightDom from './light-dom.js';

class UCDLibraryMobileNav extends Mixin(PolymerElement)
.with(LightDom) {
    static get template(){
        return html([template + style]);
      }

  static get is() { return 'ucd-library-mobile-nav'; }
  static get properties() {
    return {
      verbose: {
        type: Boolean
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
      menu_loaded: {
        type: Boolean
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
        computed: "_all_menus_retrieved(menus_retrieved.*)"
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
      let menu = [];
      //let menu = this.get_wp_menu('main-nav');
      menu = menu.concat(this.get_wp_menu('main-nav'))
      menu = menu.concat(this.get_wp_menu('info'));
      //this.get_wp_menu('info');
      this.set('menu_data', menu);


      // Check if current page is hierarchical
      // Get parents(all) and children of page
      if (this.verbose) {
        if (typeof WP_POST_ID !== 'undefined'){
            console.log("Page id:", WP_POST_ID);
        }
        if (typeof WP_POST_TYPE !== 'undefined'){
            console.log("Page type:", WP_POST_TYPE);
        }
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
                      else if ( output[i]['label'] == parent['label'] ) {
                          in_output = true;
                          break;
                      }
                  }
                  if (in_output == true) {
                      for (var child_link of child_response.items) {
                          let child_link_filtered = element._parse_menu_item(child_link);
                          //if ((child_link_filtered.object == 'page') && (submenu != 'library-locations')) {
                        //      child_link_filtered['children'] = element.get_page_descendents(child_link_filtered['id']);
                        //      child_link_filtered['retrieved_children'] = true;
                        //  }

                          output[i]['children'].push(child_link_filtered)
                          output[i]['retrieved_children'] = true;
                      }
                  }
                  element.push("menus_retrieved", [menu, submenu]);

              }, function(rejected) {}
          )
          }

        }, function(rejected) {}
      )

      if (element.verbose) {
          console.log("Retrieved menu", menu, output);
      }
  }

  get_page_descendents(id, all_descendents=false){
      /* Get children or all descendents of a page */
      let output = [];

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
              if (all_descendents) {
                  page_filtered['children'] = element.get_page_descendents(page_filtered['id'], all_descendents);
                  page_filtered['retrieved_children'] = true;
              }
              output.push(page_filtered);
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

  _parse_menu_item(item){
      /* Extract relevant data from a menu item */
      let output = {};
      output['id'] = item.object_id;
      output['object'] = item.object;
      output['link'] = item.url;
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
      output['link'] = item['title']['rendered'];
      output['children'] = [];
      output['retrieved_children'] = false;
      output['link_style'] = "standard";

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
          if (this.verbose) {
              console.log("Entire main nav menu retrieved.");
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



}

customElements.define(UCDLibraryMobileNav.is, UCDLibraryMobileNav);
