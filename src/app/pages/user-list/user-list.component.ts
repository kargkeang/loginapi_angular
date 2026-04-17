import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userList: any [] = [];
  loggedInEmail: string = '';

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userApp');
    if (userData) {
      const user = JSON.parse(userData);
      this.loggedInEmail = user.emailId || user.EmailId || '';
    }
    this.getUsers();
  }

  getUsers() {
    this.http.get("https://localhost:7073/api/User/getUsers").subscribe((res:any)=>{
      console.log(res);
      this.userList = res;
    })
  }

}