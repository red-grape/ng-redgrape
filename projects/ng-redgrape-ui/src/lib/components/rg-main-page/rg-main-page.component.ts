import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RgSideMenuComponent} from '../rg-side-menu/rg-side-menu.component';
import {MenuItem} from '../../models/menu-item';

@Component({
  selector: 'rg-main-page',
  imports: [
    RgSideMenuComponent
  ],
  templateUrl: './rg-main-page.component.html',
  styleUrl: './rg-main-page.component.scss'
})
export class RgMainPageComponent {
  title = 'Dashboard';
  sideMenuCollapsed = false;
  mobileView = false;
  @Input() menuItems : MenuItem[] = [];
  @Output() menuItemClick = new EventEmitter<{data: MenuItem}>();

  constructor() {
    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
  }

  toggleSideMenu(): void {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }

  private checkViewport(): void {
    this.mobileView = window.innerWidth < 992;
    if (!this.mobileView) {
      this.sideMenuCollapsed = false;
    }
  }

  menuItemClicked($event: { data: MenuItem }) {
    this.menuItemClick?.emit({data: $event.data});
  }
}
