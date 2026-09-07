import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RgDateTimePickerComponent } from '../../../../ng-redgrape-ui/src/lib/components/rg-date-time-picker/rg-date-time-picker.component';

@Component({
  selector: 'app-date-time-picker-demo',
  imports: [ReactiveFormsModule, RgDateTimePickerComponent],
  templateUrl: './date-time-picker-demo.component.html',
  styleUrl: './date-time-picker-demo.component.scss',
})
export class DateTimePickerDemoComponent {
  readonly form = new FormGroup({
    gregorianDate: new FormControl<string | null>('2026-03-21'),
    gregorianDateTime: new FormControl<string | null>('2026-03-21T14:30'),
    shamsiDate: new FormControl<string | null>('2026-03-21'),
    shamsiDateTime: new FormControl<string | null>('2026-03-21T14:30'),
  });

  lastEmittedValue: string | null = null;

  onValueChange(value: string | null): void {
    this.lastEmittedValue = value;
  }

  reset(): void {
    this.form.reset({
      gregorianDate: null,
      gregorianDateTime: null,
      shamsiDate: null,
      shamsiDateTime: null,
    });
    this.lastEmittedValue = null;
  }
}
