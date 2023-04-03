import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-hackathon',
  templateUrl: 'hackathon.page.html',
  styleUrls: ['hackathon.page.scss'],
})
export class HackathonPage {
  searchTerm:any
  hackathons:any

  constructor(private http: HttpClient, private router: Router) {
  }

  ionViewWillEnter() {
    this.http.get('http://127.0.0.1:8001/api/hackathons')
      .subscribe((data) => {
        this.hackathons = data
    });
  }

  jsontoDate(jsonDate:any) {
    var date = new Date(jsonDate)
    var realDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    if ((date.getMonth()+1) < 10) {
      realDate = date.getDate() + '/' + '0'+(date.getMonth()+1) + '/' + date.getFullYear()
    }

    return realDate
  }

  displayDetails(item:any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: item
      }
    }
    this.router.navigate(['/details'], navigationExtras);
  }
}

