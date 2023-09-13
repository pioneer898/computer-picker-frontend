import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInfoDialogComponent } from './component-info-dialog.component';

describe('ComponentInfoDialogComponent', () => {
  let component: ComponentInfoDialogComponent;
  let fixture: ComponentFixture<ComponentInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentInfoDialogComponent]
    });
    fixture = TestBed.createComponent(ComponentInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
