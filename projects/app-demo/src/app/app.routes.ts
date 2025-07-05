import { Routes } from '@angular/router';
import {LoginStandardComponent} from './login-standard/login-standard.component';
import {GridStandardComponent} from './grid-standard/grid-standard.component';

export const routes: Routes = [
  {
    path: 'login/standard',
    component: LoginStandardComponent
  },
  {
    path: 'grid/standard',
    component: GridStandardComponent
  }
];
