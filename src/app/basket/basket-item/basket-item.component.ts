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
  public productsInBasketID: string[];

  constructor(private cdr: ChangeDetectorRef) { }

  removeFromBasket(): void {
    this.productsInBasket = (JSON.parse(localStorage.getItem('productsInBasket'))).filter((i: Product) => i.id !== this.itemId);
   /* this.productsInBasket = this.productsInBasket.filter((i: Product) => i.id !== this.itemId);*/
    localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
    this.productsInBasketChange.emit(this.productsInBasket);
  }

  // функция меняет количество товара в корзине при нажатии на плюс или минус
  changeAmountInBasket(amount: number): void {
    this.productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
    this.productsInBasket.map(item => {
      if (item.id === this.itemId) {
        item.info.info.map(i => {
          if (i.name === 'Количество') {
            i.value = amount;
          }
        });
      }
    });
    localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
    console.log(this.productsInBasket);
  }

  // фунция пересчитывает общую стоимость всех товаров в корзине в случае изменения количества товаров
  changeTotalCost(): void {
    this.total = JSON.parse(localStorage.getItem('productsInBasket'))
      .map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
        item.info.info.find(i => i.name === 'Количество').value )
      .reduce( (sum: number, item: number) => sum + item);
    this.totalChange.emit(this.total);
    this.cdr.detectChanges();
    console.log(this.total);
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

}
