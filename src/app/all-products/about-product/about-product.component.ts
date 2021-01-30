import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from '../../shared/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../model';
import {AuthenticationService} from '../../shared/authentication.service';

import {take} from 'rxjs/operators';

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

  public amount: number;
  public comparison = false;
  public switch = true;
  public subscriptions: Subscription[] = [];

  // это я получаю обьект comparison из LS
  public productsFromComparison: any;

  // это высчитываем количество продуктов в сравнении
  public amountInComparison: number;

  // для контроля перехода на страницу сравнения
  public rout: string;

  // это почта пользователя, который сейчас вошел на сайт
  public email: string;

  public arrProducts: Product[];
  //это id самого документа конкретного пользователя
  public docId: string;
  public userInfo: any;
  public userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              public authenticationService: AuthenticationService) { }

  // увеличиваем количество товара
  enlargeAmount(): void {
    /*this.amount = this.amount + 1;*/
    this.amount += 1;
    console.log(this.amount);
  }

  // уменьшаем количество товара
  decreaseAmount(): void {
    /*this.amount === 1 ? this.amount = 1 : this.amount = this.amount - 1;*/
    this.amount === 1 ? this.amount = 1 : this.amount -= 1;
    console.log(this.amount);
  }

  // переключаемся с отзывов на характеристики
  changeSwitch(): void {
    this.switch = !this.switch;
  }

// добавить в сравнение
  addToComparison(): void {
    console.log(this.chosenProduct);
    if (!localStorage.getItem('comparison')) {
      localStorage.setItem('comparison', JSON.stringify({
        sofas: [],
        chairs: [],
        tables: []
      }));
    }
    this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
    console.log(this.productsFromComparison);
    if ((!this.productsFromComparison[this.path].some( item => item.id === this.chosenProduct.id)) &&
      (this.productsFromComparison[this.path].length <= 2)) {
        console.log(this.chosenProduct);
        this.productsFromComparison[this.path].push(this.chosenProduct);
        this.amountInComparison = this.productsFromComparison[this.path].length;
        localStorage.setItem('comparison', JSON.stringify(this.productsFromComparison));
        this.comparison = !this.comparison;
        console.log(this.amountInComparison);
      } else {
      alert('количество продуктов не больше трех');
    }
  }

  // удалить продукт из сравнения
  removeFromComparison(): void {
    console.log(this.productsFromComparison);
    this.productsFromComparison[this.path] = this.productsFromComparison[this.path].filter(item => item.id !== this.chosenProduct.id);
    this.amountInComparison = this.productsFromComparison[this.path].length;
    console.log(this.amountInComparison);
    localStorage.setItem('comparison', JSON.stringify(this.productsFromComparison));
  }

  // Переход на страницу сравнения
  goToComparison(): void {
    localStorage.setItem('lastPath', JSON.stringify(this.path));
    if (this.amountInComparison < 2) {
      alert('необходимо как минимум два продукта для сравнения');
    } else {
      this.rout = '/comparison';
      this.router.navigateByUrl(this.rout);
    }
  }

  addToBasket(): void {
    this.subscriptions.push(
      this.commonService.getUser(this.userId).pipe(take(1)).subscribe(res => {
        this.arrProducts = res[0].info.basket;
        this.docId = res[0].id;
        let amount = 0;
        if (this.arrProducts.length && this.arrProducts.some(item => item.id === this.productId)) {
          amount = this.arrProducts.find(i => i.id === this.chosenProduct.id).info.info
            .find(i => i.name === 'Количество').value;
        }
        let arrProductsNew = this.arrProducts.filter(i => i.id !== this.chosenProduct.id);
        let product = JSON.parse(JSON.stringify(this.chosenProduct));
        product.info.info.push({name: 'Количество', value: amount + this.amount});
        arrProductsNew.push(product);
        console.log(arrProductsNew);
        this.commonService.addToUserBasket(this.docId, arrProductsNew)
          .then( () => {
            return;
          });
      })
    );
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.email = res?.email;
        this.userId = res?.uid;
        console.log(this.email);
      })
    );

    // выцепили id и category из урла (это наши параметры)
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.path = this.activatedRoute.snapshot.paramMap.get('category');
    this.amount = 1;

    this.subscriptions.push(
      this.commonService.getProductId(this.path, this.productId).subscribe( (result: Product) => {
        this.chosenProduct = result;
        console.log(this.chosenProduct);
        this.chosenProductInfoToShow = result.info.info;
        this.chosenProductName = this.chosenProductInfoToShow.find( item => item.name === 'Наименование').value;
        this.chosenProductType = this.chosenProductInfoToShow.find(item => item.name === 'Тип').value;
        this.chosenProductPrice = this.chosenProductInfoToShow.find(item => item.name === 'Цена').value;
        this.chosenProductImgLarge = result.info.images.find(item => item.name === 'imgLarge').value;
        this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
        this.comparison = this.productsFromComparison[this.path].some(item => item.id === this.chosenProduct.id);
        this.amountInComparison = this.productsFromComparison[this.path].length;
        /*console.log(this.amountInComparison);*/
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }
}
