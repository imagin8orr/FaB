import { Component, OnInit } from '@angular/core';
import { Card  } from '../models/Card';
import { CARDS } from '../models/mock-cards';

import { CARD_CLASSES  } from '../models/CardClasses';
import { CARD_RARITIES  } from '../models/CardRarities';
import { CARD_TYPES  } from '../models/CardTypes';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  cards = CARDS;
  id = 123;
  name = "Come Sit On Our Big Deck";

  constructor() { }

  ngOnInit(): void {
  }

}
