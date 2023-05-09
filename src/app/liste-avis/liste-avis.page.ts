import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-liste-avis',
  templateUrl: './liste-avis.page.html',
  styleUrls: ['./liste-avis.page.scss'],
})
export class ListeAvisPage {
  listAvis:any

  constructor(private http: HttpClient, private router: Router, private activeRoute : ActivatedRoute) {
    // Permet de récupérer les paramètres envoyés à cette page (là les commentaires de l'atelier)
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.listAvis = this.router.getCurrentNavigation()?.extras.state
        this.listAvis = this.listAvis.param1
      }
    })
  }
}
