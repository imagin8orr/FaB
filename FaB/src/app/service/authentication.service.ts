import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private WebUrl = environment.apiUrl + 'webhook/';
  constructor(private http: HttpClient) { }

  userSignUp(body): Observable<any> {
    const url = `${this.WebUrl}signup`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions
    )
      .pipe(tap(res => {
        localStorage.setItem('access_token', res['token']);
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
      }));
  }


  userLogin(body): Observable<any> {
    const url = `${this.WebUrl}login`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions
    )
      .pipe(tap(res => {
        localStorage.setItem('access_token', res['token']);
        localStorage.setItem('currentUser', JSON.stringify(res['data']));
      }));
  }


  checkTokenIsValid(body): Observable<any> {
    const url = `${this.WebUrl}verify-token`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  forgotPassword(body): Observable<any> {
    const url = `${this.WebUrl}forgot-password`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": "true"
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  resetPassword(body): Observable<any> {
    const url = `${this.WebUrl}reset`;
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
