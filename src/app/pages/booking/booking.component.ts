import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface Seat {
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-booking',
  standalone: true,


  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  seatData: any;
  userId = "";
  seats: Seat[] = [];
  stripePromise = loadStripe('pk_test_51Qd3qILIfZMoa2rdtSbbieywVSL0FPf1ceBzM51Cj5tFLYObpvKbWlO53fMtXGKUfBWN3pidR3RjPVybB9NNmMX600rlOdfAKr');

  paramsId: string = '';
  selectedSeats: Seat[] = [];

  constructor(private masterServ: MasterService, private route: ActivatedRoute) { }



  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      this.paramsId = params.id;


      this.masterServ.get_bus_detailsById(this.paramsId).subscribe((data: any) => {
        this.seatData = data.data;


        this.seats = Array.from({ length: this.seatData.total_seats }, (_, i) => ({
          number: i + 1,
          isBooked: false,
          isSelected: false,
        }));


        this.seatData.bookingId?.forEach((userBooking: any) => {
          // console.log("userbookingUserId",userBooking)
          if( this.paramsId === userBooking.bus_id){
            const seatIndex = this.seats.findIndex(
              (seat) => seat.number === Number(userBooking?.seat_number)
            );
            if (seatIndex !== -1) {
              this.seats[seatIndex].isBooked = true;
            }
          }
          // userBooking.number.forEach((seatNumber: any) => {
          //   // console.log("userBooking",userBooking.number)
          //   //   console.log("seatNumber",seatNumber.seatNo)
          //   const seatIndex = this.seats.findIndex(
          //     (seat) => seat.number === Number(seatNumber?.seatNo)
          //   );

           
          // });
        });

        // console.log('Seat data:', this.seatData);
        // console.log('Seats array:', this.seats);
      });
    });
  }

  toggleSeat(index: number): void {
    const seat = this.seats[index];
    if (seat.isBooked) return;

    seat.isSelected = !seat.isSelected;

    this.selectedSeats = this.seats.filter((s) => s.isSelected);
  }


  async bookSeats(): Promise<void> {
    const seatNumbers = this.selectedSeats.map((s) => s.number);
    const userData = localStorage.getItem('userData');
    if (!userData) {
      alert('User data not found in localStorage. Please log in again.');
      return;
    }
    this.userId = JSON.parse(userData)?._id;
  
    if (!this.userId) {
      alert('Invalid user data. Please log in again.');
      return;
    }
  
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe is not loaded');
      alert('Failed to load Stripe. Please refresh and try again.');
      return;
    }
  
    // Request a payment session from the server
    this.masterServ.payment_request({
      id: this.paramsId,
      number: seatNumbers,
      userId: this.userId,
    }).subscribe(
      async (session: any) => {
        try {
          // Redirect to Stripe Checkout
        
  
        
          // this.masterServ.booked_seat({ id: this.paramsId, number: seatNumbers }).subscribe(
          //   (data: any) => {
          //     // seatNumbers.forEach((seatNumber) => {
          //     //   const seatIndex = this.seats.findIndex((seat) => seat.number === seatNumber);
          //     //   if (seatIndex !== -1) {
          //     //     this.seats[seatIndex].isBooked = true;
          //     //     this.seats[seatIndex].isSelected = false;
          //     //   }
          //     // });
  
              
          //     alert('Seat Booking Successful!');
          //   },
          //   (error) => {
          //     console.error('Error booking seats:', error);
          //     alert('Failed to confirm seat booking. Please try again.');
          //   }
          // );

          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          // console.log("seattt",seatNumbers)
          // const seatDatass = [
          //   { number: 1, isBooked: false, isSelected: false },
          //   { number: 2, isBooked: true, isSelected: false },
          //   { number: 3, isBooked: false, isSelected: true },
          //   // Add more data as needed
          // ];

          // this.masterServ.bus_seat_data$.next(seatDatass)

          this.selectedSeats = [];
  
          if (result?.error) {
            console.error(result.error.message);
            alert('Failed to redirect to payment. Please try again.');
            return;
          }
        } catch (error) {
          console.error('Error in Stripe Checkout:', error);
          alert('An error occurred during payment. Please try again.');
        }
      },
      (error) => {
        console.error('Error creating payment session:', error);
        alert('Failed to initiate payment. Please try again.');
      }
    );
  }
  

}