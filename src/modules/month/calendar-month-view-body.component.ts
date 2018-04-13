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
            class="cal-body-row"
            *ngFor="let joursPlanningByUser of joursPlanningByUsers"
            [ngClass]="joursPlanningByUser.cssClass">
            <div class="cal-body-line">
              <div class="col-md-1 no-padding"> 
                <div class="cal-body-agent">
                  {{joursPlanningByUser.user.nom}}
                </div>
              </div>
              <div class="col-md-11 no-padding">
                <div @.disabled>
                  <div class="cal-body-days cal-cell-row">
                    <div 
                      class="cal-body-day cal-cell"
                      *ngFor="let jourPlanning of joursPlanningByUser.joursPlanning"
                      [class.cal-morning]="jourPlanning.periode === 'MAT'"
                      [class.cal-afternoon]="jourPlanning.periode === 'AM'"
                      [class.cal-night]="jourPlanning.periode === 'NUI'"
                      [class.cal-rest]="jourPlanning.periode === 'REP'"
                      [class.cal-holiday]="jourPlanning.periode === 'CP'"
                      [contextMenu]="basicMenu"
                      [contextMenuSubject]="jourPlanning.date">
                      {{jourPlanning.periode}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{joursPlanningByUsers: joursPlanningByUsers, locale: locale}">
    </ng-template>
    <context-menu #basicMenu>
      <ng-template contextMenuItem>
        Action 1
      </ng-template>
      <ng-template contextMenuItem divider="true"></ng-template>
      <ng-template contextMenuItem>
        Action 2
      </ng-template>
    </context-menu>
  `
})
export class CalendarMonthViewBodyComponent {
  @Input() joursPlanningByUsers: MonthViewJoursPlanningByUser[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;
}
