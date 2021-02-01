import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../shared/authentication.service';
import {CommonService} from '../../shared/common.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit, OnDestroy {

  public userId: string;
  public userInfo = {
    infoName: '',
    infoSurname: '',
    infoEmail: '',
    infoPhone: ''
  };
  public subscriptions: Subscription[] = [];

  constructor(public authenticationService: AuthenticationService,
              public commonService: CommonService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.userData.subscribe(res => {
        this.userId = res?.uid;
        this.subscriptions.push(
          this.commonService.getUser(this.userId).subscribe(res => {
            this.userInfo = res[0]?.info.info;
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
