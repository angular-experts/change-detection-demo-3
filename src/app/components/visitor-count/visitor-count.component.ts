import {Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-visitor-count',
  templateUrl: './visitor-count.component.html',
  styleUrls: ['./visitor-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitorCountComponent implements OnInit {

  @Input() newVisitor: Observable<any>;
  visitorCount = 0;

  constructor(private cdr: ChangeDetectorRef) {

    console.log('constructor....');
    this.newVisitor = this.getData();
  }

  ngOnInit() {
    console.log('ngOnInit....');
    this.newVisitor.subscribe(() => {
      this.visitorCount ++;
      this.cdr.markForCheck();
    });
  }

  getData(): Observable<any> {
    return  Observable.create(function (observer) {
      observer.next(1);
      observer.next(1);
      observer.next(1);
      setTimeout(() => {
        observer.next(1);
        observer.complete();
      }, 1000);
    });
  }


}
