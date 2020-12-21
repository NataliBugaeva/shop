import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {
  @Input() item: Product;

  public itemName: string;
  public itemType: string;
  public itemImg: string;

  constructor() { }

  ngOnInit(): void {
    this.itemName = this.item.info.info.find( item => item.name === 'Наименование').value;
    this.itemType = this.item.info.info.find( item => item.name === 'Тип').value;
    this.itemImg = this.item.info.images.find( item => item.name === 'imgSmall').value;
  }

}
