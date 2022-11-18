import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
})
export class DetailsPage {

  hackathon:any

  constructor(private router: Router, private activeRoute : ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.hackathon = this.router.getCurrentNavigation().extras.state.param1
      }
    })
  }

}
