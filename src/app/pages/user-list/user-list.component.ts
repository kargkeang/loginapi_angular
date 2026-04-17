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
  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get("https://localhost:7073/api/User/getUsers").subscribe((res:any)=>{
      this.userList = res;
    })
  }

}