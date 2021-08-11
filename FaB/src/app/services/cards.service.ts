import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/Card';
import { CARDS } from '../models/mock-cards';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  URL = environment.webApiUrl;
  constructor(private http: HttpClient) { }

  cards = CARDS;

  getCards(): Card[] {
    // return CARDS;
    return this.cards;
  }

  saveCards(newCards: Card[]) {
    this.cards = newCards;
  }

  addNewCard(body: any): Observable<any> {
    const url = environment.webApiUrl + `card/add`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getCardDataById(body: any): Observable<any> {
    const url = environment.webApiUrl + `card/getById`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  editNewCard(body: any): Observable<any> {
    const url = environment.webApiUrl + `card/save`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getAllCardData(): Observable<any> {
    const url = environment.webApiUrl + `card/list`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.get(url, httpOptions);
  }

  deleteCard(body: any): Observable<any> {
    const url = environment.webApiUrl + `card/delete`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }
}
