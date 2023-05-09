import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulaire-inscription-atelier',
  templateUrl: './formulaire-inscription-atelier.page.html',
  styleUrls: ['./formulaire-inscription-atelier.page.scss'],
})
export class FormulaireInscriptionAtelierPage {
  formAtelier: FormGroup
  submitted = false
  ateliers: any

  constructor(private router: Router, public formBuilder: FormBuilder, private http: HttpClient, private activeRoute : ActivatedRoute, private toastController: ToastController) {
    // Permet de récupérer les paramètres envoyés à cette page (là l'atelier sélectionné et les emails de l'atelier)
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.ateliers = this.router.getCurrentNavigation()?.extras.state
      }
    })

    this.formAtelier = this.formBuilder.group({
      nom: ['', [Validators.required]],

      prenom: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.pattern(/([a-z]|\.){3,}@[a-z]{3,}\.(com|fr|net)/gm)]]
    })
  }

  inscrire() {
    this.submitted = true

    if (!this.formAtelier.valid) { // Si le formulaire est pas valide
      this.fieldsToast()
    } else if (this.ateliers.param2.indexOf(this.formAtelier.value.email) > -1) { // Check si le mail est déjà inscrit à l'atelier
      this.emailToast()
    } else { // Envoie une requête POST
      this.http.post('http://127.0.0.1:8001/api/atelier/' + this.ateliers.param1, this.formAtelier.value,{
        headers : new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(data=>{
        // .subscribe obligatoire je sais plus pk mais changez pas
      })

      // Retourne à la page d'accueil
      this.router.navigate(['/home']);
      this.successToast()
    }
  }

  async successToast() { // Toast ça marche
    const toast = await this.toastController.create({
      message: 'Inscription réussie',
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();
  }

  async fieldsToast() { // Toast si les champs sont invalides
    const toast = await this.toastController.create({
      message: 'Veuillez remplir tout les champs',
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  async emailToast() { // Toast email déjà inscrit
    const toast = await this.toastController.create({
      message: 'Cet email est déjà inscrit',
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
}
