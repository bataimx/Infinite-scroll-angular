import { Injectable, Injector, Type } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from '../blog/services/blog.service';
import { CommentService } from './comment.service';
import { UserService } from './user.service';

@Injectable()
export class LocatorService {
  constructor(
    private injector: Injector,
    private spinner: NgxSpinnerService,
    private blogService: BlogService,
    private commentService: CommentService,
    private cserService: UserService
  ) {}

  get<T>(service: Type<T>): T {
    return this.injector.get(service);
  }

  getService<T>(service: Type<T>): T {
    return this.injector.get(service);
  }
}
