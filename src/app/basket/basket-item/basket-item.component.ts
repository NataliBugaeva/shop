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
              private commonService: CommonService) { }

  removeFromBasket(): void {
    this.subscriptions.push(
      this.commonService.getUser(this.email).subscribe(res => {
        this.productsInBasket = res[0].info.basket.filter((i: Product) => i.id !== this.itemId);
        this.productsInBasketChange.emit(this.productsInBasket);
        this.commonService.addToUserBasket(this.userId, this.productsInBasket)
          .then( () => {
            console.log('продукты обновлены в корзине после удаления');
          });
        }
      )
    );
  }

  // функция меняет количество товара в корзине при нажатии на плюс или минус
  changeAmountInBasket(amount: number): void {
    this.subscriptions.push(
      this.commonService.getUser(this.email).subscribe( res => {
        this.productsInBasket = res[0].info.basket;
        this.productsInBasket.map(item => {
          if (item.id === this.itemId) {
            item.info.info.map(i => {
              if (i.name === 'Количество') {
                i.value = amount;
              }
            });
          }
        });
        this.commonService.addToUserBasket(this.userId, this.productsInBasket)
          .then( () => {
            console.log('продукты обновлены в корзине после увеличения количества товаров');
            console.log(this.productsInBasket);
          });
        }
      )
    );
  }

  // фунция пересчитывает общую стоимость всех товаров в корзине в случае изменения количества товаров
  changeTotalCost(): void {
    this.subscriptions.push(
      this.commonService.getUser(this.email).subscribe(res => {
        this.total = res[0].info.basket
          .map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
            item.info.info.find(i => i.name === 'Количество').value )
          .reduce( (sum: number, item: number) => sum + item);
        this.totalChange.emit(this.total);
        this.cdr.detectChanges();
        console.log(this.total);
      })
    );
  }

  // увеличиваем количество товара (при нажатии на плюс)
  enlargeAmount = (): void => {
    this.itemAmount += 1;
    this.changeAmountInBasket(this.itemAmount);
    this.changeTotalCost();
  }

  // уменьшаем количество товара (при нажатии на минус)
  decreaseAmount = (): void => {
    this.itemAmount === 1 ? this.itemAmount = 1 : this.itemAmount -= 1;
    this.changeAmountInBasket(this.itemAmount);
    this.changeTotalCost();
  }

  ngOnInit(): void {
    this.itemName = this.item.info.info.find( item => item.name === 'Наименование').value;
    this.itemType = this.item.info.info.find( item => item.name === 'Тип').value;
    this.itemImg = this.item.info.images.find( item => item.name === 'imgSmall').value;
    this.itemPrice = this.item.info.info.find( item => item.name === 'Цена').value;
    this.itemAmount = Number(this.item.info.info.find( item => item.name === 'Количество').value);
    this.itemId = this.item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
