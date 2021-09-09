import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../service/deck.service';
import { Deck } from '../../models/Deck';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-deck',
  templateUrl: './my-deck.component.html',
  styleUrls: ['./my-deck.component.css']
})
export class MyDeckComponent implements OnInit {
  decksPagination: Deck[] = [];
  loading: boolean = false;
  constructor(private router: Router, private deckService: DeckService, private toastrService: ToastrService) { }

  ngOnInit() {
    setTimeout(() => {
      if (document.getElementById('my-decks')) {
        document.getElementById('my-decks').classList.add('active_nav');
      }
    }, 200);
    this.loadAllDecks();
  }

  loadAllDecks() {
    this.deckService.getMyDecks().subscribe(result => {
      this.decksPagination = result.data;
    }, err => {
      this.handelError(err)
    });
  }

  trackById(index: number, item: any) {
    return item.id
  }

  callDelete(deck_id) {
    if (confirm("Are you sure you want to delete?")) {
      this.loading = true;
      const body = { deck_id: deck_id }
      this.deckService.deleteDeck(body).subscribe(result => {
        if (result.message) this.toastrService.success(result.message);
        this.loadAllDecks();
        this.loading = false;
      }, err => {
        this.handelError(err)
      });
    }
  }

  handelError(err) {
    this.loading = false;
    if (err.error.message) this.toastrService.error(err.error.message);
    if (err.status == 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      window.location.reload();
      this.router.navigate(['/']);
    }
  }

}
