import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, AsyncPipe, JsonPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  show_location: any[] = [];

  router=inject(Router)


  location$: Observable<any[]> = new Observable<any[]>;
  masterServ = inject(MasterService)



  selectedFrom: string = '';
  selectedTo: string = '';
  selectedDate: Date = new Date();

  swapCities() {
    const temp = this.selectedFrom;
    this.selectedFrom = this.selectedTo;
    this.selectedTo = temp;
  }

  ngOnInit(): void {
    this.getShowLocation()
  }


  getShowLocation() {
    this.location$ = this.masterServ.get_available_bus();
    this.location$.subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.show_location = res.data; 
          console.log('Fetched cities:', res.data);
        }
      },
      error: (err) => console.error('Error fetching buses:', err),
    });
  }


  searchBuses() {
    if (this.selectedFrom && this.selectedTo  && this.selectedDate)  {
      this.masterServ.get_search_bus(this.selectedFrom,this.selectedTo,this.selectedDate).subscribe((data:any)=>{
        // console.log('Search result:', data);
        // this.masterServ.onSearch_bus_data$.next(data.data)
        // alert('Search result')
        if(data.data.length > 0) {
          this.router.navigateByUrl(`show_bus/search_bus?fromLocation=${this.selectedFrom}&toLocation=${this.selectedTo}&date=${this.selectedDate}`);
        }else{
          alert('No buses available on selected date')
        }
      
      })
      // alert(`Searching for buses from ${this.selectedFrom} to ${this.selectedTo} `);
     
    } else {
      alert('Please select both From and To cities.');
    }
  }
}
