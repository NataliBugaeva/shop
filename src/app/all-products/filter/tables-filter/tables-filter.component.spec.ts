import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesFilterComponent } from './tables-filter.component';

describe('TablesFilterComponent', () => {
  let component: TablesFilterComponent;
  let fixture: ComponentFixture<TablesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
