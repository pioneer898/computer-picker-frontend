import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOptionComponent } from './selected-option.component';

describe('SelectedOptionComponent', () => {
  let component: SelectedOptionComponent;
  let fixture: ComponentFixture<SelectedOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedOptionComponent]
    });
    fixture = TestBed.createComponent(SelectedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
