import { Component, Input, TemplateRef } from '@angular/core';
import { WeekDay, MonthDay } from 'calendar-utils';
import { trackByMonthDayHeaderDate } from '../common/util';

@Component({
  selector: 'mwl-calendar-month-view-header',
  template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale">
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let day of days; trackBy:trackByMonthDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass">
          {{ day.dayNumber | number }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale}">
    </ng-template>
  `
})
export class CalendarMonthViewHeaderComponent {
  @Input() days: MonthDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  trackByMonthDayHeaderDate = trackByMonthDayHeaderDate;
}
