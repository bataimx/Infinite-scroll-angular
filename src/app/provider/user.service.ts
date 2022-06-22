import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor() {}

  getUser(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      const user: any = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      ).then((resp) => resp.json());

      resolve(user);
    });
  }
}
