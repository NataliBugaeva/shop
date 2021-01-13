import { Component, OnInit, OnDestroy } from '@angular/core';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  public deliveryChecked: string;
  public paymentChecked: string;

  public subscriptions: Subscription[] = [];

  public disable: boolean;
  public dis: boolean;

  public orderForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  makeOrder(): void {
    /*this.orderForm.controls.userInfo.patchValue({userName: 'Натахич'});*/

    console.log('Спасибо за заказ!!!');

    /*console.log(this.orderForm.get('deliveryInfo.delivery'));*/
    /*console.log(this.orderForm.controls['userInfo'].get('userEmail')?.errors);*/
    /*console.log(this.orderForm.controls['userInfo'].get('userPhone')?.invalid);*/

  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      userInfo: this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)]],
        userEmail: ['', [Validators.required, Validators.email]],
        userPhone: ['', [Validators.required, Validators.pattern(/^\+375(\s+)?(17|25|29|33|44)(\s+)?[0-9]{3}[0-9]{2}[0-9]{2}$/)]],
      }),
      deliveryInfo: this.fb.group({
        userAddress: ['', [Validators.required, Validators.pattern(/^[а-я\s.]+?\d+/i)]],
        delivery: '',
      }),
      paymentInfo: this.fb.group({
        payment: ''
      })
    });
  }

  get _userName() {
    return this.orderForm.controls['userInfo'].get('userName');
  }

  get _userEmail() {
    return this.orderForm.controls['userInfo'].get('userEmail');
  }

  get _userPhone() {
    return this.orderForm.controls['userInfo'].get('userPhone');
  }

  get _userAddress() {
    return this.orderForm.controls['deliveryInfo'].get('userAddress');
  }

  get _delivery() {
    return this.orderForm.controls['deliveryInfo'].get('delivery');
  }

  get _payment() {
    return this.orderForm.controls['paymentInfo'].get('payment');
  }

  get _incorrectFields() {
    return document.getElementsByClassName('order-customer-info-validation').length;
  }

  getDisabled() {
    return ( (!this._userName?.value.length || !this._userEmail?.value.length || !this._userPhone?.value.length
      || !this._payment?.value.length || !this._delivery?.value.length) ||
      (this._delivery?.value === 'курьер' && (!this._userName?.value.length || !this._userEmail?.value.length
        || !this._userPhone?.value.length || !this._userAddress?.value.length || !this._payment?.value.length)) ||
      (this._delivery?.value === 'самовывоз' && (!this._userName?.value.length || !this._userEmail?.value.length
        || !this._userPhone?.value.length || !this._payment?.value.length)) ||
      (this._incorrectFields > 0) );
  }

  ngOnInit(): void {
   /* this.paymentChecked = 'наличные';
    this.deliveryChecked = 'курьер';*/
    this.initOrderForm();


  /*  this.disable = ( (!this._userName?.value.length || !this._userEmail?.value.length || !this._userPhone?.value.length
      || !this._payment?.value.length || !this._delivery?.value.length) ||
      (this._delivery?.value === 'курьер' && (!this._userName?.value.length && !this._userEmail?.value.length
      && !this._userPhone?.value.length && !this._userAddress?.value.length && !this._payment?.value.length)) ||
      (this._delivery?.value === 'самовывоз' && (!this._userName?.value.length && !this._userEmail?.value.length
      && !this._userPhone?.value.length && !this._payment?.value.length)) ||
      (this._incorrectFields > 0) );*/



    /*this.deliveryChecked = Array.from(document.querySelectorAll('input[name="delivery"]:checked'))[0].value;
    this.paymentChecked = Array.from(document.querySelectorAll('input[name="payment"]:checked'))[0].value;*/
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (subscription) => {
      subscription.unsubscribe();
    });
  }

}
