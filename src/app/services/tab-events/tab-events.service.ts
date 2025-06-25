import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabEventsService {
  private tabClickedSubject = new Subject<string>();

  tabClicked$ = this.tabClickedSubject.asObservable();

  notifyTabClicked(tabName: string) {
    this.tabClickedSubject.next(tabName);
  }

  scrollToTop(content: any) {
    content.scrollToTop(500);
  }
}
