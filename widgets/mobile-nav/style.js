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
    ucd-library-mobile-nav #mnav-breadcrumbs {
	    background-color: #335379;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=parent]{
    	padding-left:10px;
        padding-bottom: 9px;
        padding-top: 9px;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs div[linkstyle=standard]{
    	padding-left:30px;
        padding-bottom: 9px;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs .mnav-text {
        pointer-events: none;
    }
    ucd-library-mobile-nav #mnav-breadcrumbs i {
        pointer-events: none;
    }
    ucd-library-mobile-nav #mnav-main div[linkselected]{
    	color:#dAAA00;
    }
    ucd-library-mobile-nav #mnav-main a[linkselected]{
        color:#dAAA00;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=parent]{
    	padding-left:10px;
    	text-transform: uppercase;
        padding-top: 9px;
        padding-bottom: 9px;
    }
    ucd-library-mobile-nav div[linkstyle=parent].mnav-spacer{
        display: none;
    }

    ucd-library-mobile-nav #mnav-main div[linkstyle=standard]{
        padding-bottom: 9px;
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
        padding-left: 10px;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle=menu-info].mnav-spacer {
        display: block;
        width: 100%;
        height: 8px;
        background-color: #335379;
    }
    ucd-library-mobile-nav #mnav-main div[linkstyle="menu-info"].mnav-spacer::after {
        content: "";
        background-color: #002655;
        height: 1px;
        width: 100%;
        display: block;
        margin-left: 10px;
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
