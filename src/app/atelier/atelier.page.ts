import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.page.html',
  styleUrls: ['./atelier.page.scss'],
})
export class AtelierPage {
  ateliers: any
  today: any
  favoriteAtelierList: any
  idFavoriteList: any

  constructor(private router: Router, private activeRoute : ActivatedRoute, private storage: Storage) {
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
    this.today = this.jsontoDate(this.today)

  }

  ionViewWillEnter() {
    //*ngIf="idFavoriteList.includes(atelier.id); else noFavorite"

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

  jsontoDate(jsonDate:any) {
    var date = new Date(jsonDate)
    var realDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    if ((date.getMonth()+1) < 10) {
      realDate = date.getDate() + '/' + '0'+(date.getMonth()+1) + '/' + date.getFullYear()
    }

    return realDate
  }

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
    let navigationExtras: NavigationExtras = {
      state : {
        param1: atelier
      }
    }
    this.router.navigate(['/liste-avis'], navigationExtras);
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
