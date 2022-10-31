import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  constructor(private _http: HttpClient, private _router: Router) {}

  register(registerData: any) {
    return this._http.post<any>(`${this.apiUrl}users/create`, registerData);
  }

  login(loginData: any) {
    return this._http.post<any>(`${this.apiUrl}auth/login`, loginData);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
