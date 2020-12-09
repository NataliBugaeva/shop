import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChairComponent } from './item-chair.component';

describe('ItemChairComponent', () => {
  let component: ItemChairComponent;
  let fixture: ComponentFixture<ItemChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemChairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
