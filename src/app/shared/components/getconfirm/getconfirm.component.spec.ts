import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetconfirmComponent } from './getconfirm.component';

describe('GetconfirmComponent', () => {
  let component: GetconfirmComponent;
  let fixture: ComponentFixture<GetconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
