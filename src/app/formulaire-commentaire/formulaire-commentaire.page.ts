import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulaire-commentaire',
  templateUrl: './formulaire-commentaire.page.html',
  styleUrls: ['./formulaire-commentaire.page.scss'],
})
export class FormulaireCommentairePage {
  formCommentaire: FormGroup
  submitted = false
  ateliers: any

  constructor(private router: Router, public formBuilder: FormBuilder, private http: HttpClient, private activeRoute : ActivatedRoute, private toastController: ToastController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.ateliers = this.router.getCurrentNavigation()?.extras.state
      }
    })

    this.formCommentaire = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/([a-z]|\.){3,}@[a-z]{3,}\.(com|fr|net)/gm)]],

      commentaire: ['', [Validators.required]]
    })
  }

  envoieCommentaire() {
    this.submitted = true

    if (!this.formCommentaire.valid) {
      this.fieldsToast()
    } else {
      this.http.post('http://127.0.0.1:8001/api/atelier/' + this.ateliers.param1 + '/addCommentaire', this.formCommentaire.value,{
        headers : new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(data=>{
      })
      this.router.navigate(['/home']);
      this.successToast()
    }
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Le commentaire a bien été créé',
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();
  }

  async fieldsToast() {
    const toast = await this.toastController.create({
      message: 'Veuillez remplir tout les champs',
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
}
