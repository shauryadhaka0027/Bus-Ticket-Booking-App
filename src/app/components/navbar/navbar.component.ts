import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  showLanguages = false;
  showAccountOptions = false;

  router= inject(Router)


   userRole:any;

  @ViewChild('accountMenu') accountMenu ! :ElementRef;
  // @ViewChild('languageMenu') languageMenu! : ElementRef;


  logoutUser(){
    //  debugger
     localStorage.removeItem('userData')
     this.router.navigateByUrl('login')
  }

  toggleLanguage(event: Event) {
    event.stopPropagation();
    this.showLanguages = !this.showLanguages;
  }

  toggleAccount(event:Event) {
    event.stopPropagation();
    this.showAccountOptions = !this.showAccountOptions;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.accountMenu && !this.accountMenu.nativeElement.contains(event.target)) {
      this.showAccountOptions = false;
    }
    // if (this.languageMenu && !this.languageMenu.nativeElement.contains(event.target)) {
    //     this.showLanguages = false;
    //   }
  }

  constructor(){
    const userData = localStorage.getItem('userData');
    this.userRole = userData ? JSON.parse(userData).role : null;
    console.log(this.userRole, "role");
  }
  


}
