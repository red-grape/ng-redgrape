import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStandardComponent } from './grid-standard.component';

describe('GridStandardComponent', () => {
  let component: GridStandardComponent;
  let fixture: ComponentFixture<GridStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridStandardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
