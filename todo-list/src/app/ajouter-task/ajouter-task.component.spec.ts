import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTaskComponent } from './ajouter-task.component';

describe('AjouterTaskComponent', () => {
  let component: AjouterTaskComponent;
  let fixture: ComponentFixture<AjouterTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
