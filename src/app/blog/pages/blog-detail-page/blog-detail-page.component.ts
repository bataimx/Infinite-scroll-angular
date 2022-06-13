import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, switchMap } from 'rxjs/operators';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.css'],
})
export class BlogDetailPageComponent implements OnInit {
  public blogDetail: any;
  public comments: any[];
  constructor(
    private activedRoute: ActivatedRoute,
    private blogService: BlogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        map((id) => {
          this.blogService.getCommentsByBlogId(id).then((resp) => {
            this.comments = resp;
          });
          return id;
        }),
        switchMap((id) => this.blogService.getBlogById(id))
      )
      .subscribe((resp) => {
        this.blogDetail = resp;
        this.spinner.hide();
      });
  }
}
