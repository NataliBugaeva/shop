import {Component, Input, OnInit} from '@angular/core';

import {Sofa} from '../../model';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  // @ts-ignore
  /*@Input() item: {id: string, info: {name: string, type: string, length: number, mechanism: string,
                  bedLength: number, bedWidth: number, material: string, comments: [],
                  imgLarge: string, imgSmall: string, price: number}} = {};*/

  @Input() item: Sofa;

  constructor() {

  }

  ngOnInit(): void {
  }

}
