import { EventEmitter } from '@angular/core';

export class UsersService {
  activateUser = new EventEmitter<number>();
  deactivateUser = new EventEmitter<number>();

  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  onActivateUser = id => {
    const user = this.inactiveUsers.splice(id, 1)[0];
    this.activeUsers.push(user);
  }

  onDeactivateUser = id => {
    const user = this.activeUsers.splice(id, 1)[0];
    this.inactiveUsers.push(user);
  }

  constructor() {
    this.activateUser.subscribe(this.onActivateUser);
    this.deactivateUser.subscribe(this.onDeactivateUser);
  }
}
