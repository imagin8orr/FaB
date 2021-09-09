import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private WebUrl = environment.apiUrl;
  private token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '';
  constructor(private http: HttpClient) { }


  getCards(): Observable<any> {
    const url = `${this.WebUrl}webhook/cards`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.get(url, httpOptions);
  }

  getAllDecks(): Observable<any> {
    const url = `${this.WebUrl}webhook/decks`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.get(url, httpOptions);
  }

  getMyDecks(): Observable<any> {
    const url = `${this.WebUrl}deck/pagination`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.get(url, httpOptions);
  }

  getDeckInfo(body): Observable<any> {
    if (this.token) {
      var url = `${this.WebUrl}deck/view`;
    } else {
      var url = `${this.WebUrl}webhook/deck-view`;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  addDeck(body): Observable<any> {
    const url = `${this.WebUrl}deck/add`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  updateDeck(body): Observable<any> {
    const url = `${this.WebUrl}deck/save`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  deleteDeck(body): Observable<any> {
    const url = `${this.WebUrl}deck/delete`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
}
