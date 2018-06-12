import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@ucd-lib/cork-app-utils/lib/Mixin.js"
import '@polymer/iron-ajax/iron-ajax.js';

import "./styles/shared-styles.js";
import LightDom from './styles/light-dom.js';

class LibraryHoursSingle extends Mixin(PolymerElement)
.with(LightDom) {
    static get template(){
        return html`
    <iron-ajax
        id$="[[search_term]]"
        url$="[[endpoint]]"
        params$="[[api_params]]"
        handle-as="json"
        on-response="handle_response"
        debounce-duration="300">
    </iron-ajax>
    <span class="open-status">
        <img  class="status-icon" src$=[[status_icon]] alt$=[[status]]>
        <strong>[[status_str]]</strong>
    </span>
    <div class="open-hours">
        <span class="keep-together">[[todays_hours.open]]</span>
        <span class="keep-together">[[todays_hours.close]]</span>
    </div>

        `;
    }

  static get is() { return 'library-hours-single'; }
  static get properties() {
    return {
      verbose: {
          type:Boolean,
      },
      today: {
          type: Date,
      },
      endpoint: {
          type: String,
      },
      key: {
          type: String,
      },
      search_term: {
          type: String,
      },
      api_params: {
          type: Object,
      },
      status: {
          type: String
      },
      status_str: {
          type: String
      },
      status_icon: {
          type: String
      },
      todays_hours: {
          type: Object
      },
      icon_dir: {
          type: String,
          value: ""
      }

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
      if (this.verbose) {
          console.log("today", this.today);
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
      // Then make calls with iron-ajax component
      var api_params = {'key':this.key, "q":this.search_term, "singleEvents": true};
      var timeMax = this.today.toJSON().split("T")[0] + "T22:00:00-07:00";
      api_params['timeMax'] = timeMax;
      var timeMin = this.today.toJSON().split("T")[0] + "T02:00:00-07:00";
      api_params['timeMin'] = timeMin;
      this.api_params = api_params;
      if (this.verbose){
          console.log("api_params", api_params);
      }

      this.querySelector("#" + this.search_term).generateRequest();

  }

  handle_response(response){
      // Extract data from google api call and metadata iron-ajax.
      var data = response.detail.response;
      if (this.verbose){
          console.log("raw response", data);
      }

      if (data.items.length < 1 ){
          this.set("status", "lib-closed");
          this.set("status_icon", this.icon_dir + "closed-lib.svg");
      }
      else {
          if (data.items.length > 1) {
              console.log(`More than one event retrieved for ${this.search_term}. Displaying first item.`);
          }

          // Parse start and end time
          var cal_item = data.items[0];
          var parsed_item = {}

          // Check if event is all day
          if ('dateTime' in  cal_item['start']){
              var start = this._split_datetime(cal_item['start']['dateTime']);
              parsed_item['start_date'] = start['date'];
              parsed_item['start_time'] = start['time'];
              parsed_item['end_time'] = this._split_datetime(cal_item['end']['dateTime'])['time'];
          }
          else {
              parsed_item['start_date'] = new Date(this.today);
              parsed_item['start_time'] = "00:00";
              parsed_item['end_time'] = "00:00";
          }

          if (this._open_now(parsed_item)){
              this.set("status", "lib-open");
              this.set("status_icon", this.icon_dir + "open-lib.svg");
          }
          else {
              this.set("status", "lib-closed");
              this.set("status_icon", this.icon_dir + "closed-lib.svg");
          }

      }

      // set display text depending on open/close
      if (this.status == 'lib-closed') {
          this.set('status_str', 'Currently CLOSED');
          this.set("todays_hours", {'open': '', 'close': ''});
      }
      else {
          this.set('status_str', 'Currently OPEN');
          var todays_hours = this._hours_string(parsed_item);
          this.set("todays_hours", todays_hours);

      }

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

  _split_datetime(date_str){
      /*
      Splits json datetime string into a 2 item object with no tz info
      */
      var datetime_obj = {};
      var datetime_arr = date_str.split('T');
      var date_arr = datetime_arr[0].split("-");
      datetime_obj['date'] = new Date(datetime_arr[0]);
      datetime_obj['time'] = datetime_arr[1].substr(0, 5);

      return datetime_obj;
  }

  _hours_string(data){
      /*
      Takes hours oject and creates a display string for element.
      */

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
              display_dict['open'] = "Today: " + display_string + " -";
          }
          else{
              display_dict['close'] = display_string;
          }
      }
      return display_dict;

  }

  _open_now(data){
      // Checks if library is currently open
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

}

customElements.define(LibraryHoursSingle.is, LibraryHoursSingle);
