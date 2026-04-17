import { Component, inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
// เพิ่ม inject เข้าไปในกลุ่มของ @angular/core


// เพิ่ม HttpClient มาจาก @angular/common/http
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  toggleForm: boolean = false;
  registerObj: any = {
    userId: 0,
    emailId: "",
    password: "",
    createdDate: new Date(),
    fullName: "",
    mobileNo: "",
  };

  loginObj: any = {
    emailId: "",
    password: ""
  }

  confirmPassword: string = "";

  http = inject(HttpClient);
  router = inject(Router);

  onRegister() {
    if (this.registerObj.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    this.http.post("https://localhost:7284/api/User/CreateNewUser", this.registerObj).subscribe({
      next: (res: any) => {
        debugger;
        alert("Registration Success");
      },
      error: (error: any) => {
        if (error.status == 400) {
          alert("Invalid Body");
        } else if (error.status == 500) {
          alert(error.error);
        } else {
          alert("Error: " + (error.message || error.statusText || "Cannot connect to server"));
        }
      }
    }); // ปิด subscribe
  } // ปิด onRegister

    onLogin() {
    this.http.post("https://localhost:7284/api/User/Login", this.loginObj).subscribe((res:any)=>{
      debugger;
      alert("Login Success");
      localStorage.setItem('userApp', JSON.stringify(res));
      this.router.navigateByUrl("user-list")
    },error=>{
      debugger;
      if(error.status == 401) {
        alert(error.error)
      }
    });
  }
}