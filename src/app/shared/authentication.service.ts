import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userData: any;
  public err: string;
  public isLogged = false;

  public email: any;
  public password: any;

  public userEmail: any;

  public changePath: string;


  constructor(private angularFireAuth: AngularFireAuth,
              private commonService: CommonService,
              public router: Router) {
    this.userData = angularFireAuth.authState;
    this.err = '';
  }

  getUrl() {
    return this.router.url;
  }

  // метод "Зарегистрироваться"
  SignUp(email, password): void {
    console.log(email,password);
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.err = '';
        console.log('Successfully signed up!', res);
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        this.err = error.message;
        console.log('Something is wrong:', error.message);
        this.router.navigateByUrl('');
      });
  }

  // Метод "Войти"
  SignIn(email: string, password: string): void {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res  => {
       /* localStorage.setItem('user', JSON.stringify(res.user));*/
        this.isLogged = true;
        this.err = '';
       /* this.email = this.userData.email;*/
        this.email = res.user?.email;
        console.log(res.user?.uid, this.email, this.isLogged);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
        this.err = err.message;
      });
  }

  // Метод "Выйти"
  SignOut(): void {
    this.angularFireAuth
      .signOut()
      .then( res => {
        this.isLogged = false;
        console.log('You have signed out!');
      });
  }

  user(): Observable<any>{
  return this.angularFireAuth.user;
  }

  getId() {
    return this.angularFireAuth.user.pipe(
      map(res => !!(res?.uid))
    );
  }

}
