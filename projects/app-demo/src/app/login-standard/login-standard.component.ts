import { Component } from '@angular/core';
import {RgLoginComponent} from '../../../../ng-redgrape-ui/src/lib/components/rg-login/rg-login.component';

@Component({
  selector: 'app-login-standard',
  imports: [RgLoginComponent],
  templateUrl: './login-standard.component.html',
  styleUrl: './login-standard.component.scss'
})
export class LoginStandardComponent {

  do_login($event: any) {

  }
}
