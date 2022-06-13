import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent implements OnChanges {
  public blogDetail: any;
  @Input() data: any;
  constructor() {}

  ngOnChanges() {
    this.blogDetail = this.data;
  }
}
