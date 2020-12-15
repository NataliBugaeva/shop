import { Component, OnInit, OnDestroy } from '@angular/core';

import {CommonService} from '../../shared/common.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Sofa} from '../../../model';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent implements OnInit, OnDestroy {

  public productId: string;
  public path: string;
  public chosenProduct: any;
  public amount: number = 1;
  public comparison: boolean = false;
  public switch: boolean = true;
  public subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  // увеличиваем количество товара
  enlargeAmount = (): void => {
    this.amount = this.amount + 1;
  }

  // уменьшаем количество товара
  decreaseAmount = (): void => {
    this.amount === 1 ? this.amount = 1 : this.amount = this.amount - 1;
  }

  // переключаемся с отзывов на характеристики
  changeSwitch = (): void => {
    this.switch = !this.switch;
  }

  ngOnInit(): void {
    // выцепили id из урла
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    let whitchProduct = this.activatedRoute.snapshot.routeConfig?.path;
    whitchProduct ? whitchProduct = whitchProduct[0] : console.log('ошибка');

    switch (whitchProduct) {
      case 's':
        this.path = 'sofas';
        break;
      case 't':
        this.path = 'tables';
        break;
      case 'c':
        this.path = 'chairs';
        break;
      default:
        alert('Чет не то');
    }

    this.subscriptions.push(
      this.commonService.getProductId(this.path, this.productId).subscribe( (result: any) => {
        this.chosenProduct = result;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
