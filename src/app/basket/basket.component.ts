import {Component, OnInit, ɵRender3ComponentRef} from '@angular/core';
import {Product} from '../../model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basketProducts: Product[];
  public totalCost: number;

  constructor() { }

  ngOnInit(): void {
    this.basketProducts = JSON.parse(localStorage.getItem('productsInBasket'));
    if (this.basketProducts?.length) {
      this.totalCost = this.basketProducts.map( (item: Product) => item.info.info.find(i => i.name === 'Цена').value *
        item.info.info.find(i => i.name === 'Количество').value )
        .reduce( (sum: number, item: number) => sum + item);
      console.log(this.totalCost);
    }
  }

}
