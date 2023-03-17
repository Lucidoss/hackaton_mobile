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
  myForm: FormGroup
  submitted = false
  ateliers: any

  constructor(private router: Router, public formBuilder: FormBuilder, private http: HttpClient, private activeRoute : ActivatedRoute, private toastController: ToastController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()) {
        this.ateliers = this.router.getCurrentNavigation()?.extras.state
      }
    })

    this.myForm = this.formBuilder.group({
      nom: ['', [Validators.required]],

      prenom: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }

  gotoPageAccueil() {
    this.router.navigate(['/home']);
  }

  gotoPageHackathon() {
    this.router.navigate(['/hackathon']);
  }


  inscrire() {
    this.submitted = true

    if (!this.myForm.valid) {
      this.presentToast2()
    } else {
      this.http.post('http://127.0.0.1:8001/api/atelier/' + this.ateliers.param1.param1[0].id, this.myForm.value,{
        headers : new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(data=>{
        console.log(data)
      })
      this.presentToast()
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'L\'atelier a bien été créé',
      duration: 1500,
      icon: 'globe'
    });

    await toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'All fields are required.',
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }
}
