import { CheckInPage } from './check-in-page';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CheckInPageComponent', () => {
  let component: CheckInPage;
  let fixture: ComponentFixture<CheckInPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckInPage],
    });
    fixture = TestBed.createComponent(CheckInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
