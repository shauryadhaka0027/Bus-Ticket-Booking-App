import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule, DatePipe } from '@angular/common';
import { MasterService } from '../../service/master.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-my-booking-list',
  standalone: true,
  imports: [NavbarComponent, DatePipe, CommonModule],
  templateUrl: './my-booking-list.component.html',
  styleUrls: ['./my-booking-list.component.css'] // Corrected typo
})
export class MyBookingListComponent implements OnInit {

  masterServ = inject(MasterService);
  tickets: any[] = [];
  pdfData: any;
  totalTicketPrice: number=0;

  constructor() { }

  ngOnInit(): void {
    this.masterServ.show_ticket_by_id({}).subscribe({
      next: (data: any) => {
        console.log('Fetched ticket details:', data);
        this.tickets = data.data.reverse() || [];
      },
      error: (error: any) => {
        console.error('Error fetching ticket details:', error);
      }
    });
  }

  cancelTicket(data: any): void {
    console.log('Cancelling ticket:', data);
    this.masterServ.cancel_ticket_by_id(data).subscribe({
      next: (response: any) => {
        alert('Ticket cancelled successfully');
        this.ngOnInit(); // Refresh the component to reflect the cancellation
      },
      error: (error: any) => {
        console.error('Error cancelling ticket:', error);
        alert(`Failed to cancel ticket: ${error?.error?.message || 'An unknown error occurred.'}`);
      }
    });
  }

  downloadPdf(data: any): void {
    this.tickets.find((ticket: any) => {
      if (ticket._id === data) {
        console.log(data, "data")
        this.pdfData = ticket;
        this.totalTicketPrice= Number(ticket.bus_id.
          ticket_price) + 38
      }
    })
    //  console.log(this.pdfData,"pdfData")
    // // Create a new doc with a specific size and orientation
    const doc = new jsPDF();

    // Header Section
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Electronic Bus Ticket  (B2C)', 105, 10, { align: 'center' });

    // Boarding Details Section
    doc.setFontSize(10);
    doc.text('Boarding From', 14, 40);
    doc.text(`${this.pdfData.bus_id.
      fromLocationName}`, 14, 45);
    doc.text(`Departure* ${this.pdfData.bus_id.departure_time}  `, 14, 50);
    doc.text('To', 105, 40, { align: 'center' });
    doc.text(`${this.pdfData.bus_id.
      toLocationName}`, 105, 45, { align: 'center' });
    doc.text(`Arrival*  ${this.pdfData.bus_id.arrival_time}`, 105, 50, { align: 'center' });

    // Train and Ticket Details
    doc.text('TICKET NO ', 14, 60);
    doc.text(`${this.pdfData.ticketId}`, 35, 60);
    doc.text('Bus No./Name', 105, 60, { align: 'center' });
    doc.text(`${this.pdfData.bus_id.
      bus_number}`, 150, 60, { align: 'center' });
   
    doc.text('SLEEPER (SL)', 30, 70);
    doc.text('Class', 105, 70, { align: 'center' });
    doc.text('Sleeper Class (SL)', 150, 70, { align: 'center' });
    doc.text('Distance', 14, 80);
    doc.text('260 KM', 30, 80);
    // doc.text('Ticket Printing Time', 105, 80, { align: 'center' });
    // doc.text('07-Jan-2025 11:37:32 Hrs', 150, 80, { align: 'center' });

    // Passenger Details Section
    doc.text('Passenger Details:', 14, 90);
    autoTable(doc, {
      startY: 95,
      head: [['#', 'Name', 'Age', 'Gender', 'Booking Status', 'Current Status']],
      body: [['1', `${this.pdfData.user_id.name}`, '22', 'MALE', `S${this.pdfData.seat_number}`, `CNF/${this.pdfData.seat_number}`]],
    });

    // Access lastAutoTable correctly
    const finalY = (doc as any).lastAutoTable.finalY || 95;

    // Transaction and Payment Details Section
    doc.text('Transaction Id (Reservation Id):', 14, finalY + 10);
    doc.text('100004961395765', 85, finalY + 10);
    doc.text('Payment Details:', 14, finalY + 20);
    autoTable(doc, {
      startY: finalY + 25,
      head: [['Description', 'Amount']],
      body: [
        ['Ticket Fare', `₹ ${this.pdfData.bus_id.
          ticket_price}`],
        ['IRCTC Convenience Fee', '₹ 17.70'],
        ['Agent Service Charge', '₹ 19.90'],
        ['Travel Insurance Premium', '₹ 0.45'],
        ['Total Fare', `₹ ${this.totalTicketPrice}`]
      ],
    });


    doc.setFontSize(9);
    const finalYFooter = (doc as any).lastAutoTable.finalY || finalY + 25;
    doc.text('* The printed Departure and Arrival Times are liable to change...', 14, finalYFooter + 10);
    doc.text('Agent Details:', 14, finalYFooter + 20);
    doc.text('Principal Agent Name: One97 Communications Ltd.', 14, finalYFooter + 25);
    doc.text('Customer Care Email: buscare@my.com', 14, finalYFooter + 30);
    doc.text('Customer Care Contact: 0120 4880880', 14, finalYFooter + 35);

    // Save the PDF
    doc.save(`ticket${this.pdfData._id}.pdf`);

  }
}
