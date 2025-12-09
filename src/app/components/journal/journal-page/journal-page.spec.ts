import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalPage } from './journal-page';

describe('JournalPageComponent', () => {
  let component: JournalPage;
  let fixture: ComponentFixture<JournalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JournalPage],
    });
    fixture = TestBed.createComponent(JournalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
