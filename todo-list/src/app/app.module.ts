import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthGuard } from './auth.guard';
import { AjouterTaskComponent } from './ajouter-task/ajouter-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { takeLast } from 'rxjs';


const routes:Routes=[
  {
    path: '', component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'task', component:AjouterTaskComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'taskList', component:TaskListComponent,
    canActivate:[AuthGuard]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AjouterTaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
