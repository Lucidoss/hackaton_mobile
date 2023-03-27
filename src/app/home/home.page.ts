import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  gotoPageAccueil() {
    this.router.navigate(['/home']);
  }

  gotoPageHackathon() {
    this.router.navigate(['/hackathon']);
  }

  gotoPageFavoris() {
    this.router.navigate(['/favoris']);
  }
}
