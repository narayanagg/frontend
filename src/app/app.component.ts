import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-angular';
  constructor(public _authService: AuthService) {}

  logOut() {
    this._authService.logout();
  }
}
