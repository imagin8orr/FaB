import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private WebUrl = environment.apiUrl + 'user';
  private token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const url = `${this.WebUrl}/info`;
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

  profileImageUpload(data): Observable<any> {
    const url = `${this.WebUrl}/image`;
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Authorization": this.token
      })
    };
    return this.http.post(url, data, httpOptions);
  }

  updateProfile(body): Observable<any> {
    const url = `${this.WebUrl}/profile_update`;
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
