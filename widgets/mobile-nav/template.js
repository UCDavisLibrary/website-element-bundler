import social from "./template-social.js";
export default /* @html */`
<iron-ajax
    id="ajax_menu"
    handle-as="json"
    rejectWithRequest
    debounce-duration="300">
</iron-ajax>
<iron-ajax
    id="ajax_descendents"
    handle-as="json"
    rejectWithRequest
    debounce-duration="300">
</iron-ajax>
<iron-ajax
    id="ajax_page"
    handle-as="json"
    rejectWithRequest
    debounce-duration="300">
</iron-ajax>

<template is="dom-if" if="{{!show_spinner}}">
    <template is="dom-if" if="{{show_menu}}">
    <div id="mnav-window">
        <div class="mnav-breadcrumbs">
        <template is="dom-repeat" items = "[[selected_menu.breadcrumbs]]" as="breadcrumb">
            <div on-click="changeMenu" trans="slideright" arrayloc$="[[breadcrumb.array_loc]]" linkstyle$="[[breadcrumb.link_style]]" class="mnav-link">
                <template is="dom-if" if="{{breadcrumb.mm_link}}">
                    <i class="cork-chevron left small"></i>
                </template>
                <template is="dom-if" if="{{!breadcrumb.mm_link}}">
                    <i class="fa fa-level-up"></i>
                </template>
                <div class="mnav-text">[[breadcrumb.label]]</div>
            </div>
        </template>
        </div>

        <div class="mnav-main">
        <template is="dom-repeat" items = "[[selected_menu.main]]" as="menu_link">
            <div class="mnav-spacer" linkstyle$="[[menu_link.link_style]]"></div>
            <div linkstyle$="[[menu_link.link_style]]" linkselected$="[[menu_link.selected]]" class="mnav-link">
                <a href="{{ menu_link.link }}" linkselected$="[[menu_link.selected]]" class="mnav-text"><div>[[menu_link.label]]</div></a>
                <template is="dom-if" if="{{menu_link.has_children}}">
                    <i on-click="changeMenu" arrayloc$="[[menu_link.array_loc]]" trans="slideright" class="cork-chevron right small"></i>
                </template>
            </div>
        </template>
        </div>

        ${social}

    </div>
    </template>

    <template is="dom-if" if="{{show_transition}}">
    <div id="mnav-transition">
        <div class="mnav-breadcrumbs">
        <template is="dom-repeat" items = "[[trans_menu.breadcrumbs]]" as="breadcrumb">
            <div on-click="changeMenu" trans="slideright" arrayloc$="[[breadcrumb.array_loc]]" linkstyle$="[[breadcrumb.link_style]]" class="mnav-link">
                <template is="dom-if" if="{{breadcrumb.mm_link}}">
                    <i class="cork-chevron left small"></i>
                </template>
                <template is="dom-if" if="{{!breadcrumb.mm_link}}">
                    <i class="fa fa-level-up"></i>
                </template>
                <div class="mnav-text">[[breadcrumb.label]]</div>
            </div>
        </template>
        </div>

        <div class="mnav-main">
        <template is="dom-repeat" items = "[[trans_menu.main]]" as="menu_link">
            <div class="mnav-spacer" linkstyle$="[[menu_link.link_style]]"></div>
            <div linkstyle$="[[menu_link.link_style]]" linkselected$="[[menu_link.selected]]" class="mnav-link">
                <a href="{{ menu_link.link }}" linkselected$="[[menu_link.selected]]" class="mnav-text"><div>[[menu_link.label]]</div></a>
                <template is="dom-if" if="{{menu_link.has_children}}">
                    <i on-click="changeMenu" arrayloc$="[[menu_link.array_loc]]" trans="slideright" class="cork-chevron right small"></i>
                </template>
            </div>
        </template>
        </div>

        ${social}
    </div>
    </template>

</template>
<template is="dom-if" if="{{show_spinner}}">
    <div id="nav_loading">
    <i class="fa fa-spinner fa-pulse"></i>
    </div>
</template>
`
