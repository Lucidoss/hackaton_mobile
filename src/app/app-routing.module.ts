import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailsPage } from './details/details.page';
import { HomePage } from './home/home.page';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'hackathon',
            loadChildren: () => import('./hackathon/hackathon.module').then((m) => m.HackathonPageModule),
          },
          {
            path: 'details',
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsPageModule),
          },
          {
            path: 'atelier',
            loadChildren: () => import('./atelier/atelier.module').then((m) => m.AtelierPageModule),
          },
          {
            path: 'formulaire-inscription-atelier',
            loadChildren: () => import('./formulaire-inscription-atelier/formulaire-inscription-atelier.module').then((m) => m.FormulaireInscriptionAtelierPageModule),
          },
          {
            path: 'formulaire-commentaire',
            loadChildren: () => import('./formulaire-commentaire/formulaire-commentaire.module').then((m) => m.FormulaireCommentairePageModule),
          },
          {
            path: 'liste-avis',
            loadChildren: () => import('./liste-avis/liste-avis.module').then((m) => m.ListeAvisPageModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
