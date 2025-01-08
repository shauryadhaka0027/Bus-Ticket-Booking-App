import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBusComponent } from './show-bus.component';

describe('ShowBusComponent', () => {
  let component: ShowBusComponent;
  let fixture: ComponentFixture<ShowBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
