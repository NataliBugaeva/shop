import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

//этот email связан с инпутом
  public email: string;
  public password: string;
  public path: string;

  public isLogged: boolean;
  public err: string;
  public userData: any;
  //этот userEmail для хранения почты
  public userEmail: string;
  public userId: string;

  public switch = true;

  public subscriptions: Subscription[] = [];

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
    this.userEmail = '';
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.userData.subscribe(res => {
        this.userEmail = res?.email;
        this.userId = res?.uid;
        console.log(this.userEmail, this.userId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
