import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model';

import {AuthenticationService} from '../shared/authentication.service';
import {Subscription} from 'rxjs';
import {CommonService} from '../shared/common.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public basketProducts: Product[];
  public totalCost: number;

  public email: string;
  //это Id не из документа в базе, а это id самого документа конкретного пользователя
  public userId: string;

  public subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.email = res?.email;
        console.log(this.email);

        this.subscriptions.push(
          this.commonService.getUser(this.email).subscribe(res => {
            this.basketProducts = res[0].info.basket;
            this.userId = res[0].id;
            if (this.basketProducts?.length) {
              this.totalCost = this.basketProducts.map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
                item.info.info.find(i => i.name === 'Количество').value )
                .reduce( (sum: number, item: number) => sum + item);
              console.log(this.totalCost);
              console.log(this.userId);
            }
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
