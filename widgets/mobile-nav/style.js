export default /* @css */`
<style>
    ucd-library-mobile-nav {
        width: 100%;
        color: #ffffff;
        text-align: left;
    }
    ucd-library-mobile-nav a {
        color: #ffffff;
    }
    ucd-library-mobile-nav a:hover, ucd-library-mobile-nav a:visited {
        color: #ffffff;
        text-decoration: none;
    }
    ucd-library-mobile-nav #nav_loading {
        width: 100%;
        height: calc(100vh - 90px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ucd-library-mobile-nav #nav_loading i {
        font-size: 40px;
        background-color: inherit;
        color: #ffffff;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs {
	    background-color: #335379;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=parent]{
    	padding-left:8px;
        padding-bottom: 13px;
        padding-top: 8px;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=standard]{
    	padding-left:50px;
        padding-bottom: 13px;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=standard] i {
        color: #dAAA00;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        margin-right: 7px;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs .mnav-text {
        pointer-events: none;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs i {
        pointer-events: none;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=parent] i {
        vertical-align: middle;
        background-color: #002655;
        border-radius: 50%;
        text-align: center;
        width: 35px;
        height: 35px;
        padding-top: 7px;
        padding-right: 6px;
        margin-right: 7px;
        color: #dAAA00;
    }
    ucd-library-mobile-nav #mnav-main div[linkselected]{
    	color:#dAAA00;
    }
    ucd-library-mobile-nav #mnav-main a[linkselected]{
        color:#dAAA00;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=parent]{
    	padding-left:15px;
    	text-transform: uppercase;
        padding-bottom: 15px;
    }
    ucd-library-mobile-nav #mnav-main i {
        vertical-align: middle;
        background-color: #335379;
        border-radius: 50%;
        text-align: center;
        width: 35px;
        height: 35px;
        padding-top: 7px;
        padding-right: 2px;
        margin-right: 12px;
        color: #dAAA00;
    }
    ucd-library-mobile-nav div[linkstyle=parent].mnav-spacer{
        display: block;
        width: 100%;
        height: 8px;
        background-color: #002655;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=parent].mnav-spacer::after {
        content: "";
        background-color: #335379;
        height: 1px;
        width: 100%;
        display: block;
    }

    ucd-library-mobile-nav #mnav-main div[linkstyle=standard]{
        padding-bottom: 15px;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=standard].mnav-spacer {
        display: block;
        width: 100%;
        height: 8px;
        background-color: #002655;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=standard] .mnav-text {
        padding-left:30px;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=standard].mnav-spacer::after {
        content: "";
        background-color: #335379;
        height: 1px;
        width: 100%;
        display: block;
        margin-left: 30px;
    }

    ucd-library-mobile-nav #mnav-main div[linkstyle=menu-info]{
        background-color: #335379;
        padding-bottom: 9px;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=menu-info] .mnav-text{
        padding-left: 15px;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=menu-info] i {
        background-color: #002655;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=menu-info].mnav-spacer {
        display: block;
        width: 100%;
        height: 14px;
        background-color: #335379;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle="menu-info"].mnav-spacer::after {
        content: "";
        background-color: #002655;
        height: 1px;
        width: 100%;
        display: block;
        margin-left: 15px;
    }

    ucd-library-mobile-nav .mnav-link {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    ucd-library-mobile-nav .mnav-text {
        flex-grow: 1;
    }
</style>
`
