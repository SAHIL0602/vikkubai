import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup,Validators, } from '@angular/forms';
import { CreateUserModel } from '../model/create-user-model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  myForm: any;
  submitted: any;

  userData = new CreateUserModel()
  constructor(private db: AngularFirestore, private fb: FormBuilder, public router: Router) { 
   
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phoneno:['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['',[Validators.required]]
    })
  }
  onSubmit(_myForm?:any) { 
    this.submitted = true; // Mark the form as submitted

    if (this.myForm.valid){
     
    // this.userData.name = this.formControls['name'].value;
    // this.userData.email = this.formControls['email'].value;
    // this.userData.phone = this.formControls['phoneno'].value;
    // this.userData.password = this.formControls['password'].value;
    let data = {
      name: this.formControls['name'].value,
      email: this.formControls['email'].value,
      phone: this.formControls['phoneno'].value,
      password: this.formControls['password'].value
    };
    
      this.addNewUser(data);
    }
    alert('Signup successful');

    this.router.navigate(['/'])
  }
  addNewUser(data:any) {
  console.log(data);

    this.db.collection("User").add(data);
  
 }
  
 get formControls() {
  console.log(this.myForm);
  
  return this.myForm.controls;
}

}