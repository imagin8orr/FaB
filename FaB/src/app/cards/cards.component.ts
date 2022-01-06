import { Component, OnInit } from '@angular/core';
import { CardService } from '../service/card.service';
import { Card } from '../models/Card';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [CardService]
})
export class CardsComponent implements OnInit {
  cardsPagination: Card[] = [];
  loading: boolean = false;
  constructor(private cardService: CardService, public toastrService: ToastrService) {

  }

  ngOnInit() {
    setTimeout(() => {
      if (document.getElementById('nav-cards')) {
        document.querySelector('.active_nav').classList.remove('active_nav')
        document.getElementById('nav-cards').classList.add('active_nav');
      }
    }, 200);
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

  OpenImage(image_url) {
    console.log(image_url);
    $('.gallery').attr('src', image_url);
    $('#my-image-modal').modal('show');
  }

}
