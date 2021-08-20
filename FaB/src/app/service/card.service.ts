import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
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

  getMyCards(): Observable<any> {
    const url = `${this.WebUrl}card/pagination`;
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

  createCard(body): Observable<any> {
    const url = `${this.WebUrl}card/create`;
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

  getCardInfoById(body): Observable<any> {
    const url = `${this.WebUrl}webhook/getById`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  
  getCardDataById(body): Observable<any> {
    const url = `${this.WebUrl}card/infoById`;
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


  addCard(body): Observable<any> {
    const url = `${this.WebUrl}card/add`;
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

  updateCard(body): Observable<any> {
    const url = `${this.WebUrl}card/save`;
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

  deleteCard(body): Observable<any> {
    const url = `${this.WebUrl}card/delete`;
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
