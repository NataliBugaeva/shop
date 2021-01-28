import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairsFilterComponent } from './chairs-filter.component';

describe('ChairsFilterComponent', () => {
  let component: ChairsFilterComponent;
  let fixture: ComponentFixture<ChairsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
