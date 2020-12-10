import {Component, Input, OnInit} from '@angular/core';

import {Sofa} from '../../model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Sofa;

  constructor() {}

  ngOnInit(): void {}

}
