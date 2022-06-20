import { Injectable } from '@angular/core';
@Injectable()
export class BlogService {
  protected posts: any[] = [];
  constructor() {}

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
      const user: any = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`
      ).then((resp) => resp.json());
      post.user = user;

      resolve(post);
    });
  }

  getCommentsByBlogId(postId: string): Promise<any[]> {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    ).then((resp) => resp.json());
  }
}
