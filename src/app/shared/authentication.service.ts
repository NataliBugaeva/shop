import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userData: any;
  public err: string;
  public isLogged: boolean;
  public email: any;
  public password: any;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    this.err = '';
  }

  // метод "Зарегистрироваться"
  SignUp(email: string, password: string): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        /*localStorage.setItem('user', JSON.stringify(res.user));*/
        this.isLogged = true;
        this.err = '';
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        this.err = error.message;
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
        this.email = this.userData.email;
        console.log(res.user?.uid, this.userData);
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
        /*localStorage.removeItem('user');*/
        this.isLogged = false;
        console.log('You have signed out!');
      });
  }

}
