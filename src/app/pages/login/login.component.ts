import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  masterServ= inject(MasterService)
  router= inject(Router)

  userData = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.masterServ.get_user_login(this.userData).subscribe((data:any)=>{
      console.log('User Data:', data);
      this.router.navigateByUrl("home")
      // Handle user data here (e.g., save to local storage)
      localStorage.setItem('userData', JSON.stringify(data.data))
      // Redirect to dashboard or home page after successful login
    })
   
    // Handle login logic here (e.g., call an API)
  }
}
