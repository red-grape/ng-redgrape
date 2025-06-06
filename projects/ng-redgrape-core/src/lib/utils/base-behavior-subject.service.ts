import { BehaviorSubject } from 'rxjs';

export class BaseBehaviorSubjectService<T> {
  protected subject$: BehaviorSubject<T|null>;

  constructor() {
    this.subject$ = new BehaviorSubject<T | null>(null);
  }

  data$() {
    return this.subject$.asObservable();
  }

  getValue(): T | null {
    return this.subject$.getValue();
  }

  set(value: T): void {
    this.subject$.next(value);
  }

}
