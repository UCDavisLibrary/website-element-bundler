export default /* @css */`
<style>
    :host {
        width: 100%;
        min-width: 450px;
    }
    library-search-db .help {
        padding-bottom: 20px;
    }
    library-search-db iron-label {
        font-weight: 600;
        display: block;
        margin-bottom: 6px;
    }
    library-search-db iron-label.ontop {
        width:100%;
    }
    library-search-db .dbsearch_row {
        display: flex;
        flex-flow: row wrap;
    }
    library-search-db iron-dropdown {
        width: 250px;
    }

    library-search-db .search-btn {
        text-align: center;
        display: inline-block;
        background: #002655;
        color: #fff;
        text-decoration: none;
        padding: 15px;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.25;
        border: 1px solid transparent;
        cursor: pointer;
        border-radius: 0;
    }
    library-search-db #db_search_input {
        flex: 1;
    }
    library-search-db #db_search_input input {
        box-sizing: border-box;
        display: block;
        background-color: #fff;
        padding: 15px;
        color: #002655;
        border: 1px solid #d6dce6;
        border-radius: 0;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.25;
        background-clip: padding-box;
        width: 100%;
        min-width: 350px;
    }
    library-search-db #db_search_cont {
        flex: 1;
        margin-top: 15px;
    }
    library-search-db #db_search_cont #input_and_button {
        display: flex;
    }
    library-search-db .dbsearch-drop {
        margin-right: 15px;
        margin-top: 15px;
        width: 250px;
    }
    library-search-db .dbsearch-drop button {
        background: #DAAA00;
        color: #002655;
        min-width: 250px;
        padding: 5px;
        padding-left: 15px;
        font-size: 1rem;
        border: 1px solid transparent;
        cursor: pointer;
        border-radius: 0;
        text-align: left;
        font-weight: 400;
        height: 53px;
        width: 100%;
    }
    library-search-db .dbsearch-drop button:hover {
        background: #E9CC66;
    }
    [slot="dropdown-content"] {
        background-color: #DAAA00;
        color: #002655;
        line-height: 20px;
        border-radius: 3px;
        box-shadow: 0px 2px 6px #ccc;
    }
    library-search-db .dbsearch-drop li {
        padding: 5px;
        padding-left: 15px;
        font-size: 1rem;
        border: 1px solid transparent;
        cursor: pointer;
        border-radius: 0;
        text-align: left;
        font-weight: 400;
        text-decoration: none;
    }
    library-search-db .dbsearch-drop ul {
        list-style-type: none;
        padding: 0;
    }
    library-search-db .dbsearch-drop li:hover {
        background-color: #E9CC66;
    }
    library-search-db .check_cont {
        display: inline-block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 0px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-top: 0px;
        margin-left: 15px;
    }
    library-search-db .check_cont input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    library-search-db .checkmark_styled {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 1px solid #d8d8d8;
    }
    library-search-db .check_cont:hover input ~ .checkmark_styled {
        background-color: #002655;
    }
    library-search-db .check_cont input:checked ~ .checkmark_styled {
        background-color: #002655;
    }
    library-search-db .checkmark_styled:after {
        content: "";
        position: absolute;
        display: none;
    }
    library-search-db .check_cont input:checked ~ .checkmark_styled:after {
        display: block;
    }
    library-search-db .check_cont .checkmark_styled:after {
        left: 7px;
        top: 2px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    @media(max-width: 500px){
        library-search-db .dbsearch-drop {
            width: 100%;
            margin-right: 0px;
        }

        library-search-db #db_search_input input {
            min-width: 100px;
        }
        library-search-db iron-dropdown {
            width: 100%;
        }
    }
</style>
`
