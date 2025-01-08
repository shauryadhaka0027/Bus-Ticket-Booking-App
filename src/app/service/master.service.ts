
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL

  constructor(){
    
  }


  public view_bus_seat_data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public bus_seat_data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  get_available_bus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/busBooking/available_bus`,{
      withCredentials: true
    });
  }

  get_search_bus(selectedFrom: string, selectedTo: string, selectedDate:Date): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/busBooking/search_bus?fromLocation=${selectedFrom}&toLocation=${selectedTo}&date=${selectedDate}`,{
      withCredentials: true
    });
  }


  get_user_signup(data:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/user/signup`,data);
  }

  get_user_login(data:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/user/login`,data,{
      withCredentials: true
    });
  }
  book_user_seat(data:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/busBooking/book_seat/${data.busId}`,{
      withCredentials: true
    });
  }

  get_bus_detailsById(data:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/busBooking/bus_details/${data}`,{
      withCredentials: true
    });
  }

  booked_seat(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/busBooking/book_seat/${data.id}`,data,{
      withCredentials: true
    });
  }


  payment_request(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/busBooking/payment_method/${data.id}`,data,{
      withCredentials: true
    });
  }
  

  show_ticket_by_id(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/busBooking/ticket_list`,data,{
      withCredentials: true
    });
  }

  cancel_ticket_by_id(data: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/bus_booking/cancelTicket/${data}`, {
      withCredentials: true
    });
  }

  create_bus(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/busBooking/createBus`, data, {
      withCredentials: true
    });
  }
  
}
