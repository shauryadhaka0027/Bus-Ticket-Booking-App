import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from "./pages/search/search.component";
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from "./components/navbar/navbar.component";

import { LayoutComponent } from "./pages/layout/layout.component";

@Component({
  imports: [RouterOutlet,MatIconModule, LayoutComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}