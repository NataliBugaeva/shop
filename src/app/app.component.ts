import { Component } from '@angular/core';
import {AuthenticationService} from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public email: string;
  public password: string;
  public path: string;

  public switch = true;

  constructor(public authenticationService: AuthenticationService) {}

  switchSearch(): void {
    this.switch = !this.switch;
  }

  signUp(): void {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn(): void {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut(): void {
    this.authenticationService.SignOut();
  }

}
