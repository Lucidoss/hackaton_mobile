import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.page.html',
  styleUrls: ['./atelier.page.scss'],
})
export class AtelierPage {
  ateliers: any
  today: any
  favoriteAtelierList: any
  idFavoriteList: any = []
  listAvis: any

  constructor(private router: Router, private activeRoute : ActivatedRoute, private storage: Storage, private http: HttpClient) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.ateliers = this.router.getCurrentNavigation()?.extras.state
        this.ateliers = this.ateliers.param1;
      }
    })

    this.storage.get('favoriteAteliersList').then(val => {
      if (val != null) {
        this.favoriteAtelierList = val
      } else {
        this.favoriteAtelierList = []
      }
    })

    this.storage.get('idFavoriteAteliersList').then(val => {
      if (val != null) {
        this.idFavoriteList = val
      } else {
        this.idFavoriteList = []
      }
    })

    this.today = new Date()
    this.today = this.stringtoDate(this.today)
  }

  ionViewWillEnter() {
    this.storage.get('favoriteAteliersList').then(val => {
      if (val != null) {
        this.favoriteAtelierList = val
      } else {
        this.favoriteAtelierList = []
      }
    })

    this.storage.get('idFavoriteAteliersList').then(val => {
      if (val != null) {
        this.idFavoriteList = val
      } else {
        this.idFavoriteList = []
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

  stringtoDate(jsonDate:any) {
    var date = new Date(jsonDate)

    return date
  }

  // Permet d'aller sur la page correspondant à la route /formulaire-inscription-atelier avec en paramètre l'atelier sélectionné et les emails
  gotoFormulaireInscriptionAtelier(atelier: any, email: any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: atelier,
        param2: email
      }
    }
    this.router.navigate(['/formulaire-inscription-atelier'], navigationExtras);
  }

  gotoFormulaireCommentaire(atelier: any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: atelier
      }
    }
    this.router.navigate(['/formulaire-commentaire'], navigationExtras);
  }

  gotoListeAvis(atelier: any) {
    this.http.get('http://127.0.0.1:8001/api/atelier/' + atelier + '/commentaire').subscribe((data) => {
        this.listAvis = data

        let navigationExtras: NavigationExtras = {
          state : {
            param1: this.listAvis
          }
        }
        this.router.navigate(['/liste-avis'], navigationExtras);
    });
  }

  addFavorite(atelier: any) {
    this.favoriteAtelierList.push(atelier)
    this.storage.set('favoriteAteliersList', this.favoriteAtelierList)

    this.idFavoriteList.push(atelier.id)
    this.storage.set('idFavoriteAteliersList', this.idFavoriteList)
  }

  removeFavorite(atelier: any) {
    const index = this.idFavoriteList.indexOf(atelier.id)

    if (index > -1) {
      this.favoriteAtelierList.splice(index, 1)
      this.storage.set('favoriteAteliersList', this.favoriteAtelierList)

      this.idFavoriteList.splice(index, 1)
      this.storage.set('idFavoriteAteliersList', this.idFavoriteList)
    }
  }
}
