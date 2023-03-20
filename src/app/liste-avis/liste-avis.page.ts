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
  ateliers: any

  constructor(private http: HttpClient, private router: Router, private activeRoute : ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.ateliers = this.router.getCurrentNavigation()?.extras.state
      }
    })
  }

  ionViewWillEnter() {
    this.http.get('http://127.0.0.1:8001/api/atelier/' + this.ateliers.param1 + '/commentaire')
      .subscribe((data) => {
        this.listAvis = data
    });
  }
}
