import { Component, OnInit } from '@angular/core';
import {Product} from '../../model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basketProducts: Product[];

  constructor() { }

  ngOnInit(): void {
    this.basketProducts = JSON.parse(localStorage.getItem('productsInBasket'));
    console.log(this.basketProducts);
  }

}
