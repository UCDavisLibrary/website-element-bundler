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
    <button on-click="_open_dropdown" drop_type="materials">Any Material</button>
    <iron-dropdown id="drop_materials" horizontal-align="right" vertical-align="top">
      <ul slot="dropdown-content" tabindex="0">
        <template is="dom-repeat" items = "[[materials]]" as= "material">
          <li slug$=[[material.slug]]>[[material.name]]</li>
        </template>
      </ul>

    </iron-dropdown>

  </div>
`
