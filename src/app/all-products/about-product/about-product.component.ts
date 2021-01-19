import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from '../../shared/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../model';
import {AuthenticationService} from '../../shared/authentication.service';

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

  public docId: string;
  // это я получаю обьект comparison из LS
  public productsFromComparison: any;

  // это высчитываем количество продуктов в сравнении
  public amountInComparison: number;

  // для контроля перехода на страницу сравнения
  public rout: string;

  // это почта пользователя, который сейчас вошел на сайт
  public email: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private authenticationService: AuthenticationService) { }

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
    if (!localStorage.getItem('comparison')) {
      localStorage.setItem('comparison', JSON.stringify({
        sofas: [],
        chairs: [],
        tables: []
      }));
    }
    this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
    if ((!this.productsFromComparison[this.path].some( item => item.id === this.chosenProduct.id)) &&
      (this.productsFromComparison[this.path].length <= 2)) {
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

  // Добавляем в LS массив с продуктами, которые будут в корзине
 /* addToBasket(): void {
    let bbb = this.commonService.getAllUsers().subscribe(res => console.log(res));
    let arrProducts: Product[] = [];
    if (JSON.parse(localStorage.getItem('productsInBasket'))) {
      arrProducts = JSON.parse(localStorage.getItem('productsInBasket'));
      if (arrProducts.some(item => item.id === this.productId)) {
        alert('Данный товар уже в корзине!');
        return;
      }
    }
    this.chosenProduct.info.info.push({name: 'Количество', value: this.amount});
    arrProducts.push(this.chosenProduct);
    localStorage.setItem('productsInBasket', JSON.stringify(arrProducts));
  }*/

  addToBasket(): void {

    this.subscriptions.push(
      this.commonService.getUser(this.email).subscribe(res => {
        let arrProducts = res[0].info.basket;
        let userId = res[0].id;
        let userInfo = res[0].info;
        console.log(arrProducts, userId, userInfo);
        if (arrProducts.length && arrProducts.some(item => item.id === this.productId)) {
            alert('Данный товар уже в корзине!');
            return;
        }
        this.chosenProduct.info.info.push({name: 'Количество', value: this.amount});
        arrProducts.push(this.chosenProduct);
        userInfo.basket = arrProducts;
        console.log(userInfo);
        this.commonService.addToUserBasket(userId, userInfo);
      })
    );
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.authenticationService.user().subscribe(res => {
        this.email = res?.email;
        console.log(this.email);
      })
    );

    // выцепили id и category из урла (это наши параметры)
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.path = this.activatedRoute.snapshot.paramMap.get('category');
    this.amount = 1;

    this.subscriptions.push(this.commonService.getProductId(this.path, this.productId).subscribe( (result: Product) => {
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
        console.log(this.amountInComparison);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    });
  }

}
