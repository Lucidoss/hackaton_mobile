import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HackathonPageRoutingModule } from './hackathon-routing.module';

import { HackathonPage } from './hackathon.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HackathonPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HackathonPage]
})
export class HackathonPageModule {}
