import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaireCommentairePage } from './formulaire-commentaire.page';

const routes: Routes = [
  {
    path: '',
    component: FormulaireCommentairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulaireCommentairePageRoutingModule {}
