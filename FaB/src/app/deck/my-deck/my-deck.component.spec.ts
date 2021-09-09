import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeckComponent } from './my-deck.component';

describe('MyDeckComponent', () => {
  let component: MyDeckComponent;
  let fixture: ComponentFixture<MyDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
