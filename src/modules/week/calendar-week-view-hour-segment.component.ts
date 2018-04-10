import { Component, Input, TemplateRef } from '@angular/core';
import { DayViewHourSegment } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-hour-segment',
  template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale">
      <div
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.date | calendarDate:'weekViewHour':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
    </ng-template>
  `
})
export class CalendarWeekViewHourSegmentComponent {
  @Input() segment: DayViewHourSegment;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;
}
