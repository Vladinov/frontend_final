import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Logout', url: '/logout', icon: 'paper-plane' },
    { title: 'Ruleta', url: '/ruleta', icon: 'heart' },
    { title: 'Home', url: '/home', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public auth: AuthService) {}
}
