import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /*public isLogedIn = false;*/
  public userData: any;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp = (email: string, password: string) => {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        /*this.isLogedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));*/
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn = (email: string, password: string) => {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res  => {
        /*this.isLogedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));*/
        console.log(res.user?.uid);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut = () => {
    this.angularFireAuth
      .signOut()
      .then( res => {
        /*localStorage.removeItem('user');*/
        console.log('You have signed out!');
      });
  }

}
