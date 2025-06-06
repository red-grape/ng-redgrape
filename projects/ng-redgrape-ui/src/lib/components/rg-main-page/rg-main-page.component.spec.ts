import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgMainPageComponent } from './rg-main-page.component';

describe('RgMainPageComponent', () => {
  let component: RgMainPageComponent;
  let fixture: ComponentFixture<RgMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
