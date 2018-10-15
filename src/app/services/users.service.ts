import { EventEmitter, Injectable } from '@angular/core';

import { CounterService } from './counter.service';

@Injectable()
export class UsersService {
  activateUser = new EventEmitter<number>();
  deactivateUser = new EventEmitter<number>();

  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  onActivateUser = id => {
    const user = this.inactiveUsers.splice(id, 1)[0];
    this.activeUsers.push(user);
    this.counter.incrementActivationCount();
  }

  onDeactivateUser = id => {
    const user = this.activeUsers.splice(id, 1)[0];
    this.inactiveUsers.push(user);
    this.counter.incrementDeactivationCount();
  }

  constructor(private counter: CounterService) {
    this.activateUser.subscribe(this.onActivateUser);
    this.deactivateUser.subscribe(this.onDeactivateUser);
  }
}
