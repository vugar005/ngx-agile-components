import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-simple-paginator',
  template: `
  <div class="ngx-paginator-container">
      <div class="ngx-paginator-page-size">
        <div class="ngx-paginator-page-size-label"> Items per page:
        </div>
      </div>
      <div class="ngx-paginator-range-actions">
        <div class="ngx-paginator-range-label"> 1 - 10 of 100</div>
        <div class="ngx-dropdown-wrapper" style="width: 12rem; font-size: 12px;">
        <ngx-simple-dropdown>
          <p  dropdownToggle>10</p>
          <ul *dropdownMenu class="ngx-dropdown-menu">
            <button>10</button>
            <button>25</button>
            <button>100</button>
          </ul>
        </ngx-simple-dropdown>
      </div>
        <div class="ngx-paginator-range-actions-btns">
         <button>
          <svg class="ngx-paginator-icon" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
         </button>
         <button>
          <svg class="ngx-paginator-icon" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
         </button>
        </div>
     </div>
  </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
