import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaireInscriptionAtelierPage } from './formulaire-inscription-atelier.page';

const routes: Routes = [
  {
    path: '',
    component: FormulaireInscriptionAtelierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulaireInscriptionAtelierPageRoutingModule {}
