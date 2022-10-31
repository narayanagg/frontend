import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _loginService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm: any;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value, 'login form');
      this._loginService.login(this.loginForm.value).subscribe(
        (resp) => {
          this.toastr.success('Login Success!');
          this.router.navigate(['products']);
          localStorage.setItem('token', resp.access_token);
        },
        (err) => {
          this.toastr.warning('please fill valid credentials');
        }
      );
    } else {
      this.toastr.warning('please fill all details');
    }
  }
}
