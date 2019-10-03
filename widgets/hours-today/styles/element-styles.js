export default `
<style>
library-hours {
  display: block;
  background-color: transparent;
  padding: 0px;
}

library-hours .hours-table{
    border-top: none;
    border-collapse: collapse;
    margin-bottom: 0px;
    width: 100%;
    display: table;
    table-layout: fixed;
}

library-hours .hours-tr {
    background-color: transparent;
    border: none;
    display:table-row;
}

library-hours .hours-td {
    border-top: none;
    border-bottom: 1px solid #d8d8d8;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 8px;
    padding-top: 8px;
    word-wrap: normal;
    display: table-cell;
    vertical-align: middle;
}


library-hours a {
    color: #002655;
}

library-hours .closed {
    color:#ba0c2f;
    text-align: center;
    font-weight: 600;
    width: 11%;
}
library-hours .open {
    text-align: center;
    width: 11%;
}

library-hours th.is-today{
    border-top: 3px solid #DAAA00;
}

library-hours .keep-together{
    white-space: nowrap;
}
library-hours .status-icon{
    margin-right: 4px;
    margin-left: 8px;
    margin-bottom: inherit !important;
    width: 25px;
    height: 25px;
    min-width: 25px;
    min-height: 25px;
}
  library-hours .lib-titles{
      display:flex;
      align-items:center;
      font-weight: 600;
      text-decoration: none;

  }
  library-hours .dept-titles{
      display:flex;
      align-items:center;
  }
</style>`
