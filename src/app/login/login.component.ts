import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CoreService } from '../core/core.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public loginErrorMessage: string | null = null;
  public loginForm = this.formBuilder.group({
    username: this.username,
    password: this.password,
  });
  public userLoggedIn$: Observable<boolean> = this.service.authToken$.pipe(map(token => !!token));

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: LoginService,
    private readonly coreService: CoreService,
  ) { }

  public logout(): void {
    this.service.logout();
  }

  public onSubmitLogin(): void {
    this.service.submitLogin(this.username.value || '', this.password.value || '').subscribe({
      next: response => {
        console.log('Success!', response);
        this.loginErrorMessage = null;
      },
      error: error => {
        console.log('Failure!', error);
        this.loginErrorMessage = error;
      },
    });
  }

}
