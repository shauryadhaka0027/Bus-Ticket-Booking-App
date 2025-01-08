import { Routes } from '@angular/router';
import { ShowBusComponent } from './components/navbar/show-bus/show-bus.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { BookingComponent } from './pages/booking/booking.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { MyBookingListComponent } from './pages/my-booking-list/my-booking-list.component';
import { authGuard } from './service/auth.guard';
import { CreateBusComponent } from './pages/create-bus/create-bus.component';
import { adminGuard } from './service/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:"home",component:LayoutComponent,canActivate:[authGuard]},
    {path:`show_bus/search_bus`,component:ShowBusComponent,canActivate:[authGuard]},
    {path:'boking_seat/:id',component:BookingComponent,canActivate:[authGuard]},
    {path:"signup",component:SignupComponent},
    {path:"login",component:LoginComponent},
    {path:'payment_succes/:id',component:PaymentSuccessComponent,canActivate:[authGuard]},
    {path:"mybooking_list",component:MyBookingListComponent,canActivate:[authGuard]},
    {path:"create_bus",component:CreateBusComponent,canActivateChild:[adminGuard]}
   
];
