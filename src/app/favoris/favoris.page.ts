import { Component} from '@angular/core'
import { Router} from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage {
  today: any
  favoriteAtelierList: any
  idFavoriteList: any

  constructor(private router: Router, private activeRoute : ActivatedRoute, private storage: Storage) {
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
