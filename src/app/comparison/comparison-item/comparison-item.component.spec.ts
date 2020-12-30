import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonItemComponent } from './comparison-item.component';

describe('ComparisonItemComponent', () => {
  let component: ComparisonItemComponent;
  let fixture: ComponentFixture<ComparisonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
