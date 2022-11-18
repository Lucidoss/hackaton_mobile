import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-hackathon',
  templateUrl: 'hackathon.page.html',
  styleUrls: ['hackathon.page.scss'],
})
export class HackathonPage implements OnInit {

  hackathons:any
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://127.0.0.1:8001/api/hackathons')
      .subscribe((data) => {
        this.hackathons = data
        console.log(data);
    });
  }
  
  gotoPageAccueil() {
    this.router.navigate(['/home']);
  }

  gotoPageHackathon() {
    this.router.navigate(['/hackathon']);
  }

  jsontoDate(jsonDate:any) {
    var date = new Date(jsonDate)
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
  }

  ngOnInit() {
  }

}
