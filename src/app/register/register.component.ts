import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  registerForm: any;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe(
        (resp) => {
          this.toastr.success('Registration Success!');
          this.router.navigate(['login']);
        },
        (err) => {
          this.toastr.warning('something went wrong please try again');
        }
      );
    } else {
      this.toastr.warning('please fill all details');
    }
  }
}
