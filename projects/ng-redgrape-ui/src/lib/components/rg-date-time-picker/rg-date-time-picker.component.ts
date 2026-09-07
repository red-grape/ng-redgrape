import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PickerMode = 'date' | 'datetime';
type PickerDirection = 'ltr' | 'rtl';

interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

interface CalendarCell extends CalendarDate {
  currentMonth: boolean;
}

const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const JALALI_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];
const GREGORIAN_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const JALALI_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

@Component({
  selector: 'rg-date-time-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rg-date-time-picker.component.html',
  styleUrl: './rg-date-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RgDateTimePickerComponent),
    multi: true,
  }],
})
export class RgDateTimePickerComponent implements ControlValueAccessor {
  @Input() mode: PickerMode = 'date';
  @Input() direction: PickerDirection = 'ltr';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() id = `rg-date-time-picker-${Math.random().toString(36).slice(2)}`;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string | null>();

  inputValue = '';
  isOpen = false;
  viewDate = this.toCalendarDate(new Date());
  selectedDate: CalendarDate | null = null;
  timeValue = '00:00';

  private onChange: (value: string | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get isRtl(): boolean {
    return this.direction === 'rtl';
  }

  get monthLabel(): string {
    return this.isRtl
      ? JALALI_MONTHS[this.viewDate.month - 1]
      : GREGORIAN_MONTHS[this.viewDate.month - 1];
  }

  get yearLabel(): number {
    return this.viewDate.year;
  }

  get weekdays(): string[] {
    return this.isRtl ? JALALI_WEEKDAYS : GREGORIAN_WEEKDAYS;
  }

  get calendarCells(): CalendarCell[] {
    const first = this.toGregorianDate(this.viewDate.year, this.viewDate.month, 1);
    const firstWeekday = this.isRtl
      ? (first.getUTCDay() + 1) % 7
      : first.getUTCDay();
    const daysInMonth = this.daysInMonth(this.viewDate.year, this.viewDate.month);
    const previous = this.previousMonth(this.viewDate);
    const previousDays = this.daysInMonth(previous.year, previous.month);
    const cells: CalendarCell[] = [];

    for (let index = firstWeekday - 1; index >= 0; index--) {
      cells.push({ ...previous, day: previousDays - index, currentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ ...this.viewDate, day, currentMonth: true });
    }
    const next = this.nextMonth(this.viewDate);
    for (let day = 1; cells.length < 42; day++) {
      cells.push({ ...next, day, currentMonth: false });
    }
    return cells;
  }

  get displayPlaceholder(): string {
    return this.placeholder || (this.isRtl
      ? (this.mode === 'datetime' ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD')
      : (this.mode === 'datetime' ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'));
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.inputValue = '';
      this.selectedDate = null;
      return;
    }
    const parsed = this.parseIsoValue(value);
    if (!parsed) {
      throw new Error(`rg-date-time-picker received an invalid value: ${value}`);
    }
    this.selectedDate = this.toCalendarDate(parsed.date);
    this.viewDate = { ...this.selectedDate };
    this.timeValue = parsed.time;
    this.inputValue = this.formatInput(this.selectedDate, parsed.time);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleCalendar(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.selectedDate) this.viewDate = { ...this.selectedDate };
    this.onTouched();
  }

  selectDay(day: CalendarCell): void {
    if (this.disabled) return;
    this.selectedDate = { year: day.year, month: day.month, day: day.day };
    this.viewDate = { ...this.selectedDate };
    this.commit();
    if (!day.currentMonth) return;
    if (this.mode === 'date') this.isOpen = false;
  }

  previous(): void {
    this.viewDate = this.previousMonth(this.viewDate);
  }

  next(): void {
    this.viewDate = this.nextMonth(this.viewDate);
  }

  onInput(value: string): void {
    this.inputValue = value;
    const parsed = this.parseInput(value);
    if (!parsed) return;
    this.selectedDate = parsed.date;
    this.viewDate = { ...parsed.date };
    this.timeValue = parsed.time;
    this.commit(false);
  }

  onTimeChange(value: string): void {
    this.timeValue = value;
    if (this.selectedDate) this.commit();
  }

  onInputBlur(): void {
    this.onTouched();
    if (!this.selectedDate && this.inputValue) this.inputValue = '';
  }

  private commit(updateInput = true): void {
    if (!this.selectedDate) return;
    const value = this.toIsoValue(this.selectedDate, this.timeValue);
    if (updateInput) this.inputValue = this.formatInput(this.selectedDate, this.timeValue);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  private parseInput(value: string): { date: CalendarDate; time: string } | null {
    const match = value.trim().match(
      /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?$/,
    );
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const time = `${String(Number(match[4] ?? 0)).padStart(2, '0')}:${match[5] ?? '00'}`;
    if (!this.isValidDate({ year, month, day }) || !this.isValidTime(time)) return null;
    return {
      date: this.isRtl ? { year, month, day } : this.toCalendarDate(new Date(Date.UTC(year, month - 1, day))),
      time,
    };
  }

  private parseIsoValue(value: string): { date: Date; time: string } | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
    if (!match) return null;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    if (Number.isNaN(date.getTime())) return null;
    return { date, time: `${match[4] ?? '00'}:${match[5] ?? '00'}` };
  }

  private formatInput(date: CalendarDate, time: string): string {
    const separator = this.isRtl ? '/' : '-';
    const result = [date.year, String(date.month).padStart(2, '0'), String(date.day).padStart(2, '0')].join(separator);
    return this.mode === 'datetime' ? `${result} ${time}` : result;
  }

  private toIsoValue(date: CalendarDate, time: string): string {
    const gregorian = this.isRtl
      ? this.toGregorianDate(date.year, date.month, date.day)
      : new Date(Date.UTC(date.year, date.month - 1, date.day));
    const result = `${gregorian.getUTCFullYear()}-${String(gregorian.getUTCMonth() + 1).padStart(2, '0')}-${String(gregorian.getUTCDate()).padStart(2, '0')}`;
    return this.mode === 'datetime' ? `${result}T${time}` : result;
  }

  private toCalendarDate(date: Date): CalendarDate {
    return this.isRtl ? this.gregorianToJalali(date) : {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    };
  }

  private isValidDate(date: CalendarDate): boolean {
    return date.month >= 1 && date.month <= 12 && date.day >= 1 &&
      date.day <= this.daysInMonth(date.year, date.month);
  }

  private isValidTime(value: string): boolean {
    const [hours, minutes] = value.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  }

  private daysInMonth(year: number, month: number): number {
    if (!this.isRtl) return new Date(Date.UTC(year, month, 0)).getUTCDate();
    return month <= 6 ? 31 : month <= 11 ? 30 : this.isJalaliLeapYear(year) ? 30 : 29;
  }

  private isJalaliLeapYear(year: number): boolean {
    const currentNewYear = this.jalaliToGregorian(year, 1, 1).getTime();
    const nextNewYear = this.jalaliToGregorian(year + 1, 1, 1).getTime();
    return (nextNewYear - currentNewYear) / 86_400_000 === 366;
  }

  private previousMonth(date: CalendarDate): CalendarDate {
    return date.month === 1 ? { year: date.year - 1, month: 12, day: 1 } : { year: date.year, month: date.month - 1, day: 1 };
  }

  private nextMonth(date: CalendarDate): CalendarDate {
    return date.month === 12 ? { year: date.year + 1, month: 1, day: 1 } : { year: date.year, month: date.month + 1, day: 1 };
  }

  private toGregorianDate(year: number, month: number, day: number): Date {
    return this.isRtl ? this.jalaliToGregorian(year, month, day) : new Date(Date.UTC(year, month - 1, day));
  }

  private jalaliToGregorian(jy: number, jm: number, jd: number): Date {
    let days = 365 * (jy - 979) + Math.floor((jy - 979) / 33) * 8 +
      Math.floor(((jy - 979) % 33 + 3) / 4) + 81 + jd;
    days += jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186;
    let year = 1600 + 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      year += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    year += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      year += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const dayOfYear = days + 1;
    const month = dayOfYear <= 31 ? 1 : dayOfYear <= 62 ? 2 : dayOfYear <= 93 ? 3 :
      dayOfYear <= 124 ? 4 : dayOfYear <= 155 ? 5 : dayOfYear <= 186 ? 6 :
      dayOfYear <= 216 ? 7 : dayOfYear <= 246 ? 8 : dayOfYear <= 276 ? 9 :
      dayOfYear <= 306 ? 10 : dayOfYear <= 336 ? 11 : 12;
    const day = dayOfYear - (month <= 6 ? (month - 1) * 31 : 186 + (month - 7) * 30);
    return new Date(Date.UTC(year, month - 1, day));
  }

  private gregorianToJalali(date: Date): CalendarDate {
    const gy = date.getUTCFullYear() - 1600;
    const gm = date.getUTCMonth();
    const gd = date.getUTCDate() - 1;
    const gdm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) +
      Math.floor((gy + 399) / 400);
    for (let i = 0; i < gm; i++) days += gdm[i];
    if (gm > 1 && ((gy + 1600) % 4 === 0 && ((gy + 1600) % 100 !== 0 || (gy + 1600) % 400 === 0))) days++;
    days += gd;
    days -= 79;
    let jy = 979 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    const remainder = days;
    const jm = remainder < 186 ? 1 + Math.floor(remainder / 31) : 7 + Math.floor((remainder - 186) / 30);
    return { year: jy, month: jm, day: 1 + (remainder < 186 ? remainder % 31 : (remainder - 186) % 30) };
  }
}
