import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragExit } from '@angular/cdk/drag-drop';
import { Deck } from '../../models/Deck';
import { Router, ActivatedRoute } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { Card } from 'src/app/models/Card';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})
export class ViewDeckComponent implements OnInit {
  id: any;
  loading: boolean = false;
  name: string = null;
  deck_cards: Card[] = [];
  hero_card = [];
  hero_name;
  constructor(private route: ActivatedRoute, public router: Router, private deckService: DeckService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (document.getElementById('nav-decks')) {
        document.getElementById('nav-decks').classList.add('active_nav');
      }
    }, 200);
    this.id = this.route.snapshot.params['id'];
    this.getAllDeckCards();
  }

  getAllDeckCards() {
    const body = { deck_id: this.id };
    this.deckService.getDeckInfo(body).subscribe(result => {
      this.deck_cards = result.data.deck_cards;
      this.name = result.data.deck_info.deck_name;
      this.hero_card = result.data.hero_card;
      this.hero_name = result.data.deck_info.hero_name;
    }, err => {
      this.handelError(err);
    });
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
