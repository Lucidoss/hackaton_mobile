import { Component} from '@angular/core'
import { Router} from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage {
  today: any
  favoriteAtelierList: any
  idFavoriteList: any
  listAvis: any

  constructor(private router: Router, private activeRoute : ActivatedRoute, private storage: Storage, private http: HttpClient) {
    this.today = new Date()
    this.today = this.stringtoDate(this.today)
  }

  ionViewWillEnter() {
    // storage c'est un grand stockage dans toute l'appli qui reste même si on refresh la page
    this.storage.get('favoriteAteliersList').then(val => {
      if (val != null) {
        this.favoriteAtelierList = val
      } else {
        this.favoriteAtelierList = []
      }
    })

    // storage c'est un grand stockage dans toute l'appli qui reste même si on refresh la page
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

  // Permet d'aller sur la page correspondant à la route /formulaire-inscription-atelier avec en paramètre l'atelier et les emails de l'atelier
  gotoFormulaireInscriptionAtelier(atelier: any, email: any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: atelier,
        param2: email
      }
    }
    this.router.navigate(['/formulaire-inscription-atelier'], navigationExtras);
  }

  // Permet d'aller sur la page correspondant à la route /formulaire-commentaire avec en paramètre l'atelier
  gotoFormulaireCommentaire(atelier: any) {
    let navigationExtras: NavigationExtras = {
      state : {
        param1: atelier
      }
    }
    this.router.navigate(['/formulaire-commentaire'], navigationExtras);
  }

  // Permet d'aller sur la page correspondant à la route /liste-avis avec en paramètre les commentaires de l'atelier
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
