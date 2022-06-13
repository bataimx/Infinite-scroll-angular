import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.css'],
})
export class BlogListPageComponent implements OnInit {
  public dataList: any[] = [];

  constructor(
    private blogService: BlogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.blogService.getBlogList().then((resp) => {
      this.dataList = resp;
      this.spinner.hide();
    });
  }
}
