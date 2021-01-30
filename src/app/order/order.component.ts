import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../shared/authentication.service';
import {CommonService} from '../shared/common.service';
import {take} from 'rxjs/operators';
import {Product} from '../../model';
import {Router} from '@angular/router';

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

  public basketProducts: [];
  public basketDocId: string;
  public userId: string;
  public userInfo: {
    infoName: '',
    infoSurname: '',
    infoEmail: '',
    infoPhone: ''
  };

  public totalCost: number;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private commonService: CommonService,
              public router: Router) { }

  makeOrder(): void {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = day + '/' + month + '/' + year;

    let orderInfo = {
      customerName: this.orderForm.get('userInfo.userName').value,
      customerEmail: this.orderForm.get('userInfo.userEmail').value,
      customerPhone: this.orderForm.get('userInfo.userPhone').value,
      customerAddress: this.orderForm.get('deliveryInfo.userAddress')?.value || '-',
      delivery: this.orderForm.get('deliveryInfo.delivery').value,
      payment: this.orderForm.get('paymentInfo.payment').value,
      date: currentDate,
      totalCost: this.totalCost
    }

    this.subscriptions.push(
      this.commonService.getOrders(this.userId).pipe(take(1)).subscribe(res => {
        let orders = res[0].info.orders;
        let orderIndex = orders.length + 1;
        let docId = res[0].id;
        orders.push({
          orderIndex: orderIndex,
          orderInfo: orderInfo,
          orderProducts: this.basketProducts
        });
        this.commonService.addToOrders(docId, orders).then(() => console.log('добавили новый заказ в базу'));
        this.commonService.addToUserBasket(this.basketDocId, [])
          .then(() => console.log('корзина очищена'));
        this.orderForm.reset();
        let rout = '/thanks';
        this.router.navigateByUrl(rout);
      })
    )
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      userInfo: this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)]],
        userEmail: ['', [Validators.required, Validators.email]],
        userPhone: ['', [Validators.required, Validators.pattern(/^\+375(\s+)?(17|25|29|33|44)(\s+)?[0-9]{3}[0-9]{2}[0-9]{2}$/)]],
      }),
      deliveryInfo: this.fb.group({
        userAddress: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s.]+?\d+/i)]],
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
    const deliveryInfo: AbstractControl = this.orderForm.get('deliveryInfo');
    const userAddress: AbstractControl = this.fb.control('', [Validators.required, Validators.pattern(/^[а-я\s.]+?\d+/i)]);
    (<FormGroup>deliveryInfo).addControl('userAddress', userAddress);
    console.log(this.orderForm);
  }

  changeS(): void {
    this.deliveryChecked = 'самовывоз';
    const deliveryInfo: AbstractControl = this.orderForm.get('deliveryInfo');
    (<FormGroup>deliveryInfo).removeControl('userAddress')
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

  ngOnInit(): void {

    this.initOrderForm();

    this.subscriptions.push(
      this.authenticationService.userData.subscribe(res => {
        this.userId = res?.uid;
        this.subscriptions.push(
          this.commonService.getUser(this.userId).subscribe(res => {
            this.basketProducts = res[0].info.basket;
            this.basketDocId = res[0].id;
            this.userInfo = res[0].info.info;
            this.totalCost = this.basketProducts.map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
              item.info.info.find(i => i.name === 'Количество').value)
              .reduce( (sum: number, item: number) => sum + item);
            console.log(this.userInfo);
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (subscription) => {
      subscription.unsubscribe();
    });
  }

}
