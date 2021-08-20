import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ToastrService, ProfileService]
})
export class HeaderComponent implements OnInit {
  loading: boolean = false;
  profileForm: FormGroup;
  files: File[] = [];
  formData: FormData = new FormData();
  submitted: boolean = false;
  logo: boolean = false;
  userData: any = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  isLogin: boolean = false;

  constructor(private router: Router, private profileService: ProfileService, private formBuilder: FormBuilder, public toastrService: ToastrService) {
    if (localStorage.getItem('currentUser')) {
      this.isLogin = true;
      this.createForm();
    }
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      screen_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    
  }

  ngOnInit() {
  
  }

  logout() {
    this.loading = true;
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    window.location.reload();
    this.router.navigate(['/login']);
  }

  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      this.loading = false;
      return;
    }

    this.profileService.updateProfile(this.profileForm.value).subscribe(result => {
      if (this.logo) {
        this.profileService.profileImageUpload(this.formData).subscribe(result => {
          if (result.message) this.toastrService.success(result.message);
          this.loading = false;
          $('.modal').modal('hide');
          localStorage.setItem('currentUser', JSON.stringify(result['data']));
          this.userData = result['data'];
        }, err => {
          this.handelError(err)
        });
      } else {
        if (result.message) this.toastrService.success(result.message);
        this.loading = false;
        $('.modal').modal('hide');
        localStorage.setItem('currentUser', JSON.stringify(result['data']));
        this.userData = result['data'];
      }
    }, err => {
      this.handelError(err)
    });
  }

  mobile_number_validation(event: any) {
    const pattern = /[0-9\+()\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onFileChange(event) {
    console.log('called');
    this.formData = new FormData();
    var fileList_1: FileList = event.target.files;
    var fileName = fileList_1[0].name;
    var fileExtension = fileName.replace(/^.*\./, '');
    if (fileExtension == 'jpg' || fileExtension == 'JPG' || fileExtension == 'jpeg' || fileExtension == 'jpe' || fileExtension == 'JPE' || fileExtension == 'JPEG' || fileExtension == 'png' || fileExtension == 'PNG' || fileExtension == 'bmp' || fileExtension == 'BMP' || fileExtension == 'svg' || fileExtension == 'SVG') {
      // this.importError = false;
      this.logo = true;
    } else {
      // this.importError = true;
      // this.importErrorMsg = 'File Should be a Valid image file.';
      this.logo = false;
      return false;
    }
    this.formData.append("profile", fileList_1[0], fileName);
  }

  handelError(err) {
    this.loading = false;
    if (err.error.message) this.toastrService.error(err.error.message);
    if (err.status == 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      window.location.reload();
      this.router.navigate(['/']);
    }
  }

  onClick() {
    this.profileService.getProfile().subscribe(result => {
      this.profileForm.setValue({
        email: result.data.email,
        username: result.data.username,
        screen_name: result.data.screen_name,
        phone: result.data.phone,
        address: result.data.address,
        password: '',
        confirmPassword: ''
      });
      this.isLogin = true;
    }, err => {
      this.isLogin = false;
      this.handelError(err)
    });
  }
}
