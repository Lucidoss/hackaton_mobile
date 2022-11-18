import { Component } from '@angular/core';
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
        this.hackathon = this.router.getCurrentNavigation()?.extras.state
      }
    })
  }

  jsontoDate(jsonDate:any) {
    var date = new Date(jsonDate)
    var realDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    if ((date.getMonth()+1) < 10) {
      realDate = date.getDate() + '/' + '0'+(date.getMonth()+1) + '/' + date.getFullYear()
    }
    
    return realDate
  }

  jsontoHour(jsonDate:any) {
    var hour = new Date(jsonDate)
    var realHour = hour.getHours() + 'h' + hour.getMinutes()
    if ((hour.getHours()) < 10) {
      realHour = '0' + hour.getHours() + 'h' + hour.getMinutes()
    }
    if ((hour.getMinutes()) < 10) {
      realHour = hour.getHours() + 'h' + '0' + hour.getMinutes()
    } 
    return realHour
  }

}
