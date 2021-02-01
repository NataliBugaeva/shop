import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Input} from '@angular/core';
import {Product} from '../../../model';

@Component({
  selector: 'app-comparison-item',
  templateUrl: './comparison-item.component.html',
  styleUrls: ['./comparison-item.component.css']
})
export class ComparisonItemComponent implements OnInit {

  @Input() item: { name: string, value: any }[];
  @Input() info: Array<{ name: string, value: any }[]>;

  @Output() infoChange = new EventEmitter<any[]>();

  public productId: string;
  public path: string;
  // продукты, которые находятся в LS для сравнения из всех категорий
  public productsFromComparison: any;
  // продукты, которые отображаем в сравнении
  public productsToCompare: Product[];

  constructor() {
  }

  removeItem(): void {
    this.productId = this.item.find(i => i.name === 'id')?.value;
    this.path = JSON.parse(localStorage.getItem('lastPath'));
    this.productsFromComparison = JSON.parse(localStorage.getItem('comparison'));
    // продукты определенной категории для сравнения без продукта, который мы собираемся удалить
    this.productsToCompare = this.productsFromComparison[this.path].filter((item: { id: string, info: {} }) => item.id !== this.productId);
    this.productsFromComparison[this.path] = this.productsToCompare;
    localStorage.setItem('comparison', JSON.stringify(this.productsFromComparison));
    this.info = this.productsToCompare.map(item => {
      const img = {name: 'Image', value: item.info.images.find(i => i.name === 'imgSmall').value};
      const info = item.info.info;
      const id = {name: 'id', value: item.id};
      info.unshift(img);
      info.push(id);
      return info;
    });
    this.infoChange.emit(this.info);
  }

  ngOnInit(): void {
  }

}
