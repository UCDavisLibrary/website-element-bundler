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
<template is="dom-if" if="{{show_menu}}">

    <div id="mnav-breadcrumbs">
    <template is="dom-repeat" items = "[[selected_menu.breadcrumbs]]" as="breadcrumb">
        <div on-click="changeMenu" trans="breadcrumb" arrayloc$="[[breadcrumb.array_loc]]" linkstyle$="[[breadcrumb.link_style]]" class="mnav-link">
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

    <div id="mnav-main">
    <template is="dom-repeat" items = "[[selected_menu.main]]" as="menu_link">
        <div class="mnav-spacer" linkstyle$="[[menu_link.link_style]]"></div>
        <div linkstyle$="[[menu_link.link_style]]" linkselected$="[[menu_link.selected]]" class="mnav-link">
            <a href="{{ menu_link.link }}" linkselected$="[[menu_link.selected]]" class="mnav-text"><div>[[menu_link.label]]</div></a>
            <template is="dom-if" if="{{menu_link.has_children}}">
                <i on-click="changeMenu" arrayloc$="[[menu_link.array_loc]]" trans="children" class="cork-chevron right small"></i>
            </template>
        </div>
    </template>
    </div>

    <template is="dom-if" if="{{selected_menu.socialmedia}}">
        <div class="vertical-center justify-center secondary-nav-icons" slot="socialmedia">
            <div class="donate"><a href="http://give.ucdavis.edu/ULIB">Donate</a></div>
            <template is="dom-if" if="{{facebook}}">
                <a href="{{ facebook }}" target="_blank"><i class="icon-facebook"></i></a>
            </template>
            <template is="dom-if" if="{{twitter}}">
            <a href="{{ twitter }}" target="_blank"><i class="icon-twitter"></i></a>
            </template>
            <template is="dom-if" if="{{instagram}}">
            <a href="{{ instagram }}" target="_blank"><i class="icon-instagram"></i></a>
            </template>
            <template is="dom-if" if="{{youtube}}">
            <a href="{{ youtube }}" target="_blank"><i class="icon-youtube"></i></a>
            </template>
            <template is="dom-if" if="{{pinterest}}">
            <a href="{{ pinterest }}" target="_blank"><i class="icon-pinterest"></i></a>
            </template>
        </div>
    </template>

</template>
<template is="dom-if" if="{{!show_menu}}">
    <div id="nav_loading">
    <i class="fa fa-spinner fa-pulse"></i>
    </div>
</template>
`
