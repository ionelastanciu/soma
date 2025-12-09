import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingsPage } from './readings-page';

describe('ReadingsPageComponent', () => {
  let component: ReadingsPage;
  let fixture: ComponentFixture<ReadingsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReadingsPage],
    });
    fixture = TestBed.createComponent(ReadingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
