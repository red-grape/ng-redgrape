import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { RgDateTimePickerComponent } from './rg-date-time-picker.component';

describe('RgDateTimePickerComponent', () => {
  let component: RgDateTimePickerComponent;
  let fixture: ComponentFixture<RgDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgDateTimePickerComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RgDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with the calendar closed', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
    expect(fixture.nativeElement.querySelector('.calendar-panel')).toBeNull();
  });

  it('should support ControlValueAccessor values in Gregorian date mode', () => {
    component.writeValue('2026-03-21');
    fixture.detectChanges();

    expect(component.inputValue).toBe('2026-03-21');
    expect(component.selectedDate).toEqual({ year: 2026, month: 3, day: 21 });
  });

  it('should display Jalali values in RTL mode while preserving ISO output', () => {
    component.direction = 'rtl';
    component.writeValue('2026-03-21');
    fixture.detectChanges();

    expect(component.inputValue).toBe('1405/01/01');
    expect(component.selectedDate).toEqual({ year: 1405, month: 1, day: 1 });

    const changes: Array<string | null> = [];
    component.registerOnChange(value => changes.push(value));
    component.selectDay({ year: 1405, month: 1, day: 2, currentMonth: true });

    expect(changes).toEqual(['2026-03-22']);
  });

  it('should parse manually entered Gregorian date-time values', () => {
    component.mode = 'datetime';
    const changes: Array<string | null> = [];
    component.registerOnChange(value => changes.push(value));

    component.onInput('2026-03-21 14:30');

    expect(component.selectedDate).toEqual({ year: 2026, month: 3, day: 21 });
    expect(component.timeValue).toBe('14:30');
    expect(changes).toEqual(['2026-03-21T14:30']);
  });

  it('should ignore invalid manual input without changing the control value', () => {
    const changes: Array<string | null> = [];
    component.registerOnChange(value => changes.push(value));

    component.onInput('2026-02-30');

    expect(component.selectedDate).toBeNull();
    expect(changes).toEqual([]);
  });

  it('should emit the selected date and close in date mode', () => {
    component.toggleCalendar();
    const changes: Array<string | null> = [];
    const emitted: Array<string | null> = [];
    component.registerOnChange(value => changes.push(value));
    component.valueChange.subscribe(value => emitted.push(value));

    component.selectDay({ year: 2026, month: 4, day: 5, currentMonth: true });

    expect(changes).toEqual(['2026-04-05']);
    expect(emitted).toEqual(['2026-04-05']);
    expect(component.inputValue).toBe('2026-04-05');
    expect(component.isOpen).toBeFalse();
  });

  it('should include time when selecting a date-time value', () => {
    component.mode = 'datetime';
    component.timeValue = '09:45';
    component.toggleCalendar();
    component.selectDay({ year: 2026, month: 4, day: 5, currentMonth: true });

    expect(component.inputValue).toBe('2026-04-05 09:45');
    expect(component.isOpen).toBeTrue();
  });

  it('should not open or select dates when disabled', () => {
    component.setDisabledState(true);
    component.toggleCalendar();
    component.selectDay({ year: 2026, month: 4, day: 5, currentMonth: true });

    expect(component.isOpen).toBeFalse();
    expect(component.selectedDate).toBeNull();
  });

  it('should work as a reactive form control', () => {
    const form = new FormGroup({ dueDate: new FormControl<string | null>(null) });
    const control = TestBed.createComponent(RgDateTimePickerComponent).componentInstance;
    control.registerOnChange(value => form.controls.dueDate.setValue(value));

    control.onInput('2026-03-21');

    expect(form.controls.dueDate.value).toBe('2026-03-21');
  });
});
