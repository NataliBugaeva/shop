import { Component } from '@angular/core';

import {CommonService} from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  switch = true;

  constructor(public service: CommonService) {

  }

  switchSearch = () => {
    this.switch = !this.switch;
  }

}
