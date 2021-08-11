import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardsService } from '../services/cards.service';


// import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  // cards = CARDS;
  cards:any;

  // constructor() { }
  constructor(private cardService: CardsService) { }

  getCards(): void {
    // this.cards = this.cardService.getCards();
    //this.cards = this.cardService.getAllCardData().subscribe(cards => this.cards = cards);

    this.cardService.getAllCardData().subscribe(result => {
      this.cards = result.data;
    }, err => {
      console.log(err);
      //this.resetCard();
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

}

