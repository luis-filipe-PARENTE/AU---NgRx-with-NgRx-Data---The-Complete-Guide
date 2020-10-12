import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthActions } from '../action-types';
import { AuthService } from '../auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    const { email, password } = this.form.value;

    console.log(`${email} - ${password}`);

    this.authSrv.login(email, password).pipe(
      tap((user: User) => {
        this.store.dispatch(AuthActions.login({user}));
        this.router.navigateByUrl('\courses');
      })
    ).subscribe(
      noop,
      () => console.log('Login failed')
    );
  }

}

