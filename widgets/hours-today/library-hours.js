import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';

import "./styles/shared-styles.js";
import LightDom from './styles/light-dom.js';

class LibraryHours extends Mixin(PolymerElement)
.with(LightDom) {
    static get template(){
        return html`
        <iron-ajax
            id="init_ajax"
            url$="[[json_path]]"
            handle-as="json"
            on-response="_make_iron_ajax"
            debounce-duration="300"></iron-ajax>


    <template id="ajax_repeater" is="dom-repeat" items={{_api_parameters}} as="api">
    <iron-ajax
        id="[[api.id]]"
        url="[[api.url]]"
        params="[[api.params]]"
        handle-as="json"
        on-response="handle_response"
        debounce-duration="300"></iron-ajax>
    </template>

        <div>
            <div class="link-see-all-top clearfix">
                <div class="float-xs-left">
                    <h2 style="padding-right:5px;">Library Hours Today</h2>
                </div>
                <div class="float-xs-right" style="margin-top:8px;">
                    <a href$="[[see_all]]" class="bold-link">See All
                        <i class="cork-chevron right small gold" style="vertical-align: text-bottom;"></i>
                    </a>
                </div>
            </div>
            <div class="spacer"></div>
        </div>

        <div class="hours-table">
            <template is="dom-repeat" items="{{hours_today}}" sort=sort_hours>
                <div class="hours-tr">
                    <div class="hours-td" style="width:59%;">
                        <a class$="[[item.type]]" href$=[[item.url]]>
                        <img  class="status-icon" src$=[[item.icon_url]] alt$=[[item.status]]>
                        [[item.title]]
                        </a>
                    </div>
                    <div class$="[[item.status]] hours-td" style="width:41%;">
                        <span class="keep-together">[[item.display_string.open]]</span>
                        <span class="keep-together">[[item.display_string.close]]</span>
                    </div>
                </div>
            </template>
        </div>

        `;
    }

  static get is() { return 'library-hours'; }
  static get properties() {
    return {
      _calendars: {
        type: Object,
        value: {},
    },
      _api_parameters: {
          type: Array,
          value: [],
      },
      json_path: {
        type: String,
      },
      see_all: {
        type: String,
        value: "",
      },
      verbose: {
          type:Boolean,
      },
      hours_today: {
        type: Array,
        value: [],
      },
      today: {
          type: Date
      },
        ajax_ids: {
          type: Array,
          value: [],
      },
      event_ids: {
        type: Array,
        value: [],
    },
    icon_dir : {
        type: String,
        value: "",
    },
    _lib_event_crosswalk: {
      type: Object,
      value: {},
  },
    };
  }
  constructor() {
      super();

  }

  ready(){
      super.ready();

      // Get Today
      try {
          var today = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
          today = new Date(today.split(',')[0]);
          this.today = today;
      }
      catch(err) {
          today = this._ie_today();
          this.today = today;
      }

      // ie polyfill
      if (!String.prototype.includes) {
          String.prototype.includes = function(search, start) {
            'use strict';
            if (typeof start !== 'number') {
              start = 0;
            }

            if (start + search.length > this.length) {
              return false;
            } else {
              return this.indexOf(search, start) !== -1;
            }
          };
        }


      // Load JSON file with Google Calendar API call parameters.
      // Then make calls with iron-ajax componenets
      this.$["init_ajax"].generateRequest();

  }

  _make_iron_ajax(response){
      var data = response.detail.response;

      //TODO: validate json file

      // Format data to fill in iron-ajax parameters
      for (var i = 0; i < data.length; i++){
          var ajax_params = {};
          this.push('ajax_ids', data[i].ajax_id);
          ajax_params['url'] = data[i].url;
          ajax_params['params'] = data[i].params;
          ajax_params['params']['singleEvents'] = true;
          var timeMax = this.today.toJSON().split("T")[0] + "T22:00:00-07:00";
          ajax_params['params']['timeMax'] = timeMax;
          var timeMin = this.today.toJSON().split("T")[0] + "T02:00:00-07:00";
          ajax_params['params']['timeMin'] = timeMin;
          ajax_params['id'] = data[i].ajax_id;

          this._lib_event_crosswalk[data[i].ajax_id] = data[i].event_series;
          for (var ii = 0; ii < data[i].event_series.length; ii++) {
              this.push('event_ids', data[i].event_series[ii]['search_term']);
          }
          this.push('_api_parameters', ajax_params);
      }
      if (this.verbose) {
          console.log("api parameters", this._api_parameters);
      }

      // Call iron-ajax components we just created
      this.$.ajax_repeater.render();
      for (var i = 0; i < this.ajax_ids.length; i++){
          //this.shadowRoot.querySelector("#" + this.ajax_ids[i]).generateRequest();
          this.querySelector("#" + this.ajax_ids[i]).generateRequest();

      }


  }

  handle_response(response){

      // Extract data from google api call and metadata iron-ajax.
      var data = response.detail.response;
      if (this.verbose){
          console.log("raw response", data);
      }
      var ajax_id = response.target.getAttribute('id');
      var cal_events = this._lib_event_crosswalk[ajax_id];

      // Get hours for each event series in JSON file
      for (var q = 0; q < cal_events.length; q++) {
          var event_id = cal_events[q].search_term;
          var lib_title = cal_events[q].title;
          var org_type = cal_events[q].type;
          var url = cal_events[q].url;

          // search description of returned events for event_id.
          var parsed_data = this._parse_calendar(data, event_id);
          var event_series = {'title': lib_title, 'id': event_id, 'data': parsed_data, 'ajax_id': ajax_id, 'type': org_type, 'url': url};
          this._calendars[event_id] = event_series;

          if (this.verbose){
              console.log(event_id, " parsed", event_series);
          }

          // Get hours for current day
          var todays_hours = parsed_data;
          todays_hours['display_string'] = this._hours_string(todays_hours);

          // Attach library metadata
          todays_hours['title'] = lib_title;
          todays_hours['id'] = event_id;
          todays_hours['url'] = url;
          if (event_series.type.toLowerCase() == "library"){
              var is_library = true;
              todays_hours['type'] = "lib-titles";
          }
          else {
              var is_library = false;
              todays_hours['type'] = "dept-titles";
          }

          // Add location of appropriate icon svg
          if (is_library){
              if (this._open_now(todays_hours)){
                  todays_hours['icon_url'] = this.icon_dir + "open-lib.svg";
              }
              else{
                  todays_hours['icon_url'] = this.icon_dir + "closed-lib.svg";

              }
          }
          else {
              if (this._open_now(todays_hours)){
                  todays_hours['icon_url'] = this.icon_dir + "open-dept.svg";
              }
              else {
                  todays_hours['icon_url'] = this.icon_dir + "closed-dept.svg";

              }
          }




          // append to element property with sort order.
          // displayed by repeater template.
          var index = this.event_ids.indexOf(event_id);
          if (index != -1) {
            todays_hours['display_order'] = index;
            this.push('hours_today', todays_hours);
            if (this.verbose){
                console.log(event_id, ' todays hours' ,todays_hours);
            }

          }

      }

  }

  _concat_id(a, b){
      return a + "__" + b;
  }

  _open_now(data){
      // Checks if library is currently open
      if (data.status == 'closed'){
          return false;
      }
      try {
          var today = new Date().toLocaleString("en-GB", {timeZone: "America/Los_Angeles"});
          var now = today.split(',')[1].split(":");
          now = parseInt(now[0] + now[1]);
      }
      catch(err) {
          var today = this._ie_today();
          var now_h = String(today.getHours());
          if (now_h.length == 1){
              now_h = "0" + now_h;
          }
          var now_m = String(today.getMinutes());
          if (now_m.length == 1){
              now_m = "0" + now_m;
          }
          var now = parseInt(now_h + now_m);
      }


      var lib_open = data.start_time.split(":");
      lib_open = parseInt(lib_open[0] + lib_open[1]);
      var lib_closed = data.end_time.split(":");
      lib_closed = parseInt(lib_closed[0] + lib_closed[1]);

      if (now >= lib_open && now < lib_closed) {
          return true;
      }
      else if (now >= lib_open && lib_open >= lib_closed) {
          return true; //hours span two days
      }
      else {
          return false;
      }


  }
  _format_header(data){
      var output = "";
      if (data.length == 7){
          output += data[0]['month_str'].toUpperCase() + " " + data[0]['day'];
          output += " - " + data[6]['month_str'].toUpperCase() + " " + data[6]['day'] + " " + data[6]['year'];
      }
      //[[week_array[0]['month_str']]] [[week_array[0]['day']]] - [[week_array[6]['month_str']]] [[week_array[6]['day']]], [[week_array[0]['year']]]
      return output;
  }

  sort_hours(a, b){
      return a.display_order - b.display_order;
  }

  _hours_string(data){
      /*
      Takes daily hours oject (from day_hours function)
      and creates a display string for element.
      */
      if (data.status == 'closed'){
          return {'open': 'CLOSED', 'close': ""};
      }

     var display_dict = {};
      var day_arr = [data.start_time, data.end_time];
      for (var i = 0; i < 2; i++){
          var display_string = "";
          var time_arr = day_arr[i].split(':');
          var hour = parseInt(time_arr[0]);
          if (hour > 12){
              hour = hour - 12;
              var t = 'pm';
          }
          else if (hour == 0){
              hour = 12;
              var t = 'am';
          }
          else if (hour == 12){
              hour = 12;
              var t = 'pm';
          }
          else {
              var t = 'am';
          }

          display_string += hour.toString() + ":" + time_arr[1];
          display_string += " " + t;
          if (i == 0) {
              display_dict['open'] = display_string + " -";
          }
          else{
              display_dict['close'] = display_string;
          }
      }
      return display_dict;

  }

  split_datetime(date_str){
      /*
      Splits google datetime string into a simplified 2 item object
      */
      var datetime_obj = {};
      var datetime_arr = date_str.split('T');
      var date_arr = datetime_arr[0].split("-");
      datetime_obj['date'] = new Date(datetime_arr[0]);
      datetime_obj['time'] = datetime_arr[1].substr(0, 5);

      return datetime_obj;
  }

  _ie_today() {

      // polyfill for ie. get current datetime in california
      // didnt want to import moment.js for such a small thing
      var d = new Date();
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      var pdt = new Date(utc + (3600000*-7));
      var pst = new Date(utc + (3600000*-8));
      var change_dates = [new Date(2015, 2, 8), new Date(2015,10,2),
                          new Date(2016, 2, 13), new Date(2016,10,7),
                          new Date(2017, 2, 12), new Date(2017,10,6),
                          new Date(2018, 2, 11), new Date(2018,10,5),
                          new Date(2019, 2, 10), new Date(2019,10,4),
                          new Date(2020, 2, 8), new Date(2020,10,2),
                          new Date(2021, 2, 14), new Date(2021,10,8),
                          new Date(2022, 2, 13), new Date(2022,10,7),
                          new Date(2023, 2, 12), new Date(2023,10,6),
                          new Date(2024, 2, 10), new Date(2024,10,4)];

      for (var i = 0; i < change_dates.length; i++){
          if (pst < change_dates[i]) {
              if (1 % 2 == 0){
                  return pst;
              }
              else {
                  return pdt;
              }
          }
      }

      // function expiration date
      console.log("Unable to determine daylight savings time. See _ie_today function");
      return d;
  }

  _parse_calendar(calendar, search_term){
      /*
      Finds event in calendar that contain search term in the description field.
      */
      var events = calendar['items'];
      var search_term_found = false;
      var cal_data = {'id': search_term, 'status': 'closed'}

      for (var i = 0; i < events.length; i++){

          if ('description' in events[i]){
              var event_description = events[i]['description'].toLowerCase();
          }
          else {
              var event_description = "";
          }

          // keep if search term is in event description
          if (event_description.includes(search_term.toLowerCase())){
              search_term_found = true;

              // Not an all day event
              if ('dateTime' in events[i]['start']){
                  var start = this.split_datetime(events[i]['start']['dateTime']);
                  cal_data['start_date'] = start['date'];
                  cal_data['start_time'] = start['time'];
                  cal_data['end_time'] = this.split_datetime(events[i]['end']['dateTime'])['time'];
              }
              else {
                  cal_data['start_date'] = new Date(this.today);
                  cal_data['start_time'] = "00:00";
                  cal_data['end_time'] = "00:00";
              }

              cal_data['status'] = 'open';
              break;
          }
      }
      return cal_data;
  }

}

customElements.define(LibraryHours.is, LibraryHours);
