import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
})
export class DetailsPage {
  hackathon:any
  ateliers:any

  constructor(private http: HttpClient, private router: Router, private activeRoute : ActivatedRoute) {
    // Permet de récupérer les paramètres envoyés à cette page (là un hackathon)
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.hackathon = this.router.getCurrentNavigation()?.extras.state
      }
    })
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

  // Permet de transformer le json en heure au format 00h00
  jsontoHour(jsonDate:any) {
    var hour = new Date(jsonDate)
    var realHour = hour.getHours() + 'h' + hour.getMinutes()

    // Si l'heure est inférieur à 10 on ajoute un 0 afin de ne pas avoir 0h00
    if ((hour.getHours()) < 10) {
      realHour = '0' + hour.getHours() + 'h' + hour.getMinutes()
    }

    // Si les minutes sont inférieurs à 10 on ajoute un 0 afin de ne pas avoir 00h0
    if ((hour.getMinutes()) < 10) {
      realHour = hour.getHours() + 'h' + '0' + hour.getMinutes()
    }
    return realHour
  }

  // Permet d'aller sur la page correspondant à la route /atelier avec en paramètre les ateliers du hackathon
  showAtelier() {
    this.http.get('http://127.0.0.1:8001/api/hackathons/' + this.hackathon.param1.id + '/ateliers').subscribe((data) => {
      this.ateliers = data

      let navigationExtras: NavigationExtras = {
        state : {
          param1: this.ateliers
        }
      }
      this.router.navigate(['/atelier'], navigationExtras);
    });
  }
}
