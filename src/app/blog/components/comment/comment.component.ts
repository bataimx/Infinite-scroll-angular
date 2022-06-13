import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnChanges {
  public comment: any;
  @Input() data: any;
  constructor() {}

  ngOnChanges() {
    this.comment = this.data;
  }
}
