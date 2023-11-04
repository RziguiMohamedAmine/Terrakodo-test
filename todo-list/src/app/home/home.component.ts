import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser !: User | null;
  constructor(private userService:AuthService, private router:Router) { 
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log(user)
    });
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
