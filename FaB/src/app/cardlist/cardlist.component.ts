import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  cards: any;
  @Output() eventChange = new EventEmitter<Event>();

  constructor(private cardService: CardsService) { }

  getCards(): void {
    this.cardService.getAllCardData().subscribe(result => {
      this.cards = result.data;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getCards();
  }


  onClick(id: any) {
    this.eventChange.emit(id);
  }

  onDelete(card_id: any) {
    const body = { card_id: card_id }
    this.cardService.deleteCard(body).subscribe(result => {
      this.getCards();
    }, err => {
      console.log(err);
    });
  }

}
