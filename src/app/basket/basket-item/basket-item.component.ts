import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../../model';
import firebase from 'firebase';
import functions = firebase.functions;
import {CommonService} from '../../shared/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit, OnDestroy {
  @Input() total: number;
  @Input() productsInBasket: Product[];
  @Input() item: Product;
  @Input() email: string;
  @Input() userId: string;
  @Input() docId: string;

  @Output() totalChange = new EventEmitter<number>();
  @Output() productsInBasketChange = new EventEmitter<Product[]>();

  public itemName: string;
  public itemType: string;
  public itemImg: string;
  public itemPrice: number;
  public itemId: string;
  public itemAmount: number;
  public productsInBasketID: string[];
  public subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,
              private commonService: CommonService) {
  }

  removeFromBasket(): void {
    this.subscriptions.push(
      this.commonService.getUser(this.userId).subscribe(res => {
          this.productsInBasket = res[0].info.basket.filter((i: Product) => i.id !== this.itemId);
          this.productsInBasketChange.emit(this.productsInBasket);
          this.commonService.addToUserBasket(this.docId, this.productsInBasket)
            .then(() => {
              console.log('продукты обновлены в корзине после удаления');
            });
        }
      )
    );
  }

  // функция меняет количество товара в корзине при нажатии на плюс или минус
  changeAmountInBasket(amount: number): void {
    this.subscriptions.push(
      this.commonService.getUser(this.userId).subscribe(res => {
          this.productsInBasket = res[0].info.basket;
          this.productsInBasket.map(item => {
            if (item.id === this.itemId) {
              item.info.info.map(i => {
                if (i.name === 'Amount') {
                  i.value = amount;
                }
              });
            }
          });
          this.commonService.addToUserBasket(this.docId, this.productsInBasket)
            .then(() => {
              console.log('продукты обновлены в корзине после увеличения количества товаров');
            });
        }
      )
    );
  }

  // фунция пересчитывает общую стоимость всех товаров в корзине в случае изменения количества товаров
  changeTotalCost(): void {
    this.subscriptions.push(
      this.commonService.getUser(this.userId).subscribe(res => {
        this.total = res[0].info.basket
          .map((item: Product) => item.info.info.find(i => i.name === 'Price').value *
            item.info.info.find(i => i.name === 'Amount').value)
          .reduce((sum: number, item: number) => sum + item);
        this.totalChange.emit(this.total);
        this.cdr.detectChanges();
      })
    );
  }

  // увеличиваем количество товара (при нажатии на плюс)
  enlargeAmount = (): void => {
    this.itemAmount += 1;
    this.changeAmountInBasket(this.itemAmount);
    this.changeTotalCost();
  };

  // уменьшаем количество товара (при нажатии на минус)
  decreaseAmount = (): void => {
    this.itemAmount === 1 ? this.itemAmount = 1 : this.itemAmount -= 1;
    this.changeAmountInBasket(this.itemAmount);
    this.changeTotalCost();
  };

  ngOnInit(): void {
    this.itemName = this.item.info.info.find(item => item.name === 'Name').value;
    this.itemType = this.item.info.info.find(item => item.name === 'Type').value;
    this.itemImg = this.item.info.images.find(item => item.name === 'imgSmall').value;
    this.itemPrice = this.item.info.info.find(item => item.name === 'Price').value;
    this.itemAmount = Number(this.item.info.info.find(item => item.name === 'Amount').value);
    this.itemId = this.item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
