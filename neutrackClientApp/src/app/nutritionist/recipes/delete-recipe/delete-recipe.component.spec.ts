import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipeComponent } from './delete-recipe.component';

describe('DeleteRecipeComponent', () => {
  let component: DeleteRecipeComponent;
  let fixture: ComponentFixture<DeleteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
