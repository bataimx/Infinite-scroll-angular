import { Component, Injector, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from '../../../provider/blog.service';
import { LocatorService } from '../../../provider/locator.service';

@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.css'],
})
export class BlogListPageComponent implements OnInit {
  public dataList: any[] = [];

  constructor(private ls: LocatorService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.ls
      .getService<BlogService>(BlogService)
      .getBlogList()
      .then((resp) => {
        this.dataList = resp;
        this.spinner.hide();
      });
  }
}
