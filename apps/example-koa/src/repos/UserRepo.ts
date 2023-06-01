import 'reflect-metadata';
import { Service } from 'typedi';
import { NotFoundError } from 'routing-controllers';
import { maxBy } from 'lodash';

import { User } from '../models/User';

@Service()
export class UserRepo {
  private userList = [
    new User(1, 'user1'),
    new User(2, 'user2'),
    new User(3, 'user3')
  ];

  queryAll() {
    return this.userList;
  }

  query(id: number) {
    return this.userList.find(user => user.id === id);
  }

  add(name: string) {
    const maxIdUser = maxBy(this.userList, user => user.id);
    const user = new User(maxIdUser.id + 1, name);
    this.userList.push(user);
    return user;
  }

  delete(id: number) {
    const selected = this.userList.find(user => user.id === id);
    if (!selected) {
      throw new NotFoundError(`user id：${id} not found.`);
    }
    this.userList = this.userList.filter(user => user.id !== id);
    return selected;
  }
}
