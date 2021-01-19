import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model';

import {AuthenticationService} from '../shared/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  public basketProducts: Product[];
  public totalCost: number;

  public email: string;

  public subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.email = res?.email;
      })
    );

    this.basketProducts = JSON.parse(localStorage.getItem('productsInBasket'));
    if (this.basketProducts?.length) {
      this.totalCost = this.basketProducts.map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
        item.info.info.find(i => i.name === 'Количество').value )
        .reduce( (sum: number, item: number) => sum + item);
      console.log(this.totalCost);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
