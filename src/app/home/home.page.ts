import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  // Permet d'aller sur la page correspondant à la route /home
  gotoPageAccueil() {
    this.router.navigate(['/home']);
  }

  // Permet d'aller sur la page correspondant à la route /hackathon
  gotoPageHackathon() {
    this.router.navigate(['/hackathon']);
  }

  // Permet d'aller sur la page correspondant à la route /favoris
  gotoPageFavoris() {
    this.router.navigate(['/favoris']);
  }
}
