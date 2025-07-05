import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {RgMainPageComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-main-page/rg-main-page.component';
import {MenuItem} from '../../../ng-redgrape-ui/src/lib/models/menu-item';
import {RgLoginComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-login/rg-login.component';
import {RgDataGridComponent} from '../../../ng-redgrape-ui/src/lib/components/rg-data-grid/rg-data-grid.component';


@Component({
  selector: 'app-root',
  imports: [RgDataGridComponent, RgLoginComponent, RgMainPageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router ) {
  }

menuItems: MenuItem[] = [];


  click($event: { data: MenuItem; }) {
    if ($event.data?.link) {
      this.router.navigate([$event.data.link]).then(r => {});
    }

  }

  ngOnInit(): void {



    this.menuItems  = [
      {
        text: 'صفحه لاگین',
        icon: 'bi-speedometer2',
        expanded: false,
        children : [
          {
            text: 'حالت استاندارد',
            icon: 'bi-speedometer2',
            link: "login/standard"
          }
        ]
      },
      {
        text: 'گرید',
        icon: 'bi-speedometer2',
        expanded: false,
        children : [
          {
            text: 'حالت استاندارد',
            icon: 'bi-speedometer2',
            link: "grid/standard"
          }
        ]
      },
    ];
  }

  do_login($event: any) {
    console.log(JSON.stringify($event));
  }
}
