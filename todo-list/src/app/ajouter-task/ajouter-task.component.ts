import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-task',
  templateUrl: './ajouter-task.component.html',
  styleUrls: ['./ajouter-task.component.css']
})
export class AjouterTaskComponent implements OnInit {

  form !: FormGroup;
  constructor(private formBuilder: FormBuilder, private registerService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(5)]],
      priority: [null, Validators.required],
      due_date: [null, Validators.required] 
    });
  }


  get f() {
    return this.form.controls;
  }

  addTask(){


    this.registerService.addTask(this.form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('Task Added Succesfully', res);
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('task error:', error);
      }
    );
  }


}
