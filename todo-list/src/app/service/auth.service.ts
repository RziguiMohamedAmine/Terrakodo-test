import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  private baseURL ="http://127.0.0.1:8000/api";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

 registerUser(data:Register){
  return this.httpClient.post(this.baseURL+'/register', data)
 }

 loginUser(data:any){
  return this.httpClient.post(this.baseURL+'/login', data)
}


addTask(data:any): Observable<any> {
  const token = localStorage.getItem('token'); 

    if (!token) {
      return new Observable();
    }

 this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);

 return this.httpClient.post(`${this.baseURL}/tasks`, data, this.httpOptions);
  }

  getTasks(): Observable<any> {

    const token = localStorage.getItem('token'); 

    if (!token) {
      return new Observable();
    }

 this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);


    return this.httpClient.get(`${this.baseURL}/tasks`, this.httpOptions);
  }

  deleteTask(taskId: number): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return new Observable();
    }

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete(`${this.baseURL}/tasks/${taskId}/delete`, this.httpOptions);
  }




  

}
