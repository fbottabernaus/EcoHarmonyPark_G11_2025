import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarInscripcionComponent } from './visualizar-inscripcion.component';

describe('VisualizarInscripcionComponent', () => {
  let component: VisualizarInscripcionComponent;
  let fixture: ComponentFixture<VisualizarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarInscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
