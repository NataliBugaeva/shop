import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutChairComponent } from './about-chair.component';

describe('AboutChairComponent', () => {
  let component: AboutChairComponent;
  let fixture: ComponentFixture<AboutChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutChairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
