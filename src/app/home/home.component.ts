import { Component, OnInit , Input} from '@angular/core';

import {CommonService} from '../shared/common.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: CommonService ) {

  }

  ngOnInit(): void {

  }


}
