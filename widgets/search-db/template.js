export default /* @html */`
  <iron-ajax
      id="ajax_materials"
      handle-as="json"
      rejectWithRequest
      debounce-duration="300">
  </iron-ajax>
  <iron-ajax
      id="ajax_subjects"
      handle-as="json"
      rejectWithRequest
      debounce-duration="300">
  </iron-ajax>
  <h1 class="title">Database Search</h1>
  <div class="help">Find databases for scholarly articles, newspapers, popular literature, properties, statistics, images, dissertations and more.</div>
  <div class="dbsearch_row">
      <iron-label for="availability_cont">Available to:</iron-label>
      <div id="availability_cont">
        <label class="check_cont">Everyone
          <input type="checkbox" id="check_everyone" on-click="_toggle_checkbox" checked$={{query.check_everyone}}>
          <span class="checkmark_styled"></span>
        </label>
        <label class="check_cont">UC Davis (via <a href$="[[vpn_url]]">VPN</a>)
          <input type="checkbox" id="check_vpn" on-click="_toggle_checkbox" checked$={{query.check_vpn}}>
          <span class="checkmark_styled"></span>
        </label>
      </div>
  </div>

  <div class="dbsearch_row">

      <div class="dbsearch-drop">
        <iron-label for="materials_button" class="ontop">Materials</iron-label>
        <button id="materials_button" on-click="_open_dropdown" drop_type="materials">Any Material</button>
        <iron-dropdown id="drop_materials" horizontal-align="left" vertical-align="bottom">
          <ul slot="dropdown-content" tabindex="0">
            <template is="dom-repeat" items = "[[materials]]" as="material">
              <li on-click="_select_dropdown" drop_type="materials" slug$=[[material.slug]]>[[material.name]]</li>
            </template>
          </ul>

        </iron-dropdown>

      </div>

      <div class="dbsearch-drop">
        <iron-label for="subjects_button" class="ontop">Subjects</iron-label>
        <button id="subjects_button" on-click="_open_dropdown" drop_type="subjects">Any Subject</button>
        <iron-dropdown id="drop_subjects" horizontal-align="left" vertical-align="bottom">
          <ul slot="dropdown-content" tabindex="0">
            <template is="dom-repeat" items = "[[subjects]]" as="subject">
              <li on-click="_select_dropdown" drop_type="subjects" slug$=[[subject.slug]]>[[subject.name]]</li>
            </template>
          </ul>

        </iron-dropdown>

      </div>
      <div id="db_search_cont">
        <iron-a11y-keys id="db_a11y"
                        target="[[a11y_target]]"
                        keys="enter"
                        on-keys-pressed="submit_query">
        </iron-a11y-keys>
        <iron-label for="db_search_input" class="ontop">Database Title or Keyword</iron-label>
        <div id="input_and_button">
            <iron-input id="db_search_input"
                        bind-value={{BindValue}}
                        auto-validate>
              <input value="{{BindValue::input}}"
                     placeholder="Search for Databases">
            </iron-input>
            <button id="db_search_submit" class="search-btn" on-click="submit_query">Search</button>
        </div>
      </div>

  </div>
`
