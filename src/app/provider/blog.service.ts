import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class BlogService {
  protected posts: any[] = [];
  constructor(private injector: Injector) {}

  getBlogList(): Promise<any> {
    return new Promise(async (resolve) => {
      if (this.posts.length == 0) {
        const posts = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        ).then((response) => response.json());
        this.posts = posts;
      }
      resolve(this.posts);
    });
  }

  getBlogById(id: string): Promise<any> {
    return new Promise(async (resolve) => {
      const post: any = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      ).then((resp) => resp.json());
      const user: any = await this.injector
        .get(UserService)
        .getUser(post.userId)
        .then((resp) => resp);
      post.user = user;

      resolve(post);
    });
  }
}
