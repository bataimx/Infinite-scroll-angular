import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, switchMap } from 'rxjs/operators';
import { CommentService } from '../../../provider/comment.service';
import { LocatorService } from '../../../provider/locator.service';
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
    private ls: LocatorService
  ) {}

  ngOnInit() {
    this.ls.getService<NgxSpinnerService>(NgxSpinnerService).show();
    this.activedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        map((id) => {
          this.ls
            .getService<CommentService>(CommentService)
            .getCommentsByBlogId(id)
            .then((resp) => {
              this.comments = resp;
            });
          return id;
        }),
        switchMap((id) =>
          this.ls.getService<BlogService>(BlogService).getBlogById(id)
        )
      )
      .subscribe((resp) => {
        this.blogDetail = resp;
        this.ls.getService<NgxSpinnerService>(NgxSpinnerService).hide();
      });
  }
}
