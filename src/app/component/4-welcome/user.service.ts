import { Injectable } from '@angular/core';

/** demo 简单写一个userService */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = true;
  user = { name: 'User'};
}
