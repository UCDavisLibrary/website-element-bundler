export default `
<style>
library-hours-week {
  display: block;
  background-color: transparent;
  padding: 0px;
  min-width: 275px;
}

library-hours-week .hours-table{
    border-top: 3px solid #d8d8d8;
    border-bottom: 3px solid #d8d8d8;
    border-collapse: collapse;
    margin-bottom: 0px;
    width: 100%;
    display: table;
}

library-hours-week .hours-tr {
    background-color: transparent;
    border: none;
    display:table-row;
}

library-hours-week .hours-td {
    border-bottom: none;
    padding-left: 4px;
    padding-right: 4px;
    padding-bottom: 8px;
    word-wrap: normal;
    display: table-cell;
    vertical-align: middle;
}

library-hours-week .hours-th {
    padding-top: 14px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

library-hours-week .hours-th.is-today{
    border-top: 3px solid #DAAA00;
    border-right: 3px solid #DAAA00;
    border-left: 3px solid #DAAA00;
}

library-hours-week .hours-td.is-today{
    border-right: 3px solid #DAAA00;
    border-left: 3px solid #DAAA00;
}


library-hours-week a {
    color: #002655;
}
library-hours-week img {
    width: 25px;
}
library-hours-week .closed {
    color:#ba0c2f;
    text-align: center;
    font-weight: 600;
    width: 11%;
}
library-hours-week .open {
    text-align: center;
    width: 11%;
}

library-hours-week th.is-today{
    border-top: 3px solid #DAAA00;
}

library-hours-week .keep-together{
    white-space: nowrap;
}
library-hours-week .status-icon{
    margin-right: 8px;
    margin-left: 8px;
    margin-bottom: inherit !important;
}
library-hours-week .lib-titles{
      display:flex;
      align-items:center;
      font-weight: 600;
      text-decoration: none;

  }
library-hours-week .dept-titles{
      display:flex;
      align-items:center;
  }
library-hours-week #month_container {

      width: 100%;
      height: 260px;
      text-align: center;

  }
  library-hours-week #month_0,
  library-hours-week #month_1,
  library-hours-week #month_2 {
      display: inline-block;
      width: 250px;
      height: 250px;
      background-color: #fff;
  }
  library-hours-week .month_nav_left,
  library-hours-week .month_nav_right{
      display: inline-block;
      height: 100%;
      vertical-align: top;
      padding-top: 125px;

  }
  library-hours-week .month_nav_left {
      padding-left: 0px;
      padding-right: 10px;
  }
  library-hours-week .month_nav_right {
      padding-left: 10px;
      padding-right: 0px;
  }
  library-hours-week #month_container .title {
      display: block;
      margin-top: 10px;
      margin-bottom: none;
  }
  library-hours-week #month_container .col-header{

      font-weight: 600;
      display: inline-block;
      width: 30px;
      height: 30px;
      font-size: 12px;
  }
  library-hours-week .cal-row{
      width: 100%;
      text-align: center;
      margin-top: 2px;
      margin-bottom: 2px;
  }
  library-hours-week .cal-day {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 26px;
      font-size: 12px;
      cursor: pointer;
      align-items: center;
      font-weight: 400;
  }
  library-hours-week .day-text {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
  }
  library-hours-week #month_container .previous,
  library-hours-week #month_container .next {
      color: #808080;
  }

  library-hours-week .legend-item {
      display:flex;
      align-items:center;
      margin-top: 6px;
      margin-bottom: 6px;
  }

  library-hours-week #legend-container {
      background-color: #fff;
      width: 335px;
      min-height: 35px;
      margin: auto;
      margin-bottom: 10px;
      margin-top: 10px;
  }
  library-hours-week .legend-icon {
      margin-right: 8px;
      width: 18px;
      margin-bottom: inherit !important;
  }
  library-hours-week .legend-item-container{
      display: inline-block;
      margin-left: 5px;
      margin-right: 5px;

  }

@media(min-width: 1000px){
  library-hours-week #view_tablet {
      display:none;
  }
  library-hours-week #view_desktop {
      display:block;
  }
  library-hours-week #view_mobile {
      display:none;
  }


  library-hours-week .hours-td {
      border-top: 1px solid #d8d8d8;
      border-left: none;
      border-right: none;
      padding-top: 8px;
  }

  library-hours-week .hours-th {
      padding-bottom: 14px;
  }

  library-hours-week .hours-td:nth-child(odd), .hours-th:nth-child(odd) {
    background-color: #fff;
}
library-hours-week .hours-td:nth-child(even), .hours-th:nth-child(even) {
      background-color: #f3f3f3;
  }

  library-hours-week .hours-tr:nth-last-child(2) .hours-td.is-today {
      border-bottom: 3px solid #DAAA00;
  }
  library-hours-week .hours-td {
      padding-bottom: 14px;
  }

  library-hours-week #month_0 .next.cal-day {
      pointer-events: none;
      background-image: none !important;
  }
  library-hours-week #month_0 .next.day-text {
      display: none;
  }

  library-hours-week #month_0 .previous.day-text {
      display: block;
  }
  library-hours-week #month_0 .previous.cal-text {
      pointer-events: all;
  }

  library-hours-week #month_1 .next.day-text,
  library-hours-week #month_1 .previous.day-text {
      display: none;

  }
  library-hours-week #month_1 .next.cal-day,
  library-hours-week #month_1 .previous.cal-day {
      pointer-events: none;
      background-image: none !important;

  }

  library-hours-week #month_2 .previous.day-text {
      display: none;
      background-image: none !important;

  }
  library-hours-week #month_2 .previous.cal-day {
      pointer-events: none;
      background-image: none !important;

  }


}
@media(max-width: 1000px){
  library-hours-week #view_tablet {
      display:block;
  }
  library-hours-week #view_desktop {
      display:none;
  }
  library-hours-week #view_mobile {
      display:none;
  }

  library-hours-week #month_2 {
      display: none;
  }

  library-hours-week #month_0 .next.day-text {
      display: none;
  }

  library-hours-week #month_0 .next.cal-day {
      pointer-events: none;
      background-image: none !important;
  }
  library-hours-week #month_1 .previous.day-text {
      display: none;
  }
  library-hours-week #month_1 .previous.cal-day {
      pointer-events: none;
      background-image: none !important;
  }


  library-hours-week .hours-td,
  library-hours-week .hours-th {
      background-color: #fff;
      border-left: 1px solid #d8d8d8;
      border-right: 1px solid #d8d8d8;
      border-top: none;
      border-bottom: none;

  }
  library-hours-week .hours-th {
      padding-bottom: none;
  }
  library-hours-week .hours-td {
      padding-top: 4px;
  }
  library-hours-week a {
      padding-top: 12px;
      padding-bottom: 12px;
  }
  library-hours-week .hours-table {
      border-left: none;
      border-right: none;
      border-top: 1px solid #d8d8d8;
      border-bottom: 2px solid #d8d8d8;
  }

  library-hours-week .hours-table[hidden] {
      display:none;
  }
  library-hours-week .hours-tr:nth-last-child(1) .hours-td.is-today {
      border-bottom: 3px solid #DAAA00;
  }
}

@media(max-width: 700px){
  library-hours-week #view_tablet {
      display:none;
  }
  library-hours-week #view_desktop {
      display:none;
  }
  library-hours-week #view_mobile {
      display:block;
  }
  library-hours-week #month_1 {
      display: none;
  }
  library-hours-week #month_2 {
      display: none;
  }

  library-hours-week #month_0 .next.day-text {
      display: block;
  }

  library-hours-week .month_nav_left {
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 110px;
  }
  library-hours-week .month_nav_right {
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 110px;
  }
  library-hours-week .cal-day {
      width: 25px;
      height: 21px;
  }
  library-hours-week #month_container .col-header {
      width: 25px;
      height: 21px;
  }
  library-hours-week #month_0{
      width: 225px;
      height: 230px;
  }

  library-hours-week .hours-td {
      background-color: #fff;
      border-left: none;
      border-right: none;
  }
  library-hours-week .hours-tr.is-today {
      border-bottom: 3px solid #DAAA00;
      border-top: 3px solid #DAAA00;
      border-left: 3px solid #DAAA00;
      border-right: 3px solid #DAAA00;
  }
  library-hours-week .hours-table {
      border-top: none;
      border-bottom: none;
  }
  library-hours-week hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #d8d8d8;
      margin: 0;
      padding: 0;
  }

  library-hours-week #legend-container {
      width: 225px;

  }

  library-hours-week .legend-item-container{
      margin-left: 8px;
      margin-right: 8px;

  }

}
</style>`
