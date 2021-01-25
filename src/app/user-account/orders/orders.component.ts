import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/authentication.service';
import {CommonService} from '../../shared/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit, OnDestroy{

  public userId: string;
  public subscriptions: Subscription[] = [];
  public orders: Array<{info: any, products: any}>;
  public orderProducts: [];

  constructor(public authenticationService: AuthenticationService,
              public commonService: CommonService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.userData.subscribe(res => {
        this.userId = res?.uid;
        console.log(this.userId);

        this.subscriptions.push(
          this.commonService.getOrders(this.userId).subscribe(res => {
            this.orders = res[0].info.orders.map( item => ({
              orderInfo: {date: item.orderInfo.date, totalCost: item.orderInfo.totalCost},
              orderProducts: item.orderProducts})).map(item => ({info: item.orderInfo, products: item.orderProducts.map(i => i.info)}))
              .map(i => ({
              info: i.info,
              products: i.products.map(i => ({
                image: i.images.find(i => {
                  if(i.name === 'imgSmall') return i.value;
                }),
                name: i.info.find(i => i.name === 'Наименование'),
                type: i.info.find(i => i.name === 'Тип'),
                cost: i.info.find(i => i.name === 'Цена'),
                amount: i.info.find(i => i.name === 'Количество')
                /*info: i.info.filter(i => {
                  if(i.name === 'Тип' || i.name === 'Наименование' || i.name === 'Цена' || i.name === 'Количество') return i;
                })*/
              }))
            }))

            console.log(this.orders);
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}
