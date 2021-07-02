import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Card } from '../models/Card';
import { CARDS } from '../models/mock-cards';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { } 

  cards = CARDS;

  getCards(): Card[] {
    // return CARDS;
    return this.cards;
  }

  saveCards(newCards: Card[]) {
    this.cards = newCards;
  }

  // getCards(): Observable<Card[]> {
  //   const cards = of(CARDS);
  //   return cards;
  // }
    
}
