import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMedicalletterComponent } from './generate-medicalletter.component';

describe('GenerateMedicalletterComponent', () => {
  let component: GenerateMedicalletterComponent;
  let fixture: ComponentFixture<GenerateMedicalletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMedicalletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMedicalletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
