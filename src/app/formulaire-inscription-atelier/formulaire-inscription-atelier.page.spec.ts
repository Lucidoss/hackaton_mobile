import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormulaireInscriptionAtelierPage } from './formulaire-inscription-atelier.page';

describe('FormulaireInscriptionAtelierPage', () => {
  let component: FormulaireInscriptionAtelierPage;
  let fixture: ComponentFixture<FormulaireInscriptionAtelierPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireInscriptionAtelierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireInscriptionAtelierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
