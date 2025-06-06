import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgSideMenuComponent } from './rg-side-menu.component';

describe('RgSideMenuComponent', () => {
  let component: RgSideMenuComponent;
  let fixture: ComponentFixture<RgSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgSideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
