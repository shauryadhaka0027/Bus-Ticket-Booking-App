import { CommonModule } from '@angular/common';
import { Component,Inject,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  masterServ = inject(MasterService)
  router= inject(Router)
  
  userData = {
    email: '',
    name:"",
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.userData.password === this.userData.confirmPassword) {
     
      this.masterServ.get_user_signup(this.userData).subscribe((data: any) => {
        alert('Signup successful');
        localStorage.setItem('userData', JSON.stringify(data.data))
        this.router.navigateByUrl('home')
      })
      // console.log(this.userData);
    } else {
      alert('Passwords do not match');
    }
  }
}
