import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-create-bus',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-bus.component.html',
  styleUrl: './create-bus.component.css'
})
export class CreateBusComponent {


masterServ=inject(MasterService)


  busForm: FormGroup = new FormGroup({
    bus_number: new FormControl(""),
    route_name: new FormControl('', Validators.required),
    arrival_time: new FormControl('', Validators.required),
    departure_time: new FormControl('', [Validators.required]),
    total_seats: new FormControl('', [Validators.required, Validators.min(1)]),
    seats_available: new FormControl('', [Validators.required, Validators.min(0)]),
    fromLocationName: new FormControl('', Validators.required),
    toLocationName: new FormControl('', Validators.required),
    ticket_price: new FormControl('', [Validators.required, Validators.min(0)]),
    vender_name: new FormControl('', Validators.required),
    travel_date: new FormControl('', Validators.required),
  })



  onSubmit() {
    console.log('Bus Form Data:', this.busForm.value);
    if (this.busForm.valid) {
      console.log('Bus Form Data:', this.busForm.value);
      this.masterServ.create_bus(this.busForm.value).subscribe((data: any) => {
        console.log('Bus Data:', data);
        alert('Bus created successfully!');
        this.busForm.reset();
      }) 
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

}
