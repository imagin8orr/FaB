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
    const url = `${this.WebUrl}deck/:id`;
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
