import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, public router: Router, public toastrService: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      screen_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService.userSignUp(this.registerForm.value).subscribe(result => {
      if (result.message) this.toastrService.success(result.message);
      var redirectUrl;
      window.location.reload();
      redirectUrl = "/my-cards";
      this.router.navigate([redirectUrl]);
    }, err => {
      this.loading = false;
      console.log(err);
      this.toastrService.error(err.error.message);
    });
  }

  ngOnInit() {
  }

  mobile_number_validation(event: any) {
    const pattern = /[0-9\+()\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
