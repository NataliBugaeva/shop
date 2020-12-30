import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'app-comparison-item',
  templateUrl: './comparison-item.component.html',
  styleUrls: ['./comparison-item.component.css']
})
export class ComparisonItemComponent implements OnInit {

  @Input() item: {name: string, value: any}[];

  public itemFirst: {name: string, value: any}[];

  constructor() { }

  ngOnInit(): void {
  }

}
