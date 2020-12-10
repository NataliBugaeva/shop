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

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    this.err = '';
  }

  // метод "Зарегистрироваться"
  SignUp = (email: string, password: string) => {
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
  SignIn = (email: string, password: string) => {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res  => {
       /* localStorage.setItem('user', JSON.stringify(res.user));*/
        this.isLogged = true;
        this.err = '';
        console.log(res.user?.uid);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
        this.err = err.message;
      });
  }

  // Метод "Выйти"
  SignOut = () => {
    this.angularFireAuth
      .signOut()
      .then( res => {
        /*localStorage.removeItem('user');*/
        this.isLogged = false;
        console.log('You have signed out!');
      });
  }

}
