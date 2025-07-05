import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStandardComponent } from './login-standard.component';

describe('LoginStandardComponent', () => {
  let component: LoginStandardComponent;
  let fixture: ComponentFixture<LoginStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginStandardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
