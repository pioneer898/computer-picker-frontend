import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigComponentComponent } from './config-component.component';

describe('ConfigComponentComponent', () => {
  let component: ConfigComponentComponent;
  let fixture: ComponentFixture<ConfigComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigComponentComponent]
    });
    fixture = TestBed.createComponent(ConfigComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
