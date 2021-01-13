import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../model';
import firebase from 'firebase';
import functions = firebase.functions;

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {
  @Input() total: number;
  @Input() productsInBasket: Product[];
  @Input() item: Product;

  @Output() totalChange = new EventEmitter<number>();
  @Output() productsInBasketChange = new EventEmitter<Product[]>();

  public itemName: string;
  public itemType: string;
  public itemImg: string;
  public itemPrice: number;
  public itemId: string;
  public itemAmount: number;
  public productsInBasket: Product[];
  public productsInBasketID: string[];

  constructor(private cdr: ChangeDetectorRef) { }

  // удаляем товар из корзины
  removeFromBasket(): void {
    this.productsInBasketID = JSON.parse(localStorage.getItem('productsId'));
    this.productsInBasketID = this.productsInBasketID.filter((i: string) => i !== this.itemId);
    localStorage.setItem('productsId', JSON.stringify(this.productsInBasketID));
    this.productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
    this.productsInBasket = this.productsInBasket.filter((i: Product) => i.id !== this.itemId);
    localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
    this.productsInBasketChange.emit(this.productsInBasket);
    console.log(this.productsInBasket);
    console.log(this.productsInBasketID);
  }

  // меняем количество товара в корзине
  changeAmountInBasket(): void {
    this.productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
    this.productsInBasket = this.productsInBasket.filter( (i: Product) => i.id !== this.itemId);
    this.productsInBasket.push(this.item);
    localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
    console.log(this.productsInBasket);
  }

  // увеличиваем количество товара
  enlargeAmount = (): void => {
    this.itemAmount = this.itemAmount + 1;
    this.item.info.info.map( (i: {name: string, value: any}) => {
      if (i.name === 'Количество') {
        i.value = this.itemAmount;
      }
    });
    this.changeAmountInBasket();
    this.total = JSON.parse(localStorage.getItem('productsInBasket'))
    .map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
      item.info.info.find(i => i.name === 'Количество').value )
      .reduce( (sum: number, item: number) => sum + item);
    this.totalChange.emit(this.total);
    this.cdr.detectChanges();
    console.log(this.total);
  }

  // уменьшаем количество товара
  decreaseAmount = (): void => {
    this.itemAmount === 1 ? this.itemAmount = 1 : this.itemAmount = this.itemAmount - 1;
    this.item.info.info.map( (i: {name: string, value: any}) => {
      if (i.name === 'Количество') {
        i.value = this.itemAmount;
      }
    });
    this.changeAmountInBasket();
    this.total = JSON.parse(localStorage.getItem('productsInBasket'))
      .map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
        item.info.info.find(i => i.name === 'Количество').value )
      .reduce( (sum: number, item: number) => sum + item);
    this.totalChange.emit(this.total);
    console.log(this.total);
  }

  ngOnInit(): void {
    this.itemName = this.item.info.info.find( item => item.name === 'Наименование').value;
    this.itemType = this.item.info.info.find( item => item.name === 'Тип').value;
    this.itemImg = this.item.info.images.find( item => item.name === 'imgSmall').value;
    this.itemPrice = this.item.info.info.find( item => item.name === 'Цена').value;
    this.itemAmount = Number(this.item.info.info.find( item => item.name === 'Количество').value);
    this.itemId = this.item.id;
  }

}
