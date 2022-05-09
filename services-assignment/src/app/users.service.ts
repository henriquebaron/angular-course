import { EventEmitter, Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  usersChanged = new EventEmitter<{active: string[], inactive: string[]}>();

  constructor(private counterService: CounterService) { }

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.usersChanged.emit({active: this.activeUsers, inactive: this.inactiveUsers});
    this.counterService.registerChange();
  }

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.usersChanged.emit({active: this.activeUsers, inactive: this.inactiveUsers});
    this.counterService.registerChange();
  }

}
