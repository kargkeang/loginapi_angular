import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('userApp');

  if (!raw) {
    router.navigateByUrl('login');
    return false;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed) {
      router.navigateByUrl('login');
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem('userApp');
    router.navigateByUrl('login');
    return false;
  }
};
