import { Component, OnInit } from '@angular/core';
import { Card  } from '../models/Card';
// import { CARDS } from '../models/mock-cards';

import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  
  // cards = CARDS;
  cards: Card[] = [];

  constructor(private cardService: CardsService) { }

  getCards(): void {
    this.cards = this.cardService.getCards()
                     .subscribe(cards => this.cards = cards);
  }

  ngOnInit(): void {
    this.getCards();
  }

}
