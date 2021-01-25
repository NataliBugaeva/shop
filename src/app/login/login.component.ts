import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../shared/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];

  public signupForm: FormGroup;
  public userInfo: {};
  public userId: string;
  public userEmail: string;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private commonService: CommonService,
              private router:Router) { }

  initSignUpForm(): void {
    this.signupForm = this.fb.group({
      info: this.fb.group({
        infoName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)]],
        infoSurname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)]],
        infoEmail: ['', [Validators.required, Validators.email]],
        infoPhone: ['', [Validators.required, Validators.pattern(/^\+375(\s+)?(17|25|29|33|44)(\s+)?[0-9]{3}[0-9]{2}[0-9]{2}$/)]],
      })
    });
  }

  get _infoName() {
    return this.signupForm.controls['info'].get('infoName');
  }

  get _infoSurname() {
    return this.signupForm.controls['info'].get('infoSurname');
  }

  get _infoEmail() {
    return this.signupForm.controls['info'].get('infoEmail');
  }

  get _infoPhone() {
    return this.signupForm.controls['info'].get('infoPhone');
  }


 /* signUp(): void {
    this.authenticationService.SignUp(this.signupForm.controls['info'].get('infoEmail'),
      this.signupForm.controls['info'].get('infoPassword'));
    console.log(this._infoEmail, this._infoPassword);
    console.log('заегалась');
  }*/

  done() {
    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.userId = res?.uid;
        this.userEmail = res?.email;
        this.userInfo = this.signupForm.value.info;
        console.log(this.userId,this.userEmail,this.userInfo);
        this.commonService.addNewUser(this.userId, this.userEmail, this.userInfo);
        this.commonService.addNewOrderDocument(this.userId);
        this.signupForm.reset();
        this.router.navigateByUrl('/');
      })
    );
  }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
