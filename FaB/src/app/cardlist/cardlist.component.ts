import { Component, OnInit, Input } from '@angular/core';
import { Card  } from '../models/Card';
import { CARDS } from '../models/mock-cards';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  @Input() card?: Card;

  cards = CARDS;

  constructor(private cardService: CardsService) { }

  getCards(): void {
    this.cards = this.cardService.getCards();
    // this.cards = this.cardService.getCards().subscribe(cards => this.cards = cards);
  }

  ngOnInit(): void {
    this.getCards();
  }

}
