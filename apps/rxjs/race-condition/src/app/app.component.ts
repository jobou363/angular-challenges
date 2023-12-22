import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <ng-container *ngIf="topics$ | async as topics">
      <button [disabled]="topics.length === 0" (click)="openTopicModal(topics)">
        Open Topic
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class AppComponent implements OnInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);

  readonly topics$: Observable<TopicType[]> = this.topicService
    .fakeGetHttpTopic()
    .pipe(startWith([]));

  ngOnInit(): void {}

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics,
      },
    });
  }
}
