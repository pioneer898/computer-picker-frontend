import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentOptionComponent } from './component-option.component';

describe('ComponentOptionComponent', () => {
  let component: ComponentOptionComponent;
  let fixture: ComponentFixture<ComponentOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentOptionComponent]
    });
    fixture = TestBed.createComponent(ComponentOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
