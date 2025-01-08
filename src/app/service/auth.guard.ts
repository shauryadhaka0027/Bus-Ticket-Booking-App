import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
   const loggedIn= localStorage.getItem("userData")
   if(loggedIn != null){
    // console.log(loggedIn,"userrrr")
    const data = JSON.parse(loggedIn)
   
    console.log(data,"dataaaaa")
    return true;
   }else{
    router.navigateByUrl('login')
    return false;
   }
};
