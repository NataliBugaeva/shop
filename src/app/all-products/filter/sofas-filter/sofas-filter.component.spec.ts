import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofasFilterComponent } from './sofas-filter.component';

describe('SofasFilterComponent', () => {
  let component: SofasFilterComponent;
  let fixture: ComponentFixture<SofasFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofasFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SofasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
