import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropComponent } from './drag-drop.component';

describe('DragDropComponent', () => {
  let component: DragDropComponent;
  let fixture: ComponentFixture<DragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DragDropComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dragdrop'`, () => {
    const fixture = TestBed.createComponent(DragDropComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dragdrop');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(DragDropComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to dragdrop!');
  })
});
