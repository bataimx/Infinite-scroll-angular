import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { BlogParentPageComponent } from './pages/blog-parent-page/blog-parent-page.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogParentPageComponent,
    children: [
      {
        path: '',
        component: BlogListPageComponent,
      },
      {
        path: ':id',
        component: BlogDetailPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
