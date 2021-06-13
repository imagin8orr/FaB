import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeckComponent } from './deck/deck.component';

const routes: Routes = [
  { path: 'deck', component: DeckComponent }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
