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

  // Permet de transformer le json en date au format 00/00/0000
  jsontoDate(jsonDate:any) {
    var date = new Date(jsonDate)
    var jour: any = date.getDate()

    // Si le jour est inférieur à 10 on ajoute un 0 afin de ne pas avoir 3/05/2023
    if (date.getDate() < 10) {
      jour = '0' + date.getDate()
    }

    var realDate = jour + '/' + (date.getMonth()+1) + '/' + date.getFullYear()

    // Si le mois est inférieur à 10 on ajoute un 0 afin de ne pas avoir 03/5/2023
    if ((date.getMonth()+1) < 10) {
      realDate = jour + '/' + '0'+(date.getMonth()+1) + '/' + date.getFullYear()
    }

    return realDate
  }

  // Permet d'aller sur la page correspondant à la route /details avec en paramètre le hackathon
  displayDetails(hackathon:any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: hackathon
      }
    }
    this.router.navigate(['/details'], navigationExtras);
  }
}

