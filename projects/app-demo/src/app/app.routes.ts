import { Routes } from '@angular/router';
import {LoginStandardComponent} from './login-standard/login-standard.component';
import {GridStandardComponent} from './grid-standard/grid-standard.component';
import {DateTimePickerDemoComponent} from './date-time-picker-demo/date-time-picker-demo.component';

export const routes: Routes = [
  {
    path: 'login/standard',
    component: LoginStandardComponent
  },
  {
    path: 'grid/standard',
    component: GridStandardComponent
  },
  {
    path: 'date-time-picker/demo',
    component: DateTimePickerDemoComponent
  }
];
