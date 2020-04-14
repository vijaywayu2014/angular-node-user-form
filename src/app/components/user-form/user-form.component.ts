import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {  
  submitted = false;
  public maxDate: Date = new Date ();
  userForm: FormGroup;
  TODAY = new Date();
  EIGHTEEN_YEARS_BACK = new Date(new Date(this.TODAY).getFullYear() - 18, 
  new Date(this.TODAY).getMonth() - 1, new Date(this.TODAY).getDay());


  userProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {
   }

  mainForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.userForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const USER_INPUT = new Date(this.userForm.get('dob').value);
    console.log(this.userForm.get('dob').value);
    console.log(this.EIGHTEEN_YEARS_BACK);
    if (!this.userForm.valid) {
      return false;
    } if (USER_INPUT > this.EIGHTEEN_YEARS_BACK) {
      alert('Minimumm age should be 18 years');
      return false;
    } else {
      this.apiService.createUser(this.userForm.value).subscribe(
        (res) => {
          console.log('user successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
