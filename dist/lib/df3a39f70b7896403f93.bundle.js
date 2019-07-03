(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{3:function(e,t,r){"use strict";r.r(t);var a=r(6);r(17),r(25),r(11),r(30);const n=document.createElement("template");n.innerHTML="\n<style>\nlibrary-hours-week {\n  display: block;\n  background-color: transparent;\n  padding: 0px;\n  min-width: 275px;\n}\n\nlibrary-hours-week .hours-table{\n    border-top: 3px solid #d8d8d8;\n    border-bottom: 3px solid #d8d8d8;\n    border-collapse: collapse;\n    margin-bottom: 0px;\n    width: 100%;\n    display: table;\n}\n\nlibrary-hours-week .hours-tr {\n    background-color: transparent;\n    border: none;\n    display:table-row;\n}\n\nlibrary-hours-week .hours-td {\n    border-bottom: none;\n    padding-left: 4px;\n    padding-right: 4px;\n    padding-bottom: 8px;\n    word-wrap: normal;\n    display: table-cell;\n    vertical-align: middle;\n}\n\nlibrary-hours-week .hours-th {\n    padding-top: 14px;\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center;\n}\n\nlibrary-hours-week .hours-th.is-today{\n    border-top: 3px solid #DAAA00;\n    border-right: 3px solid #DAAA00;\n    border-left: 3px solid #DAAA00;\n}\n\nlibrary-hours-week .hours-td.is-today{\n    border-right: 3px solid #DAAA00;\n    border-left: 3px solid #DAAA00;\n}\n\n\nlibrary-hours-week a {\n    color: #002655;\n}\nlibrary-hours-week img {\n    width: 25px;\n}\nlibrary-hours-week .closed {\n    color:#ba0c2f;\n    text-align: center;\n    font-weight: 600;\n    width: 11%;\n}\nlibrary-hours-week .open {\n    text-align: center;\n    width: 11%;\n}\n\nlibrary-hours-week th.is-today{\n    border-top: 3px solid #DAAA00;\n}\n\nlibrary-hours-week .keep-together{\n    white-space: nowrap;\n}\nlibrary-hours-week .status-icon{\n    margin-right: 8px;\n    margin-left: 8px;\n    margin-bottom: inherit !important;\n}\nlibrary-hours-week .lib-titles{\n      display:flex;\n      align-items:center;\n      font-weight: 600;\n      text-decoration: none;\n\n  }\nlibrary-hours-week .dept-titles{\n      display:flex;\n      align-items:center;\n  }\nlibrary-hours-week #month_container {\n\n      width: 100%;\n      height: 260px;\n      text-align: center;\n\n  }\n  library-hours-week #month_0,\n  library-hours-week #month_1,\n  library-hours-week #month_2 {\n      display: inline-block;\n      width: 250px;\n      height: 250px;\n      background-color: #fff;\n  }\n  library-hours-week .month_nav_left,\n  library-hours-week .month_nav_right{\n      display: inline-block;\n      height: 100%;\n      vertical-align: top;\n      padding-top: 125px;\n\n  }\n  library-hours-week .month_nav_left {\n      padding-left: 0px;\n      padding-right: 10px;\n  }\n  library-hours-week .month_nav_right {\n      padding-left: 10px;\n      padding-right: 0px;\n  }\n  library-hours-week #month_container .title {\n      display: block;\n      margin-top: 10px;\n      margin-bottom: none;\n  }\n  library-hours-week #month_container .col-header{\n\n      font-weight: 600;\n      display: inline-block;\n      width: 30px;\n      height: 30px;\n      font-size: 12px;\n  }\n  library-hours-week .cal-row{\n      width: 100%;\n      text-align: center;\n      margin-top: 2px;\n      margin-bottom: 2px;\n  }\n  library-hours-week .cal-day {\n      display: inline-block;\n      vertical-align: middle;\n      width: 30px;\n      height: 26px;\n      font-size: 12px;\n      cursor: pointer;\n      align-items: center;\n      font-weight: 400;\n      background-repeat: no-repeat;\n      background-size: 100% 100%;\n  }\n  library-hours-week .day-text {\n      position: relative;\n      top: 50%;\n      transform: translateY(-50%);\n  }\n  library-hours-week #month_container .previous,\n  library-hours-week #month_container .next {\n      color: #808080;\n  }\n\n  library-hours-week .legend-item {\n      display:flex;\n      align-items:center;\n      margin-top: 6px;\n      margin-bottom: 6px;\n  }\n\n  library-hours-week #legend-container {\n      background-color: #fff;\n      width: 335px;\n      min-height: 35px;\n      margin: auto;\n      margin-bottom: 10px;\n      margin-top: 10px;\n  }\n  library-hours-week .legend-icon {\n      margin-right: 8px;\n      width: 18px;\n      margin-bottom: inherit !important;\n  }\n  library-hours-week .legend-item-container{\n      display: inline-block;\n      margin-left: 5px;\n      margin-right: 5px;\n\n  }\n\n@media(min-width: 1000px){\n  library-hours-week #view_tablet {\n      display:none;\n  }\n  library-hours-week #view_desktop {\n      display:block;\n  }\n  library-hours-week #view_mobile {\n      display:none;\n  }\n\n\n  library-hours-week .hours-td {\n      border-top: 1px solid #d8d8d8;\n      border-left: none;\n      border-right: none;\n      padding-top: 8px;\n  }\n\n  library-hours-week .hours-th {\n      padding-bottom: 14px;\n  }\n\n  library-hours-week .hours-td:nth-child(odd), .hours-th:nth-child(odd) {\n    background-color: #fff;\n}\nlibrary-hours-week .hours-td:nth-child(even), .hours-th:nth-child(even) {\n      background-color: #f3f3f3;\n  }\n\n  library-hours-week .hours-tr:nth-last-child(2) .hours-td.is-today {\n      border-bottom: 3px solid #DAAA00;\n  }\n  library-hours-week .hours-td {\n      padding-bottom: 14px;\n  }\n\n  library-hours-week #month_0 .next.cal-day {\n      pointer-events: none;\n      background-image: none !important;\n  }\n  library-hours-week #month_0 .next.day-text {\n      display: none;\n  }\n\n  library-hours-week #month_0 .previous.day-text {\n      display: block;\n  }\n  library-hours-week #month_0 .previous.cal-text {\n      pointer-events: all;\n  }\n\n  library-hours-week #month_1 .next.day-text,\n  library-hours-week #month_1 .previous.day-text {\n      display: none;\n\n  }\n  library-hours-week #month_1 .next.cal-day,\n  library-hours-week #month_1 .previous.cal-day {\n      pointer-events: none;\n      background-image: none !important;\n\n  }\n\n  library-hours-week #month_2 .previous.day-text {\n      display: none;\n      background-image: none !important;\n\n  }\n  library-hours-week #month_2 .previous.cal-day {\n      pointer-events: none;\n      background-image: none !important;\n\n  }\n\n\n}\n@media(max-width: 1000px){\n  library-hours-week #view_tablet {\n      display:block;\n  }\n  library-hours-week #view_desktop {\n      display:none;\n  }\n  library-hours-week #view_mobile {\n      display:none;\n  }\n\n  library-hours-week #month_2 {\n      display: none;\n  }\n\n  library-hours-week #month_0 .next.day-text {\n      display: none;\n  }\n\n  library-hours-week #month_0 .next.cal-day {\n      pointer-events: none;\n      background-image: none !important;\n  }\n  library-hours-week #month_1 .previous.day-text {\n      display: none;\n  }\n  library-hours-week #month_1 .previous.cal-day {\n      pointer-events: none;\n      background-image: none !important;\n  }\n\n\n  library-hours-week .hours-td,\n  library-hours-week .hours-th {\n      background-color: #fff;\n      border-left: 1px solid #d8d8d8;\n      border-right: 1px solid #d8d8d8;\n      border-top: none;\n      border-bottom: none;\n\n  }\n  library-hours-week .hours-th {\n      padding-bottom: none;\n  }\n  library-hours-week .hours-td {\n      padding-top: 4px;\n  }\n  library-hours-week a {\n      padding-top: 12px;\n      padding-bottom: 12px;\n  }\n  library-hours-week .hours-table {\n      border-left: none;\n      border-right: none;\n      border-top: 1px solid #d8d8d8;\n      border-bottom: 2px solid #d8d8d8;\n  }\n\n  library-hours-week .hours-table[hidden] {\n      display:none;\n  }\n  library-hours-week .hours-tr:nth-last-child(1) .hours-td.is-today {\n      border-bottom: 3px solid #DAAA00;\n  }\n}\n\n@media(max-width: 700px){\n  library-hours-week #view_tablet {\n      display:none;\n  }\n  library-hours-week #view_desktop {\n      display:none;\n  }\n  library-hours-week #view_mobile {\n      display:block;\n  }\n  library-hours-week #month_1 {\n      display: none;\n  }\n  library-hours-week #month_2 {\n      display: none;\n  }\n\n  library-hours-week #month_0 .next.day-text {\n      display: block;\n  }\n\n  library-hours-week .month_nav_left {\n      padding-left: 0px;\n      padding-right: 0px;\n      padding-top: 110px;\n  }\n  library-hours-week .month_nav_right {\n      padding-left: 0px;\n      padding-right: 0px;\n      padding-top: 110px;\n  }\n  library-hours-week .cal-day {\n      width: 25px;\n      height: 21px;\n  }\n  library-hours-week #month_container .col-header {\n      width: 25px;\n      height: 21px;\n  }\n  library-hours-week #month_0{\n      width: 225px;\n      height: 230px;\n  }\n\n  library-hours-week .hours-td {\n      background-color: #fff;\n      border-left: none;\n      border-right: none;\n  }\n  library-hours-week .hours-tr.is-today {\n      border-bottom: 3px solid #DAAA00;\n      border-top: 3px solid #DAAA00;\n      border-left: 3px solid #DAAA00;\n      border-right: 3px solid #DAAA00;\n  }\n  library-hours-week .hours-table {\n      border-top: none;\n      border-bottom: none;\n  }\n  library-hours-week hr {\n      display: block;\n      height: 1px;\n      border: 0;\n      border-top: 2px solid #d8d8d8;\n      margin: 0;\n      padding: 0;\n  }\n\n  library-hours-week #legend-container {\n      width: 225px;\n\n  }\n\n  library-hours-week .legend-item-container{\n      margin-left: 8px;\n      margin-right: 8px;\n\n  }\n\n}\n</style>",document.head.appendChild(n.content);var i=e=>(class extends e{_attachDom(e){if(window.ShadyDOM&&window.ShadyDOM.inUse)return super._attachDom(e);let t=e.querySelectorAll("style");for(var r=0;r<t.length;r++)t[r].parentNode.removeChild(t[r]),this._stylesInserted||(t[r].setAttribute("id",this.nodeName.toLowerCase()+"-styles"),document.head.appendChild(t[r]));return this.appendChild(e),e}querySelector(e){return this.shadowRoot?this.shadowRoot.querySelector(e):super.querySelector(e)}querySelectorAll(e){return this.shadowRoot?this.shadowRoot.querySelectorAll(e):super.querySelectorAll(e)}});class s extends(Mixin(a.a).with(i)){static get template(){return a["b"]`
        <style>
        :host {
            --ucd-hours-exception: url();
            --ucd-hours-selected: url();
            --ucd-hours-today: url();
            --ucd-hours-today-selected: url();
            --ucd-hours-selected-exception: url();
            --ucd-hours-today-exception: url();
        }
        #month_container .is_exception {
            background-image: var(--ucd-hours-exception);
        }
        .selected_day {
            background-image: var(--ucd-hours-selected);
        }
        .cal-day-today {
            background-image: var(--ucd-hours-today);
        }
        .selected_day.cal-day-today  {
            background-image: var(--ucd-hours-today-selected) !important;
        }

        .selected_day.is_exception  {
            background-image: var(--ucd-hours-selected-exception) !important;
        }
        .cal-day-today.is_exception {
            background-image: var(--ucd-hours-today-exception) !important;
        }
        </style>
        <iron-ajax
            id="init_ajax"
            url$="[[json_path]]"
            handle-as="json"
            on-response="_make_iron_ajax"
            debounce-duration="300"></iron-ajax>

    <iron-media-query query="min-width: 1000px" query-matches="{{view_desktop}}"></iron-media-query>
    <iron-media-query query="max-width: 1000px" query-matches="{{view_tablet}}"></iron-media-query>
    <iron-media-query query="max-width: 700px" query-matches="{{view_mobile}}"></iron-media-query>

    <template id="ajax_repeater" is="dom-repeat" items={{_api_parameters}} as="api">
    <iron-ajax
        id="[[api.id]]"
        url="[[api.url]]"
        params="[[api.params]]"
        handle-as="json"
        on-response="handle_response"
        debounce-duration="300"></iron-ajax>
    </template>

        <h2>[[element_title]]</h2>
        <div id="legend-container">
            <div class="legend-item-container">
                <p class="legend-item details-text" style="text-transform:none;">
                    <img  class="legend-icon" src="[[icon_dir]]cal-today.svg">
                    Today
                </p>
            </div>
            <div class="legend-item-container">
                <p class="legend-item details-text" style="text-transform:none;">
                    <img  class="legend-icon" src="[[icon_dir]]cal-selected.svg">
                    Selected Day
                </p>
            </div>
            <div class="legend-item-container">
                <p class="legend-item details-text" style="text-transform:none;">
                    <img  class="legend-icon" src="[[icon_dir]]cal-exception.svg">
                    Special Hours
                </p>
            </div>
        </div>

        <div id="month_container" aria-label="Select a day from calendar below to view library hours for that date">
        <div class="month_nav_left" role="button" aria-label="View Previous Month">
            <i class="cork-chevron left gold" alt="past" on-click="change_month" style="cursor:pointer;"></i>
        </div>
            <template is="dom-repeat" items="{{month_array}}" as="month">
                <div id="{{month.order}}" role="table" aria-label="Calendar month">
                    <span class="title details-text" style="text-transform:none;">[[month.label]]</span>
                    <div class="cal-row" role="row">
                        <div class="col-header" role="columnheader"><div class="day-text">S</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">M</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">T</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">W</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">T</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">F</div></div>
                        <div class="col-header" role="columnheader"><div class="day-text">S</div></div>
                    </div>
                    <template is="dom-repeat" items="{{month.data}}" as="week">
                        <div class="cal-row" role="row">
                        <template is="dom-repeat" items="{{week}}" as="day">
                            <div locweek$= "[[day.loc_week]]"
                                locday$= "[[day.loc_day]]"
                                class$="[[day.is_today]] cal-day [[day.is_exception]] {{day.is_selected}} [[day.month_status]]"
                                on-click="display_new_week"
                                role="cell">
                                <div class$="[[day.month_status]] day-text"
                                    day$="[[day.date_json]]"
                                    role="button">[[day.day]]</div>
                            </div>
                        </template>
                        </div>
                    </template>
                </div>
            </template>
            <div class="month_nav_right" role="button" aria-label="View Next Month">
                <i class="cork-chevron right gold" alt="future" on-click="change_month" style="cursor:pointer;"></i>
            </div>
        </div>

        <div id="view_desktop">
        <div class="hours-table" role="table" aria-label="Hours table for week containing the selected day">
            <div class="hours-tr" role="row">
            <div class="hours-th" role="columnheader"><h4 style="margin-bottom:0px;">[[_format_header(week_array)]]</h4></div>
            <template is="dom-repeat" items="{{week_array}}">
                <div class$="[[item.is_today]] hours-th"style="line-height: 18px;"><h4>[[item.day_str]]</h4>
                <span class="details-text" style="text-transform:none;">[[item.month_str]] [[item.day]]</span></div>
            </template>
            </div>
            <template is="dom-repeat" items="{{hours_this_week}}" sort=sort_hours>
            <div class="hours-tr" role="row">
                <div class="hours-td" role="rowheader">
                    <a class$="[[item.type]]" href$=[[item.url]]>
                    <img  class="status-icon" src$=[[item.icon_url]] alt$=[[item.status]]>
                    [[item.title]]
                    </a>
                </div>
                <template is="dom-repeat" items="{{item.hours}}" as="hours">
                    <div class$="[[hours.hours.status]] [[hours.is_today]] hours-td role="cell""
                        aria-label$="Hours for [[item.title]] on [[hours.date.month_str]] [[hours.date.day]], [[hours.date.year]]"
                        >
                        <span class="keep-together">[[hours.display_string.open]]</span>
                        <span class="keep-together">[[hours.display_string.close]]</span>
                    </div>
                </template>
            </div>
            </template>
        </div>
        </div>

        <div id="view_tablet" aria-label="Hours for week containing the selected day">
        <template is="dom-repeat" items="{{hours_this_week}}" sort=sort_hours>
            <a class$="[[item.type]]" href$=[[item.url]]>
            <img  class="status-icon" src$=[[item.icon_url]] alt$=[[item.status]]>
            [[item.title]]
            </a>
            <div class="hours-table">
                <div class="hours-tr">
                    <template is="dom-repeat" items="{{week_array}}">
                        <div class$="[[item.is_today]] hours-th" style="line-height: 18px;"><h4>[[item.day_str]]</h4>
                        <span class="details-text" style="text-transform:none;">[[item.month_str]] [[item.day]]</span></div>
                    </template>
                </div>
                <div class="hours-tr">
                    <template is="dom-repeat" items="{{item.hours}}" as="hours">
                        <div class$="[[hours.hours.status]] [[hours.is_today]] hours-td"
                            aria-label$="Hours for [[item.title]] on [[hours.date.month_str]] [[hours.date.day]], [[hours.date.year]]"
                        >
                            <span class="keep-together">[[hours.display_string.open]]</span>
                            <span class="keep-together">[[hours.display_string.close]]</span>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        </div>

        <div id="view_mobile" aria-label="Hours for week containing the selected day">
        <hr>
        <template is="dom-repeat" items="{{hours_this_week}}" sort=sort_hours>
            <a class$="[[item.type]]" href$=[[item.url]]>
            <img  class="status-icon" src$=[[item.icon_url]] alt$=[[item.status]]>
            [[item.title]]
            </a>
            <div hidden="hidden" class="hours-table" id="[[_concat_id(item.id, 'table')]]">
            <template is="dom-repeat" items="{{item.hours}}" as="hours">
                <div class$="[[hours.is_today]] hours-tr"
                    aria-label$="Hours for [[item.title]] on date:"
                >
                    <div style="width:40%;" class="hours-td"><strong>[[hours.date.day_str]]</strong> [[hours.date.month_str]] [[hours.date.day]]
                    </div>
                    <div style="width:60%;" class$="[[hours.hours.status]] hours-td">
                        <span class="keep-together">[[hours.display_string.open]]</span>
                        <span class="keep-together">[[hours.display_string.close]]</span>
                    </div>
                </div>
            </template>
            </div>
            <div style="text-align:right;">
                <i id$="[[_concat_id(item.id, 'toggle')]]" on-click="toggle_lib_mobile" class="fa fa-plus" action="expand" style="color:#daaa00;cursor:pointer;"></i>
            </div>
            <hr>
        </template>
        </div>

        `}static get is(){return"library-hours-week"}static get properties(){return{_calendars:{type:Object,value:{}},_api_parameters:{type:Array,value:[]},json_path:{type:String},element_title:{type:String,value:""},verbose:{type:Boolean},hours_this_week:{type:Array,value:[]},today:{type:Date},selected_day:{type:Object,value:{}},ajax_ids:{type:Array,value:[]},event_ids:{type:Array,value:[]},_lib_event_crosswalk:{type:Object,value:{}},week_array:{type:Array,value:[]},month_array:{type:Array,value:[]},icon_dir:{type:String,value:""}}}constructor(){super()}ready(){super.ready(),this.updateStyles({"--ucd-hours-exception":`url("${this.icon_dir}cal-exception.svg")`,"--ucd-hours-selected":`url("${this.icon_dir}cal-selected.svg")`,"--ucd-hours-today":`url("${this.icon_dir}cal-today.svg")`,"--ucd-hours-today-selected":`url("${this.icon_dir}cal-today.svg")`,"--ucd-hours-selected-exception":`url("${this.icon_dir}cal-selected.svg"), url("${this.icon_dir}cal-exception.svg")`,"--ucd-hours-today-exception":`url("${this.icon_dir}cal-today.svg"), url("${this.icon_dir}cal-exception.svg")`});try{var e=(new Date).toLocaleString("en-US",{timeZone:"America/Los_Angeles"});e=new Date(e.split(",")[0]),this.today=e,this.set("selected_day.date",e)}catch(t){e=this._ie_today(),this.today=e,this.set("selected_day.date",e)}String.prototype.includes||(String.prototype.includes=function(e,t){return"number"!=typeof t&&(t=0),!(t+e.length>this.length)&&-1!==this.indexOf(e,t)}),this.set("selected_day.location",{}),this.week_array=this.create_week_array(e),this.verbose&&console.log("week_array",this.week_array),this.construct_month(e),this.verbose&&console.log("month_array",this.month_array),this.$.init_ajax.generateRequest()}_make_iron_ajax(e){for(var t=e.detail.response,r=0;r<t.length;r++){var a={};this.push("ajax_ids",t[r].ajax_id),a.url=t[r].url,a.params=t[r].params,a.id=t[r].ajax_id,this._lib_event_crosswalk[t[r].ajax_id]=t[r].event_series;for(var n=0;n<t[r].event_series.length;n++)this.push("event_ids",t[r].event_series[n].search_term);this.push("_api_parameters",a)}this.verbose&&console.log("api_parameters",this._api_parameters),this.$.ajax_repeater.render();for(r=0;r<this.ajax_ids.length;r++)this.querySelector("#"+this.ajax_ids[r]).generateRequest()}handle_response(e){for(var t=e.detail.response,r=e.target.getAttribute("id"),a=this._lib_event_crosswalk[r],n=0;n<a.length;n++){var i=a[n].search_term,s=a[n].title,o=a[n].type,d=a[n].url,l=this.parse_calendar(t,i);if(l){var h={title:s,id:i,data:l,ajax_id:r,type:o,url:d};this._calendars[i]=h;var c=this._create_week_hours(h),u=this.event_ids.indexOf(i);-1!=u&&(c.display_order=u,this.push("hours_this_week",c),this.verbose&&console.log(i,c));for(var p=0;p<this.month_array.length;p++)for(var _=0;_<this.month_array[p].data.length;_++)for(var y=0;y<this.month_array[p].data[_].length;y++){if("not_exception"==this.month_array[p].data[_][y].is_exception)this.day_hours(this.month_array[p].data[_][y].date,h.data).exception&&this.set(`month_array.${p}.data.${_}.${y}.is_exception`,"is_exception")}}}}display_new_week(e){if(this.set(`month_array.${this.selected_day.location.month}.data.${this.selected_day.location.week}.${this.selected_day.location.day}.is_selected`,"not_selected_day"),e.target.getAttribute("day"))var t=e.target.getAttribute("day").split("-"),r=e.target.parentNode;else t=e.target.children[0].getAttribute("day").split("-"),r=e.target;var a=r.parentNode.parentNode.getAttribute("id");a=parseInt(a.split("_")[1]);var n=parseInt(r.getAttribute("locweek")),i=parseInt(r.getAttribute("locday"));this.set(`month_array.${a}.data.${n}.${i}.is_selected`,"selected_day"),this.set("selected_day.location.month",a),this.set("selected_day.location.week",n),this.set("selected_day.location.day",i),t=new Date(t[0],t[1]-1,t[2]),this.set("selected_day.date",t),this.week_array=this.create_week_array(t);for(var s=[],o=0;o<this.event_ids.length;o++){var d=this._calendars[this.event_ids[o]],l=this._create_week_hours(d);l.display_order=o;for(var h=0;h<this.hours_this_week.length;h++)l.id==this.hours_this_week[h].id&&(l.icon_url=this.hours_this_week[h].icon_url,s.push(l))}this.hours_this_week=s}change_month(e){var t,r,a=e.target.getAttribute("alt");if(this.set("selected_day.just_created",!1),"future"==a){var n=this.month_array[2].month_n+1,i=this.month_array[2].year_n;12==n&&(n=0,i+=1),t=new Date(i,n,15),r=this._make_month_range(t,1,2,!0)[0],this.month_array[0].month_n==this.selected_day.date.getMonth()?(this.set(`month_array.${this.selected_day.location.month}.data.${this.selected_day.location.week}.${this.selected_day.location.day}.is_selected`,"not_selected_day"),this.set("selected_day.in_range",!1)):this.selected_day.in_range&&!this.selected_day.just_created&&this.set("selected_day.location.month",this.selected_day.location.month-1),this.shift("month_array"),this.push("month_array",r),this.set("month_array.0.order","month_0"),this.set("month_array.1.order","month_1")}else if("past"==a){n=this.month_array[0].month_n-1,i=this.month_array[0].year_n;-1==n&&(n=11,i-=1),t=new Date(i,n,15),r=this._make_month_range(t,1,0,!0)[0],this.month_array[2].month_n==this.selected_day.date.getMonth()?(this.set(`month_array.${this.selected_day.location.month}.data.${this.selected_day.location.week}.${this.selected_day.location.day}.is_selected`,"not_selected_day"),this.set("selected_day.in_range",!1)):this.selected_day.in_range&&!this.selected_day.just_created&&this.set("selected_day.location.month",this.selected_day.location.month+1),this.pop("month_array"),this.splice("month_array",0,0,r),this.set("month_array.1.order","month_1"),this.set("month_array.2.order","month_2")}}_make_month_range(e,t,r,a){for(var n=[],i=e.getMonth(),s=this.today.toJSON().split("T")[0],o=this.selected_day.date.toJSON().split("T")[0],d=["January","February","March","April","May","June","July","August","September","October","November","December"],l=r;l<t+r;l++){var h={},c=i+l-r;h.order="month_"+String(l),h.year_n=1900+e.getYear(),c>=12&&(c-=12,h.year_n+=1),h.month_n=c,h.label=d[c]+" "+String(h.year_n);var u=new Date(h.year_n,h.month_n,1),p=new Date(h.year_n,h.month_n,1);p.setDate(u.getDate()-u.getDay()),h.data=[];for(var _=[],y=0,m=0;m<43;m++){var g={},b=new Date(p);if(m%7==0&&0!=m){h.data.push(_),y+=1;_=[]}var v=new Date(b.setDate(p.getDate()+m)),w=1900+v.getYear();g.day=v.getDate(),g.date=v,g.date_json=v.toJSON().split("T")[0];var x=v.getMonth();if(g.date_json==s?g.is_today="cal-day-today":g.is_today="cal-day-not-today",h.year_n>w?g.month_status="previous":h.year_n<w?g.month_status="next":g.month_status=x==c?"current":x>c?"next":"previous",g.is_exception="not_exception",g.date_json==o?(g.is_selected="selected_day",this.set(`month_array.${this.selected_day.location.month}.data.${this.selected_day.location.week}.${this.selected_day.location.day}.is_selected`,"not_selected_day"),this.set("selected_day.location.month",l),this.set("selected_day.location.week",y),this.set("selected_day.location.day",m-7*y),this.set("selected_day.in_range",!0),this.set("selected_day.just_created",!0)):g.is_selected="not_selected_day",g.loc_month=l,g.loc_week=y,g.loc_day=m-7*y,a)for(var k in this._calendars){if(this.day_hours(v,this._calendars[k].data).exception){g.is_exception="is_exception";break}}_.push(g)}n.push(h)}return n}construct_month(e){for(var t=this._make_month_range(e,3,0,!1),r=0;r<t.length;r++)this.push("month_array",t[r])}_create_week_hours(e){var t=e.data,r={hours:[]};if("library"==e.type.toLowerCase()){var a=!0;r.type="lib-titles"}else{a=!1;r.type="dept-titles"}for(var n=0;n<7;n++){var i=this.week_array[n],s=this.day_hours(i.date,t),o=this.hours_string(s);r.hours.push({hours:s,display_string:o,date:i}),"is-today"==this.week_array[n].is_today?(r.hours[n].is_today="is-today",a?this.open_now(s)?r.icon_url=this.icon_dir+"open-lib.svg":r.icon_url=this.icon_dir+"closed-lib.svg":this.open_now(s)?r.icon_url=this.icon_dir+"open-dept.svg":r.icon_url=this.icon_dir+"closed-dept.svg"):r.hours[n].is_today="not-today"}return r.title=e.title,r.id=e.id,r.url=e.url,r}toggle_lib_mobile(e){var t="#"+e.target.getAttribute("id").split("__")[0]+"__table";"expand"==e.target.getAttribute("action")?(e.target.setAttribute("action","less"),e.target.setAttribute("class","fa fa-minus"),this.querySelector(t).removeAttribute("hidden")):(e.target.setAttribute("action","expand"),e.target.setAttribute("class","fa fa-plus"),this.querySelector(t).setAttribute("hidden","hidden"))}_concat_id(e,t){return e+"__"+t}open_now(e){if("closed"==e.status)return!1;try{var t=(r=(new Date).toLocaleString("en-GB",{timeZone:"America/Los_Angeles"})).split(",")[1].split(":");t=parseInt(t[0]+t[1])}catch(e){var r=this._ie_today(),a=String(r.getHours());1==a.length&&(a="0"+a);var n=String(r.getMinutes());1==n.length&&(n="0"+n);t=parseInt(a+n)}var i=e.start_time.split(":");i=parseInt(i[0]+i[1]);var s=e.end_time.split(":");return s=parseInt(s[0]+s[1]),t>=i&&t<s||t>=i&&i>=s}_format_header(e){var t="";return 7==e.length&&(t+=e[0].month_str.toUpperCase()+" "+e[0].day+" - ",e[0].month_str!=e[6].month_str&&(t+=e[6].month_str.toUpperCase()+" "),t+=e[6].day+", "+e[6].year),t}create_week_array(e){for(var t=[],r=e.getDay(),a=["SUN","MON","TUE","WED","THU","FRI","SAT","SUN"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=this.today.toDateString(),s=0;s<7;s++){var o={},d=new Date(1900+e.getYear(),e.getMonth(),e.getDate());d.setDate(e.getDate()-r+s),o.i=s-1,o.date=d,d.toDateString()==i?o.is_today="is-today":o.is_today="not-today",o.day_str=a[d.getDay()],o.month_str=n[d.getMonth()],o.day=d.getDate(),o.year=1900+d.getYear(),t.push(o)}return t}sort_hours(e,t){return e.display_order-t.display_order}hours_string(e){if("closed"==e.status)return{open:"CLOSED",close:""};if(e.tbd)return{open:"TBD",close:""};for(var t={},r=[e.start_time,e.end_time],a=0;a<2;a++){var n="",i=r[a].split(":"),s=parseInt(i[0]);if(s>12){s-=12;var o="pm"}else if(0==s){s=12;o="am"}else if(12==s){s=12;o="pm"}else o="am";n+=s.toString()+":"+i[1],n+=" "+o,0==a?t.open=n+" -":t.close=n}return t}parse_rrule(e){for(var t={},r=e.split(":")[1].split(";"),a=0;a<r.length;a++){var n=r[a].split("=");if("FREQ"==n[0])t.freq=n[1],"DAILY"==n[1]&&(t.days=["MO","TU","WE","TH","FR","SA","SU"]);else if("BYDAY"==n[0])t.days=n[1].split(",");else if("UNTIL"==n[0]){var i=n[1].substr(0,4),s=n[1].substr(4,2),o=n[1].substr(6,2);t.end_date=new Date(i+"-"+s+"-"+o)}}if(!("end_date"in t)){var d=new Date;d.setDate(d.getDate()+730),t.end_date=d}return t}to_goog_day(e){return{1:"MO",2:"TU",3:"WE",4:"TH",5:"FR",6:"SA",0:"SU"}[e]}split_datetime(e){var t={},r=e.split("T");r[0].split("-");return t.date=new Date(r[0]),t.time=r[1].substr(0,5),t}day_hours(e,t){var r=e.toISOString().split("T")[0];if(r in t.exceptions)return t.exceptions[r];for(var a=0;a<t.id.length;a++){var n=t.id[a];if(e>=t.rule[n].start_date&&e<=t.rule[n].end_date){var i=!1;try{i=t.rule[n].days.includes(this.to_goog_day(e.getDay()))}catch(r){for(var s=this.to_goog_day(e.getDay()),o=0;o<t.rule[n].days.length;o++)if(t.rule[n].days[o]==s){i=!0;break}}if(i){var d={};return d.start_time=t.rule[n].start_time,d.end_time=t.rule[n].end_time,d.exception=!1,d.status="open",d.tbd=t.rule[n].tbd,d}}}return{status:"closed",exception:!1}}_ie_today(){for(var e=new Date,t=e.getTime()+6e4*e.getTimezoneOffset(),r=new Date(t+-252e5),a=new Date(t+-288e5),n=[new Date(2015,2,8),new Date(2015,10,2),new Date(2016,2,13),new Date(2016,10,7),new Date(2017,2,12),new Date(2017,10,6),new Date(2018,2,11),new Date(2018,10,5),new Date(2019,2,10),new Date(2019,10,4),new Date(2020,2,8),new Date(2020,10,2),new Date(2021,2,14),new Date(2021,10,8),new Date(2022,2,13),new Date(2022,10,7),new Date(2023,2,12),new Date(2023,10,6),new Date(2024,2,10),new Date(2024,10,4)],i=0;i<n.length;i++)if(a<n[i])return r;return console.log("Unable to determine daylight savings time. See _ie_today function"),e}parse_calendar(e,t){for(var r=e.items,a={id:[],name:{},rule:{},overlap:!1,exceptions:{}},n=0;n<r.length;n++)if("recurrence"in r[n]){if("description"in r[n])var i=r[n].description.toLowerCase();else i="";if(i.includes(t.toLowerCase())){var s=r[n].id,o=r[n].organizer.displayName,d=this.parse_rrule(r[n].recurrence[0]);if("dateTime"in r[n].start){var l=this.split_datetime(r[n].start.dateTime);d.start_date=l.date,d.start_time=l.time,d.end_time=this.split_datetime(r[n].end.dateTime).time}else d.start_date=new Date(r[n].start.date),d.start_time="00:00",d.end_time="00:00";i.includes("tbd")?d.tbd=!0:d.tbd=!1,a.id.push(s),a.name[s]=o,a.rule[s]=d}}if(0==a.id.length)return console.log(t,"not found in calendar. Unable to display hours."),!1;for(n=0;n<r.length;n++){var h=!1;try{h=a.id.includes(r[n].recurringEventId)}catch(e){for(var c=0;c<a.id.length;c++)if(r[n].recurringEventId==a.id[c]){h=!0;break}}if(h)if("cancelled"==r[n].status)p=(p=r[n].originalStartTime.dateTime).split("T")[0],a.exceptions[p]={exception:!0,status:"closed"};else if("confirmed"==r[n].status){var u={},p=r[n].start.dateTime.split("T")[0];u.end_time=this.split_datetime(r[n].end.dateTime).time,u.start_time=this.split_datetime(r[n].start.dateTime).time,u.status="open",u.exception=!0,u.tbd=!1;var _=a.rule[r[n].recurringEventId].start_time,y=a.rule[r[n].recurringEventId].end_time;r[n].description.includes("TBD")?(u.tbd=!0,a.exceptions[p]=u):_==u.start_time&&y==u.end_time||(a.exceptions[p]=u)}}return a}}customElements.define(s.is,s)}}]);