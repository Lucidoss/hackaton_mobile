import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulaireInscriptionAtelierPageRoutingModule } from './formulaire-inscription-atelier-routing.module';

import { FormulaireInscriptionAtelierPage } from './formulaire-inscription-atelier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormulaireInscriptionAtelierPageRoutingModule
  ],
  declarations: [FormulaireInscriptionAtelierPage]
})
export class FormulaireInscriptionAtelierPageModule {}
