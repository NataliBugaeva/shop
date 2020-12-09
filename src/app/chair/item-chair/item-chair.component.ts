import {Component, Input, OnInit} from '@angular/core';
import {Chair} from '../../../model';

@Component({
  selector: 'app-item-chair',
  templateUrl: './item-chair.component.html',
  styleUrls: ['./item-chair.component.css']
})
export class ItemChairComponent implements OnInit {

  @Input() item: Chair;

  constructor() { }

  ngOnInit(): void {
  }

}
