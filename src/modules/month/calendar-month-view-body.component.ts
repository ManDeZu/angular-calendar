import { Component, Input, TemplateRef } from '@angular/core';
import { MonthViewJoursPlanningByUser } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-month-view-body',
  template: `
    <ng-template
      #defaultTemplate
      let-joursPlanningByUsers="joursPlanningByUsers"
      let-locale="locale">
      <div class="cal-cell-row cal-body">
        <div
          class="cal-cell"
          *ngFor="let joursPlanningByUser of joursPlanningByUsers"
          [class.cal-user]="joursPlanningByUser.user"
          [class.cal-joursPlanning]="joursPlanningByUser.joursPlanning"
          [ngClass]="joursPlanningByUser.cssClass">
          {{joursPlanningByUser.user.nom}}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{joursPlanning: joursPlanning, locale: locale}">
    </ng-template>
  `
})
export class CalendarMonthViewBodyComponent {
  @Input() joursPlanningByUsers: MonthViewJoursPlanningByUser[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

}
