import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

enum DirectionEnum {
  UP = 'Up',
  DOWN = 'Down',
  NONE = 'None',
}

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
})
export class InfiniteScrollComponent implements OnChanges, AfterViewInit {
  @Input() data: any;
  @Input() itemPerPage: number = 10;
  @ViewChild('scrollArea', { read: ElementRef }) scrollArea: ElementRef;

  public fixScrollHeight: number = 1000;
  protected _activePage: boolean = true;
  public firstList: any[] = [];
  public secondList: any[] = [];
  protected intersectionObs: IntersectionObserver;
  protected index = 0;

  @ViewChild('firstPager', { read: ElementRef }) firstPager: ElementRef;
  @ViewChild('secondPager', { read: ElementRef }) secondPager: ElementRef;
  public firstScrollOffset: number = 0;
  public secondScrollOffset: number = 0;
  protected currentDirection: DirectionEnum = DirectionEnum.NONE;

  public onScroll = new Subject();

  constructor() {}

  ngOnChanges() {
    if (!this.data || this.data.length === 0) return;
    this.firstList = this.data.slice(this.index, this.itemPerPage);
  }

  ngAfterViewInit() {
    this.scrollArea.nativeElement.onscroll = async () => {
      this.onScroll.next(null);
    };
    this.onScroll.pipe(throttleTime(50)).subscribe((i) => {
      if (
        this.firstPager.nativeElement.clientHeight <
          this.scrollArea.nativeElement.clientHeight &&
        this.index === 0
      ) {
        this.itemPerPage += 10;
        this.firstList = this.data.slice(this.index, this.itemPerPage);
      } else {
        this.scrollChange();
      }
    });
  }

  async scrollChange() {
    const UP_viewOffset = this.scrollArea.nativeElement.scrollTop;
    const DOWN_viewOffset =
      this.scrollArea.nativeElement.scrollTop +
      this.scrollArea.nativeElement.clientHeight;

    const pagerEl = this.getActivePage().pager.nativeElement;
    const pagerTransform = this.getActivePage().offset;
    const margin = pagerEl.clientHeight / 10;
    const DOWN_offset = pagerTransform + pagerEl.clientHeight - margin;
    const UP_offset = pagerTransform + margin;

    if (
      UP_viewOffset > 1000 &&
      UP_viewOffset < UP_offset &&
      DOWN_viewOffset < DOWN_offset &&
      this.currentDirection !== DirectionEnum.UP
    ) {
      this.currentDirection = DirectionEnum.UP;
      await this.moveUp().subscribe();
    } else if (
      UP_viewOffset > UP_offset &&
      DOWN_viewOffset > DOWN_offset &&
      this.currentDirection !== DirectionEnum.DOWN
    ) {
      this.currentDirection = DirectionEnum.DOWN;
      this.updateParentHeight();
      await this.moveDown().subscribe();
    } else if (UP_viewOffset > DOWN_offset || DOWN_viewOffset < UP_offset) {
      await this.changeActivePage().subscribe();
    }
  }

  getActivePage(): any {
    if (this._activePage) {
      return {
        pager: this.firstPager,
        offset: this.firstScrollOffset,
      };
    } else {
      return {
        pager: this.secondPager,
        offset: this.secondScrollOffset,
      };
    }
  }

  updateParentHeight() {
    this.fixScrollHeight =
      this.fixScrollHeight > this.scrollArea.nativeElement.scrollHeight
        ? this.fixScrollHeight
        : this.scrollArea.nativeElement.scrollHeight;
  }

  moveDown() {
    return new Observable((sub) => {
      console.log('Move Down', this._activePage);
      const newOffset = 10;
      if (!this._activePage) {
        this.firstList = this.nextIndexData();
        this.firstScrollOffset =
          newOffset +
          this.secondScrollOffset +
          this.secondPager.nativeElement.clientHeight;
      } else {
        this.secondList = this.nextIndexData();
        this.secondScrollOffset =
          newOffset +
          this.firstScrollOffset +
          this.firstPager.nativeElement.clientHeight;
      }
      sub.complete();
    });
  }

  moveUp() {
    return new Observable((sub) => {
      console.log('Move Up', this._activePage);

      const newOffset = 10;
      if (!this._activePage) {
        this.firstList = this.prevIndexData();
        setTimeout(() => {
          this.firstScrollOffset =
            this.secondScrollOffset -
            this.firstPager.nativeElement.clientHeight -
            newOffset;
        }, 100);
      } else {
        this.secondList = this.prevIndexData();
        setTimeout(() => {
          this.secondScrollOffset =
            this.firstScrollOffset -
            this.secondPager.nativeElement.clientHeight -
            newOffset;
        }, 100);
      }
      sub.complete();
    });
  }

  changeActivePage() {
    return new Observable((sub) => {
      this._activePage = !this._activePage;

      if (this.currentDirection === DirectionEnum.DOWN) {
        this.index += this.itemPerPage;
      } else {
        this.index -= this.itemPerPage;
      }

      this.currentDirection =
        this.currentDirection == DirectionEnum.DOWN
          ? DirectionEnum.UP
          : DirectionEnum.DOWN;
      console.log('Change ActivePage', this.currentDirection);
      sub.complete();
    });
  }

  prevIndexData(): any[] {
    return this.getData(this.index - this.itemPerPage);
  }

  nextIndexData(): any[] {
    return this.getData(this.index + this.itemPerPage);
  }

  getData(index: number): any[] {
    const len = this.data.length;
    const start = index < 0 ? 0 : index;
    const end = index + this.itemPerPage > len ? len : index + this.itemPerPage;
    return this.data.slice(start, end);
  }
}
