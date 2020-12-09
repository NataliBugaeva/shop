import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../model';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {

  @Input() item: Table;

  constructor() { }

  ngOnInit(): void {

  }

}
