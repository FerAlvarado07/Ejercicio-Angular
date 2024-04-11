import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  private apiUsers = 'http://localhost:3000/users';
  isAuth: boolean = false;
  currentlog = {};

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUsers).pipe(
      map((users) => {
        this.isAuth =
          users.find(
            (user) => user.email === username && user.password === password
          ) || false;
        if (this.isAuth) {
          this.router.navigate(['/home']);
        }
        return this.isAuth;
      })
    );
  }

  getUserId(username: string): Observable<string> {
    return this.http.get<string>(`${this.apiUsers}?username=${username}`);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
