import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetincidentPage } from './getincident.page';

describe('GetincidentPage', () => {
  let component: GetincidentPage;
  let fixture: ComponentFixture<GetincidentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetincidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
