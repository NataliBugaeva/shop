import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
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
              public router: Router) {
    this.userData = angularFireAuth.authState;
    this.err = '';
  }

  getUrl() {
    return this.router.url;
  }

  // метод "Зарегистрироваться"
  SignUp(email, password): void {
    console.log(email, password);
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.email = res.user?.email;
        this.err = '';
        this.userData = this.angularFireAuth.authState;
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        this.err = error.message;
        this.router.navigateByUrl('');
      });
  }

  // Метод "Войти"
  SignIn(email: string, password: string): void {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogged = true;
        this.err = '';
        this.email = res.user?.email;
        this.userData = this.angularFireAuth.authState;
      })
      .catch(err => {
        this.err = err.message;
      });
  }

  // Метод "Выйти"
  SignOut(): void {
    this.angularFireAuth
      .signOut()
      .then(() => {
        this.isLogged = false;
      });
  }

  user(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  getId() {
    return this.angularFireAuth.user.pipe(
      map(res => !!(res?.uid))
    );
  }

  getUser() {
    return this.angularFireAuth.user.pipe(
      map(res => ({id: res?.uid, email: res?.email}))
    );
  }


}
