import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item: Product;

  public productSmallImg: string;
  public productName: string;
  public productType: string;
  public productPrice: number;

  constructor() { }

  ngOnInit(): void {
    this.productSmallImg = this.item.info.images.find(item => item.name === 'imgSmall').value;
    this.productName = this.item.info.info.find(item => item.name === 'Наименование').value;
    this.productType = this.item.info.info.find(item => item.name === 'Тип').value;
    this.productPrice = this.item.info.info.find(item => item.name === 'Цена').value;
  }


}
