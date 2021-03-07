import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  isLoggedIn = true;
  user = { name: 'Test User'};
}
