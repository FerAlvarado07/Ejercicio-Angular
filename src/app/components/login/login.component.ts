import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user = {};
  username: string = '';
  password: string = '';
  error: boolean = false;

  ngOnInit(): void {}

  submitLogin(username: string, password: string): void {
    if (this.authService.login(username, password)) {
      this.authService.login(username, password).subscribe((user) => {
        if (user.id === undefined) {
          this.error = true;
          console.warn('Credenciales incorrectas');
        } else {
          console.log('El usuario que se logeo:', user.id);
          localStorage.setItem('id', user.id);
        }
      });
    }
  }
}
