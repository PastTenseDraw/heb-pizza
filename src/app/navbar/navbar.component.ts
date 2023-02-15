import { Component } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public loggedIn$ = this.loginService.authToken$.pipe(map(token => !!token));

  constructor(private readonly loginService: LoginService) {}
}
