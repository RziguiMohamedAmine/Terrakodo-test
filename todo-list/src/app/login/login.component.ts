import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  data !: any;
  token !: any;
  constructor(private formBuilder: FormBuilder, private registerService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [ Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.registerService.loginUser(this.form.value).subscribe(
      (res) => {

        this.data = res;
        if(this.data.token)
        {
          this.registerService.setUser(this.data.user);
          console.log('login success:', res);
          this.token = this.data.token;
          localStorage.setItem('token', this.token);
          this.router.navigate(['/']);
        }
         
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }



}
