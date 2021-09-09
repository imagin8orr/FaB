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

  // cards = [
  //   { card_id: 7, name: 'card7', image_url: this.path },
  //   { card_id: 8, name: 'card8', image_url: this.path },
  //   { card_id: 9, name: 'card9', image_url: this.path },
  //   { card_id: 10, name: 'card10', image_url: this.path },
  //   { card_id: 11, name: 'card11', image_url: this.path },
  //   { card_id: 12, name: 'card12', image_url: this.path }
  // ];

  // decks: Deck[] = [
  //   {
  //     id: 1,
  //     name: 'saasd',
  //     cards: [
  //       { card_id: 1, name: 'card1', image_url: this.path },
  //       { card_id: 2, name: 'card2', image_url: this.path },
  //       { card_id: 3, name: 'card3', image_url: this.path },
  //       { card_id: 4, name: 'card4', image_url: this.path },
  //       { card_id: 5, name: 'card5', image_url: this.path },
  //       { card_id: 6, name: 'card6', image_url: this.path }
  //     ]
  //   }

  // ];
  cards= [];
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
    }, err => {
      this.handelError(err);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.new_cards.push(event.previousContainer.data[event.previousIndex]);
    console.log(event.previousContainer.data[event.previousIndex], 'data');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
        const body = { name: this.name, cards: this.deck_cards, status: this.isPublic }
        this.deckService.addDeck(body).subscribe(result => {
          this.loading = false;
          if (result.data.message) this.toastrService.success(result.data.message);
          this.router.navigate(['/my-decks']);
        }, err => {
          this.handelError(err);
        });
      } else {
        const body = { deck_id: this.id, name: this.name, new_cards: this.new_cards, removed_cards: this.removed_cards, cards: this.deck_cards, status: this.isPublic }
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

    console.log(this.new_cards, 'new_cards');

    const new_card_index = this.new_cards.findIndex(card => card.card_id === id);

    console.log(new_card_index, 'new_card index');
    console.log(new_card_index < -1, 'new_card_index < -1');
    if (new_card_index == -1) {
      const card_index = this.cards.findIndex(card => card.card_id === id);
      this.removed_cards.push(this.cards[card_index]);
      console.log(this.removed_cards, 'removed_cards');
    } else {
      this.new_cards.splice(new_card_index, 1);
    }

    console.log(this.new_cards, 'udated new_cards');

  }

  addItem(index, id) {
    this.deck_cards.push(this.cards[index]);

    const remove_card_index = this.removed_cards.findIndex(card => card.card_id === id);

    if (remove_card_index == -1) {
      this.new_cards.push(this.cards[index]);
      console.log(this.new_cards, 'udated new_cards');
    } else {
      this.removed_cards.splice(remove_card_index, 1);
      console.log(this.removed_cards, 'removed_cards');
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
