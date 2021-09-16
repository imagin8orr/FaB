import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem, CdkDragExit } from '@angular/cdk/drag-drop';
import { Deck } from '../../models/Deck';
import { Router, ActivatedRoute } from '@angular/router';
import { DeckService } from '../../service/deck.service';
import { Card } from 'src/app/models/Card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-deck',
  templateUrl: './add-edit-deck.component.html',
  styleUrls: ['./add-edit-deck.component.css']
})
export class AddEditDeckComponent implements OnInit {

  isAddMode: boolean;
  id: any;
  loading: boolean = false;
  path = 'https://fabdb2.imgix.net/cards/printings/CRU072.png';
  text = "Add Name"
  name_required: boolean = false;
  name: string = null;
  isPublic: boolean = false;
  hero_name: string = null;
  cards = [];
  hero_card = [];
  decks: Deck[] = [];
  deck_cards = this.decks.length > 0 ? this.decks[0].cards : [];

  new_cards = [];
  removed_cards = [];
  constructor(private route: ActivatedRoute, public router: Router, private deckService: DeckService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (document.getElementById('my-decks')) {
        document.getElementById('my-decks').classList.add('active_nav');
      }
    }, 200);
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.getAllDeckCards();
    }
    this.getAllCards()
  }

  getAllCards() {
    this.deckService.getCards().subscribe(result => {
      this.cards = result.data;
    }, err => {
      this.handelError(err);
    });
  }

  getAllDeckCards() {
    const body = { deck_id: this.id };
    this.deckService.getDeckInfo(body).subscribe(result => {
      this.deck_cards = result.data.deck_cards;
      this.name = result.data.deck_info.deck_name;
      this.isPublic = result.data.deck_info.status;
      this.hero_card = result.data.hero_card;
      this.hero_name = result.data.deck_info.hero_name;
    }, err => {
      this.handelError(err);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.new_cards.push(event.previousContainer.data[event.previousIndex]);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data[event.previousIndex]['type'] != 'Hero - Adult' && event.previousContainer.data[event.previousIndex]['type'] != 'Hero - Young') {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      } else {
        this.toastrService.warning('Place hero card in hero section');
      }
    }
  }

  dropHero(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data[event.previousIndex]['type'] == 'Hero - Adult' || event.previousContainer.data[event.previousIndex]['type'] == 'Hero - Young') {
        this.hero_card.splice(0, 1);
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      } else {
        this.toastrService.warning('Only accepts hero cards');
      }

    }
  }

  exited(event: CdkDragExit<string>) {
    console.log(event.item.data, 'cdkDropListEntered');
  }

  saveDeck() {
    this.loading = true;
    if (!this.name) {
      this.name_required = true;
      this.loading = false;
    } else {
      this.name_required = false;
      if (this.isAddMode) {
        const body = { name: this.name, cards: this.deck_cards, status: this.isPublic, hero_card: this.hero_card }
        this.deckService.addDeck(body).subscribe(result => {
          this.loading = false;
          if (result.data.message) this.toastrService.success(result.data.message);
          this.router.navigate(['/my-decks']);
        }, err => {
          this.handelError(err);
        });
      } else {
        const body = { deck_id: this.id, name: this.name, new_cards: this.new_cards, removed_cards: this.removed_cards, cards: this.deck_cards, status: this.isPublic, hero_card: this.hero_card }
        this.deckService.updateDeck(body).subscribe(result => {
          this.loading = false;
          if (result.data.message) this.toastrService.success(result.data.message);
          this.router.navigate(['/my-decks']);
        }, err => {
          this.handelError(err);
        });
      }
    }
  }


  removeItem(index, id) {
    this.deck_cards.splice(index, 1);
    const new_card_index = this.new_cards.findIndex(card => card.card_id === id);
    if (new_card_index == -1) {
      const card_index = this.cards.findIndex(card => card.card_id === id);
      this.removed_cards.push(this.cards[card_index]);
      console.log(this.removed_cards, 'removed_cards');
    } else {
      this.new_cards.splice(new_card_index, 1);
    }
  }

  removeHeroItem() {
    this.hero_card.splice(0, 1);
  }

  addItem(index, id) {
    if (this.cards[index]['type'] != 'Hero - Adult' && this.cards[index]['type'] != 'Hero - Young') {
      this.deck_cards.push(this.cards[index]);
      const remove_card_index = this.removed_cards.findIndex(card => card.card_id === id);
      if (remove_card_index == -1) {
        this.new_cards.push(this.cards[index]);
      } else {
        this.removed_cards.splice(remove_card_index, 1);
      }
    } else {
      this.hero_card.splice(0, 1);
      this.hero_card.push(this.cards[index]);
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
