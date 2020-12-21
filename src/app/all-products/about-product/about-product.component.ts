import { Component, OnInit, OnDestroy } from '@angular/core';

import {CommonService} from '../../shared/common.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../model';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent implements OnInit, OnDestroy {

  public productId: string;
  public path: string;
  public chosenProduct: Product;
  public chosenProductInfoToShow: any[];
  public chosenProductName: string;
  public chosenProductType: string;
  public chosenProductPrice: string;
  public chosenProductImgLarge: string;

  public amount = 1;
  public comparison = false;
  public switch = true;
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

  // добавляем в LocalStorage массив с продуктами, которые будут отображаться в корзине
  addToLSProducts(): void {
    let arrProducts: Product[] = [];
    if (!JSON.parse(localStorage.getItem('productsInBasket'))) {
      arrProducts.push(this.chosenProduct);
      localStorage.setItem('productsInBasket', JSON.stringify(arrProducts));
    } else {
      arrProducts = JSON.parse(localStorage.getItem('productsInBasket'));
      arrProducts.push(this.chosenProduct);
      localStorage.setItem('productsInBasket', JSON.stringify(arrProducts));
    }
  }

  // Добавить в localStorage массив с id-шками продуктов, которые будут в корзине, и массив с самими продуктами
  addToBasket(): void {
    let arrId: string[] = [];
    if (!JSON.parse(localStorage.getItem('productsId'))) {
      arrId.push(this.productId);
      localStorage.setItem('productsId', JSON.stringify(arrId));
      this.addToLSProducts();
    } else if (!(JSON.parse(localStorage.getItem('productsId')).some( (item: string) => item === this.productId) )) {
      arrId = JSON.parse(localStorage.getItem('productsId'));
      arrId.push(this.productId);
      localStorage.setItem('productsId', JSON.stringify(arrId));
      this.addToLSProducts();
    } else {
      alert('Данный товар уже в корзине!');
      console.log(JSON.parse(localStorage.getItem('productsId')));
      console.log(JSON.parse(localStorage.getItem('productsInBasket')));
    }
  }

  ngOnInit(): void {
    // выцепили id и category из урла (это наши параметры)
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.path = this.activatedRoute.snapshot.paramMap.get('category');

    this.subscriptions.push(this.commonService.getProductId(this.path, this.productId).subscribe( (result: Product) => {
        this.chosenProduct = result;
        this.chosenProductInfoToShow = result.info.info;
        this.chosenProductName = this.chosenProductInfoToShow.find( item => item.name === 'Наименование').value;
        this.chosenProductType = this.chosenProductInfoToShow.find(item => item.name === 'Тип').value;
        this.chosenProductPrice = this.chosenProductInfoToShow.find(item => item.name === 'Цена').value;
        this.chosenProductImgLarge = result.info.images.find(item => item.name === 'imgLarge').value;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
