import { Component, OnInit } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from '../models/Card';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CardService]
})
export class CardsComponent implements OnInit {
  cardsPagination: Card[] = [];
  loading: boolean = false;
  constructor(private cardService: CardService, public toastrService: ToastrService) { }

  ngOnInit() {
    this.loadAllCards();
  }

  loadAllCards() {
    this.cardService.getCards().subscribe(result => {
      this.cardsPagination = result.data;
    }, err => {
    });
  }

  trackById(index: number, item: any) {
    return item.id
  }
 
}
