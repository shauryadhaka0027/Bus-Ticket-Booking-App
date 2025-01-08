import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('userData');
  const data = isLoggedIn ? JSON.parse(isLoggedIn) : null;

  if (isLoggedIn && data?.role === 'admin') {
    return true; 
  } else {
    router.navigate(['/home']); 
    return false; 
  }
};
