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
        delivery: ['', Validators.required]
      }),
      paymentInfo: this.fb.group({
        payment: ['', Validators.required]
      })
    });
  }

  changeK(): void {
    this.deliveryChecked = 'курьер';
    if (this.orderForm.controls['deliveryInfo'].get('userAddress')) {
      return;
    }
    this.orderForm.controls['deliveryInfo'].addControl('userAddress', this.fb.control('', [Validators.required, Validators.pattern(/^[а-я\s.]+?\d+/i)] ));
    console.log(this.orderForm);
  }

  changeS(): void {
    this.deliveryChecked = 'самовывоз';
    this.orderForm.controls['deliveryInfo'].removeControl('userAddress');
    console.log(this.orderForm);
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

  /*getDisabled() {
    console.log(this.orderForm.valid);
    return ( (!this._userName?.value.length || !this._userEmail?.value.length || !this._userPhone?.value.length
      || !this._payment?.value.length || !this._delivery?.value.length) ||
      (this._delivery?.value === 'курьер' && (!this._userName?.value.length || !this._userEmail?.value.length
        || !this._userPhone?.value.length || !this._userAddress?.value.length || !this._payment?.value.length)) ||
      (this._delivery?.value === 'самовывоз' && (!this._userName?.value.length || !this._userEmail?.value.length
        || !this._userPhone?.value.length || !this._payment?.value.length)) ||
      (this._incorrectFields > 0) );
  }*/

  ngOnInit(): void {
    this.initOrderForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (subscription) => {
      subscription.unsubscribe();
    });
  }

}
