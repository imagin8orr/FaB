import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';
import { Card } from '../../models/Card';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css']
})
export class MyCardsComponent implements OnInit {

  cardsPagination: Card[] = [];
  loading: boolean = false;
  constructor(private router: Router, private cardService: CardService, public toastrService: ToastrService) { }

  ngOnInit() {
    this.loadAllCards();
  }

  loadAllCards() {
    setTimeout(() => {
      if (document.getElementById('my-cards')) {
        document.getElementById('my-cards').classList.add('active_nav');
      }
    }, 200);
    this.cardService.getMyCards().subscribe(result => {
      this.cardsPagination = result.data;
    }, err => {
      this.handelError(err)
    });
  }

  trackById(index: number, item: any) {
    return item.id
  }


  callDelete(card_id) {
    if (confirm("Are you sure you want to delete?")) {
      this.loading = true;
      const body = { card_id: card_id }
      this.cardService.deleteCard(body).subscribe(result => {
        if (result.message) this.toastrService.success(result.message);
        this.loadAllCards();
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
