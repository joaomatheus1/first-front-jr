import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);

  sendUserData(data: any) {
    this.userDataSubject.next(data);
  }

  getUserData() {
    return this.userDataSubject.asObservable();
  }
}
