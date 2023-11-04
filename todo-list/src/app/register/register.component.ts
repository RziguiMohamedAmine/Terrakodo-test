import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form !: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [ Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, Validators.required] 
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {


    this.registerService.registerUser(this.form.value).subscribe(
      (res) => {
        console.log('Registration success:', res);
        this.router.navigate(['/login']); 
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
