import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, public router: Router, public toastrService: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService.userLogin(this.loginForm.value).subscribe(result => {
      if (result.message) this.toastrService.success(result.message);
      var redirectUrl;
      window.location.reload();
      redirectUrl = "/my-cards";
      this.router.navigate([redirectUrl]);
      //}
    }, err => {
      this.loading = false;
      console.log(err);
     this.toastrService.error(err.error.message);
    });
  }


  ngOnInit() {
  }

}
