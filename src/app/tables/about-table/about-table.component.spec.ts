import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTableComponent } from './about-table.component';

describe('AboutTableComponent', () => {
  let component: AboutTableComponent;
  let fixture: ComponentFixture<AboutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
