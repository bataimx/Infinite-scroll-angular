import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { CommentService } from './comment.service';
import { LocatorService } from './locator.service';
import { BlogService } from './services/blog.service';

export const allServices = [UserService, CommentService, BlogService];

@NgModule({
  imports: [CommonModule],
  providers: [...allServices, LocatorService],
  declarations: [],
})
export class ProviderModule {}
