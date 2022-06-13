import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { BlogModule } from './blog/blog.module';
import { AppRoutingModule } from './app-routing.module';
import { BlogAlbumComponent } from './pages/blog-album/blog-album.component';
import { AboutComponent } from './pages/about/about.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatGridListModule,
    BlogModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AboutComponent,
    BlogAlbumComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
