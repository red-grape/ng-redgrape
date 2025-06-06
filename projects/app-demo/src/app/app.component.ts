import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RgMainPageComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-main-page/rg-main-page.component';
import {MenuItem} from '../../../ng-redgrape-ui/src/lib/models/menu-item';


@Component({
  selector: 'app-root',
  imports: [RgMainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

menuItems: MenuItem[] = [];

  click($event: { data: MenuItem; }) {
    console.log($event);
  }

  ngOnInit(): void {

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
}
