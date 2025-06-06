import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForOf, NgIf} from '@angular/common';
import {MenuItem} from '../../models/menu-item';



@Component({
  selector: 'rg-side-menu',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './rg-side-menu.component.html',
  styleUrl: './rg-side-menu.component.scss'
})
export class RgSideMenuComponent {
  @Input() collapsed: boolean = false;
  @Input() mobileView: boolean = false;
  @Input() menuItems : MenuItem[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<{data: MenuItem}>();


  toggleSubMenu(item: any): void {
    if (item.children?.length) {
      item.expanded = !item.expanded;
    }
    this.menuItemClick?.emit({data: item});
  }


}
