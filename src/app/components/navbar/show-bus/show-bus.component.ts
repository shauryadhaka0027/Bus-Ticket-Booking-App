import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar.component";
import { MasterService } from '../../../service/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-bus',
  standalone: true,
  imports: [NavbarComponent,DatePipe,CommonModule],
  templateUrl: './show-bus.component.html',
  styleUrl: './show-bus.component.css'
})
export class ShowBusComponent implements OnInit {
  masterServ = inject(MasterService);
  bus_search_data: any = null;
  selectedFrom: string = '';
  selectedTo: string = '';
  selectedDate: Date = new Date();

  constructor(private route: ActivatedRoute) {}
  router=inject(Router)

  onClick_viewSeat(data:string){
   this.router.navigateByUrl(`boking_seat/${data}`)
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.selectedFrom = params['fromLocation'];
      this.selectedTo = params['toLocation'];
      this.selectedDate = params['date'];

    

      this.masterServ.get_search_bus(this.selectedFrom, this.selectedTo, this.selectedDate).subscribe((data: any) => {
        this.bus_search_data = data?.data;
        this.masterServ.view_bus_seat_data$.next(data.data)
        console.log('Fetched Bus Data:', this.bus_search_data);
      });
    });
  }
}
