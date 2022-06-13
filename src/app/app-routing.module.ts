import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogAlbumComponent } from './pages/blog-album/blog-album.component';

const routes: Routes = [
  {
    path: 'albums',
    component: BlogAlbumComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'hello', component: HelloComponent },
  { path: '**', component: HelloComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
