import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnChanges, AfterViewInit {
  public List: any[] = [];
  @Input() data: any;
  @ViewChildren('lastItem', { read: ElementRef })
  lastItem: QueryList<ElementRef>;
  @ViewChildren('firstItem', { read: ElementRef })
  firstItem: QueryList<ElementRef>;
  @Output() onChangeLastItem = new EventEmitter();
  @Output() onChangeFirstItem = new EventEmitter();

  constructor() {}

  ngOnChanges() {
    this.List = this.data;
  }

  ngAfterViewInit() {
    this.lastItem.changes
      .pipe(map((i) => i.last && i.last.nativeElement))
      .subscribe((el) => {
        this.onChangeLastItem.emit(el);
      });
    this.firstItem.changes
      .pipe(map((i) => i.last && i.last.nativeElement))
      .subscribe((el) => {
        this.onChangeFirstItem.emit(el);
      });
  }
}
