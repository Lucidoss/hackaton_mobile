import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulaireCommentairePageRoutingModule } from './formulaire-commentaire-routing.module';

import { FormulaireCommentairePage } from './formulaire-commentaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormulaireCommentairePageRoutingModule
  ],
  declarations: [FormulaireCommentairePage]
})
export class FormulaireCommentairePageModule {}
