import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllPostPage } from './get-all-post.page';

describe('GetAllPostPage', () => {
  let component: GetAllPostPage;
  let fixture: ComponentFixture<GetAllPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetAllPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
