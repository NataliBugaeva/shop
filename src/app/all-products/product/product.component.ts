import {Component, Input, OnInit} from '@angular/core';

import {Sofa, Table, Chair} from '../../../model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() item: any[];
  @Input() path: string;

  /*@Input() itemSofa: Sofa[];
  @Input() itemTable: Table[];
  @Input() itemChair: Chair[];

  @Input() pagedSofas: Sofa[];
  @Input() pagedChairs: Chair[];
  @Input() pagedTables: Table[];*/

  constructor() { }

  ngOnInit(): void {
  }

}
