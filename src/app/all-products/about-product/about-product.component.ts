import {Component, OnInit, OnDestroy} from '@angular/core';
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
  //переменная для текста и видимости попапа
  public message: string;
  public popupVisibility = 'unvisible';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              public authenticationService: AuthenticationService) {
  }

  enlargeAmount(): void {
    this.amount += 1;
  }

  decreaseAmount(): void {
    this.amount === 1 ? this.amount = 1 : this.amount -= 1;
  }

  // переключаемся с отзывов на характеристики
  changeSwitch(): void {
    this.switch = !this.switch;
  }

  closePopup(): void {
    this.popupVisibility = 'unvisible';
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
    if ((!this.productsFromComparison[this.path].some(item => item.id === this.chosenProduct.id)) &&
      (this.productsFromComparison[this.path].length <= 2)) {
      this.productsFromComparison[this.path].push(this.chosenProduct);
      this.amountInComparison = this.productsFromComparison[this.path].length;
      localStorage.setItem('comparison', JSON.stringify(this.productsFromComparison));
      this.comparison = !this.comparison;
    } else {
      this.message = 'The number of products in comparison should\'t be more than three!';
      this.popupVisibility = 'popup';
    }
  }

  // удалить продукт из сравнения
  removeFromComparison(): void {
    this.productsFromComparison[this.path] = this.productsFromComparison[this.path].filter(item => item.id !== this.chosenProduct.id);
    this.amountInComparison = this.productsFromComparison[this.path].length;
    localStorage.setItem('comparison', JSON.stringify(this.productsFromComparison));
  }

  // Переход на страницу сравнения
  goToComparison(): void {
    localStorage.setItem('lastPath', JSON.stringify(this.path));
    if (this.amountInComparison < 2) {
      this.message = 'You need at least two products to compare!';
      this.popupVisibility = 'popup';
    } else {
      this.rout = 'comparison';
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
            .find(i => i.name === 'Amount').value;
        }
        let arrProductsNew = this.arrProducts.filter(i => i.id !== this.chosenProduct.id);
        let product = JSON.parse(JSON.stringify(this.chosenProduct));
        product.info.info.push({name: 'Amount', value: amount + this.amount});
        arrProductsNew.push(product);
        this.commonService.addToUserBasket(this.docId, arrProductsNew)
          .then(() => {
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
      })
    );

    // выцепили id и category из урла (это наши параметры)
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.path = this.activatedRoute.snapshot.paramMap.get('category');
    this.amount = 1;
    this.subscriptions.push(
      this.commonService.getProductId(this.path, this.productId).subscribe((result: Product) => {
        this.chosenProduct = result;
        this.chosenProductInfoToShow = result.info.info;
        this.chosenProductName = this.chosenProductInfoToShow.find(item => item.name === 'Name').value;
        this.chosenProductType = this.chosenProductInfoToShow.find(item => item.name === 'Type').value;
        this.chosenProductPrice = this.chosenProductInfoToShow.find(item => item.name === 'Price').value;
        this.chosenProductImgLarge = result.info.images.find(item => item.name === 'imgLarge').value;
        this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
        this.comparison = this.productsFromComparison[this.path].some(item => item.id === this.chosenProduct.id);
        this.amountInComparison = this.productsFromComparison[this.path].length;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
