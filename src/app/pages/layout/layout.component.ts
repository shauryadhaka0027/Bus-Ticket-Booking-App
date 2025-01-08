import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../search/search.component";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, SignupComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
