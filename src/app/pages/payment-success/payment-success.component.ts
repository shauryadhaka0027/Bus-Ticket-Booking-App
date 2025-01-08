import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit {
  masterServ = inject(MasterService);
  paramsId: string = '';
  userId: string = '';
  seatNumber: string[] = [];
  router=inject(Router)

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe((params: any) => {
      this.paramsId = params.id;
      console.log("Bus ID:", this.paramsId);
    });


    this.route.queryParams.subscribe((queryParams: any) => {
      const seatNumbers = queryParams['seatNumbers'];
      console.log("Seat Numbers:", seatNumbers);
      this.userId = queryParams['userId']; 
      this.seatNumber = seatNumbers ? seatNumbers.split(',') : [];
    });
  }

  closeButton(){
    this.router.navigateByUrl("home")
  }
  ngOnInit(): void {
    this.masterServ.booked_seat({ id: this.paramsId ,number:this.seatNumber,userId:this.userId }).subscribe((data: any) => {
   
      console.log('Seats booked successfully:', data);
    });
  }
}
