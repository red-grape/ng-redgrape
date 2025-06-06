import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RgMainPageComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-main-page/rg-main-page.component';
import {MenuItem} from '../../../ng-redgrape-ui/src/lib/models/menu-item';
import {RgLoginComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-login/rg-login.component';
import {RgDataGridComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-data-grid/rg-data-grid.component';


@Component({
  selector: 'app-root',
  imports: [RgDataGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

menuItems: MenuItem[] = [];
  public mockData: { ID: number; Name: string; Email: string; }[] | [] = [];

  click($event: { data: MenuItem; }) {
    console.log($event);
  }

  ngOnInit(): void {

    this.mockData = Array.from({ length: 100 }, (_, i) => ({
      ID: i + 1,
      Name: `User ${i + 1}`,
      Email: `user both Bootstrap's JavaScript and Popper.js ${i + 1}@example.com`,
      ID1: i + 1,
      Name1: `User ${i + 1}`,
      Email1: `user both Bootstrap's JavaScript and Popper.js ${i + 1}@example.com`,
      ID2: i + 1,
      Name2: `User ${i + 1}`,
      Email2: `user both Bootstrap's JavaScript and Popper.js ${i + 1}@example.com`,
    }));

    this.menuItems  = [
      {
        text: 'اطلاعات پایه1',
        icon: 'bi-speedometer2',
        expanded: false
      },
      {
        text: 'Products',
        icon: 'bi-box-seam',
        expanded: false,
        children: [
          { text: 'All Products' },
          { text: 'Categories' },
          { text: 'Inventory' },
          { text: 'All Products' },
          { text: 'Categories' },
          { text: 'Inventory' },
          { text: 'All Products' },
          { text: 'Categories' },
          { text: 'Inventory' },
          { text: 'All Products' },
          { text: 'Categories' },
          { text: 'Inventory' }
        ]
      },
      {
        text: 'Orders',
        icon: 'bi-cart',
        expanded: false,
        children: [
          { text: 'New Orders' },
          { text: 'Order History' },
          { text: 'New Orders' },
          { text: 'Order History' },
          { text: 'New Orders' },
          { text: 'Order History' },
          { text: 'New Orders' },
          { text: 'Order History' },
          { text: 'New Orders' },
          { text: 'Order History' }
        ]
      },
      {
        text: 'Customers',
        icon: 'bi-people',
        expanded: false
      },
      {
        text: 'Reports',
        icon: 'bi-graph-up',
        expanded: false
      },
      {
        text: 'Settings',
        icon: 'bi-gear',
        expanded: false,
        children: [
          { text: 'General' },
          { text: 'Security' },
          { text: 'Notifications' }
        ]
      }
    ];
  }

  do_login($event: any) {
    console.log(JSON.stringify($event));
  }
}
