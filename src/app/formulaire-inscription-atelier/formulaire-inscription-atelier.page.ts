import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulaire-inscription-atelier',
  templateUrl: './formulaire-inscription-atelier.page.html',
  styleUrls: ['./formulaire-inscription-atelier.page.scss'],
})
export class FormulaireInscriptionAtelierPage {

  constructor(private router: Router) {

  }

  gotoPageAccueil() {
    this.router.navigate(['/home']);
  }

  gotoPageHackathon() {
    this.router.navigate(['/hackathon']);
  }

  inscrire() {

  }
}
