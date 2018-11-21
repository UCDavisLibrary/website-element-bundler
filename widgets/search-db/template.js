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

  <div class="dbsearch-drop">
    <button id="materials_button" on-click="_open_dropdown" drop_type="materials">Any Material</button>
    <iron-dropdown id="drop_materials" horizontal-align="left" vertical-align="top">
      <ul slot="dropdown-content" tabindex="0">
        <template is="dom-repeat" items = "[[materials]]" as="material">
          <li on-click="_select_dropdown" drop_type="materials" slug$=[[material.slug]]>[[material.name]]</li>
        </template>
      </ul>

    </iron-dropdown>

  </div>

  <div class="dbsearch-drop">
    <button id="subjects_button" on-click="_open_dropdown" drop_type="subjects">Any Subject</button>
    <iron-dropdown id="drop_subjects" horizontal-align="left" vertical-align="top">
      <ul slot="dropdown-content" tabindex="0">
        <template is="dom-repeat" items = "[[subjects]]" as="subject">
          <li on-click="_select_dropdown" drop_type="subjects" slug$=[[subject.slug]]>[[subject.name]]</li>
        </template>
      </ul>

    </iron-dropdown>

  </div>
`
