import {Component, OnInit} from '@angular/core';
import {RgDataGridComponent} from '../../../../ng-redgrape-ui/src/lib/components/rg-data-grid/rg-data-grid.component';

@Component({
  selector: 'app-grid-standard',
  imports: [RgDataGridComponent],
  templateUrl: './grid-standard.component.html',
  styleUrl: './grid-standard.component.scss'
})
export class GridStandardComponent implements OnInit {
  mockData : any[] = []
  ngOnInit(): void {
  this.mockData = Array.from(
    { length: 100 }, (_, i) => ({
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

    }

}
