import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'rg-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './rg-login.component.html',
  styleUrl: './rg-login.component.scss'
})
export class RgLoginComponent {
  loginForm: FormGroup;

  @Output() login = new EventEmitter<{ user: string; password: string }>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value);
    }
  }
}
