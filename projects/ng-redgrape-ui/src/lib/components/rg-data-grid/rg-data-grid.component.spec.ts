import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgDataGridComponent } from './rg-data-grid.component';

describe('RgDataGridComponent', () => {
  let component: RgDataGridComponent;
  let fixture: ComponentFixture<RgDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgDataGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
