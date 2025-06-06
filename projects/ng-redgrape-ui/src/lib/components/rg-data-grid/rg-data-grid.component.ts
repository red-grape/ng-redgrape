import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'rg-data-grid',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './rg-data-grid.component.html',
  styleUrl: './rg-data-grid.component.scss'
})
export class RgDataGridComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() enableHScroll: boolean = true;

  currentPage: number = 1;
  pageSize: number = 15;

  get pagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get pageCount() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.pageCount) this.currentPage++;
  }

  ngOnInit(): void {}
}
