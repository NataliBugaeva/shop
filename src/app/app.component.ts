import { Component } from '@angular/core';

import {CommonService} from './shared/common.service';
import {AuthenticationService} from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public email: string;
  public password: string;
  public isLogged: boolean;

  public switch = true;

  constructor(public service: CommonService, public authenticationService: AuthenticationService) {

  }

  switchSearch = () => {
    this.switch = !this.switch;
  }

  signUp = () => {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
    this.isLogged = true;
  }

  signIn = () => {
    this.authenticationService.SignIn(this.email, this.password);
    (this.email && this.password) ? this.isLogged = true : this.isLogged = false;
    this.email = '';
    this.password = '';
  }

  signOut = () => {
    this.authenticationService.SignOut();
    this.isLogged = false;
  }

}
