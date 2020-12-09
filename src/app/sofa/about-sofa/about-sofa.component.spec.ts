import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSofaComponent } from './about-sofa.component';

describe('AboutSofaComponent', () => {
  let component: AboutSofaComponent;
  let fixture: ComponentFixture<AboutSofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSofaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
