import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { MatCardModule } from '@angular/material/card';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { BlogRoutingModule } from './blog-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { BlogParentPageComponent } from './pages/blog-parent-page/blog-parent-page.component';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const ComponentExports = [
  MenuComponent,
  BlogListComponent,
  BlogItemComponent,
  CommentComponent,
  BlogDetailPageComponent,
  BlogParentPageComponent,
  BlogListPageComponent,
  InfiniteScrollComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    BlogRoutingModule,
    ScrollingModule,
  ],
  declarations: ComponentExports,
  exports: ComponentExports,
})
export class BlogModule {}
