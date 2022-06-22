import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {
  constructor() {}

  getCommentsByBlogId(postId: string): Promise<any[]> {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    ).then((resp) => resp.json());
  }
}
