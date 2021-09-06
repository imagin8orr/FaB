import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../service/deck.service';
import { Deck } from '../../models/Deck';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  decksPagination: Deck[] = [];
  constructor(private deckService:DeckService) { }

  ngOnInit() {
    this.loadAllDecks();
  }

  loadAllDecks() {
    this.deckService.getMyDecks().subscribe(result => {
      this.decksPagination = result.data;
    }, err => {
    });
  }

  trackById(index: number, item: any) {
    return item.id
  }

}
