import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef
} from '@angular/core';
import {
  CalendarEvent,
  MonthDay,
  MonthView,
  MonthViewDay,
  ViewPeriod,
  MonthViewJoursPlanningByUser,
  MonthViewJourPlanningRows
} from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import isSameDay from 'date-fns/is_same_day/index';
import setDate from 'date-fns/set_date/index';
import setMonth from 'date-fns/set_month/index';
import setYear from 'date-fns/set_year/index';
import getDate from 'date-fns/get_date/index';
import getMonth from 'date-fns/get_month/index';
import getYear from 'date-fns/get_year/index';
import differenceInSeconds from 'date-fns/difference_in_seconds/index';
import addSeconds from 'date-fns/add_seconds/index';
import { CalendarEventTimesChangedEvent } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, trackByIndex } from '../common/util';
import { getDaysInMonth, eachDay, startOfMonth, lastDayOfMonth, isBefore, isFuture, isPast, isToday } from 'date-fns';
import { forEach } from '@angular/router/src/utils/collection';

export interface CalendarMonthViewBeforeRenderPlanning {
  header: MonthDay[];
  body: MonthViewJoursPlanningByUser[];
  period: ViewPeriod;
}

export interface CalendarMonthViewEventTimesChangedEvent
  extends CalendarEventTimesChangedEvent {
  day: MonthViewDay;
}


@Component({
  selector: 'mwl-calendar-month-view',
  template: `
    <div class="cal-month-view">
      <div class = "row">
        <div class = "col-md-2">
        </div>
        <div class = "col-md-10">
          <mwl-calendar-month-view-header
            [days]="columnHeaders"
            [locale]="locale"
            [customTemplate]="headerTemplate">
          </mwl-calendar-month-view-header>
        </div>
      </div>
      <div class = "row">
        <div class = "col-md-2">
          <mwl-calendar-month-view-body
            [joursPlanningByUsers]="joursPlanningByUsers"
            [locale]="locale"
            [customTemplate]="bodyTemplate">
          </mwl-calendar-month-view-body>
        </div>
      </div>
    </div>
  `
})
export class CalendarMonthViewComponent
  implements OnChanges, OnInit, OnDestroy {
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view.
   * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  // @Input() events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

  /**
   * Whether the events list for the day of the `viewDate` option is visible or not
   */
  // @Input() activeDayIsOpen: boolean = false;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string = 'fr';

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement: string = 'top';

  /**
   * A custom template to use for the event tooltips
   */
  @Input() tooltipTemplate: TemplateRef<any>;

  /**
   * Whether to append tooltips to the body or next to the trigger element
   */
  @Input() tooltipAppendToBody: boolean = true;

  /**
   * A custom template to use to replace the header
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use to replace the day cell
   */
  // @Input() cellTemplate: TemplateRef<any>;

  /**
   * A custom template to use for the slide down box of events for the active day
   */
  // @Input() openDayEventsTemplate: TemplateRef<any>;

  /**
   * A custom template to use for event titles
   */
  // @Input() eventTitleTemplate: TemplateRef<any>;

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  // @Input() weekendDays: number[];


  @Input() joursPlanningByUsers: MonthViewJoursPlanningByUser[];

  /**
   * An output that will be called before the view is rendered for the current month.
   * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
   */
  @Output()
  beforeViewRender = new EventEmitter<CalendarMonthViewBeforeRenderPlanning>();

  /**
   * Called when the day cell is clicked
   */
  @Output()
  dayClicked = new EventEmitter<{
    day: MonthViewDay;
  }>();

  /**
   * Called when the event title is clicked
   */
  // @Output()
  // eventClicked = new EventEmitter<{
  //   event: CalendarEvent;
  // }>();

  /**
   * Called when an event is dragged and dropped
   */
  // @Output()
  // eventTimesChanged = new EventEmitter<
  //   CalendarMonthViewEventTimesChangedEvent
  // >();

  /**
   * @hidden
   */
  columnHeaders: MonthDay[] = [];

  monthDays: any;

  /**
   * @hidden
   */
  view: MonthView;

  /**
   * @hidden
   */
  days: MonthViewDay[] = [];

  /**
   * @hidden
   */
  openRowIndex: number;

  /**
   * @hidden
   */
  openDay: MonthViewDay;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  trackByIndex = trackByIndex;

  /**
   * @hidden
   */
  trackByDate = (index: number, day: MonthViewDay) => day.date.toISOString();

  trackByJoursPlanningByUser = (index: number, joursPlanningByUser: MonthViewJoursPlanningByUser) => joursPlanningByUser ? joursPlanningByUser.id : joursPlanningByUser;

  /**
   * @hidden
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private utils: CalendarUtils,
    @Inject(LOCALE_ID) locale: string
  ) {
    this.locale = locale;
  }


  /**
   * @hidden
   */
  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    } else {
      this.columnHeaders = this.getMonthDays();      
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
      this.refreshHeader();
    }

    // if (changes.events) {
    //   validateEvents(this.events);
    // }

    if (
      changes.viewDate ||
      changes.events ||
      changes.excludeDays ||
      changes.weekendDays
    ) {
      this.refreshBody();
    }

    // if (
    //   changes.activeDayIsOpen ||
    //   changes.viewDate ||
    //   changes.events ||
    //   changes.excludeDays
    // ) {
    //   this.checkActiveDayIsOpen();
    // }
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  // toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
  //   this.view.days.forEach(day => {
  //     if (isHighlighted && day.events.indexOf(event) > -1) {
  //       day.backgroundColor = event.color.secondary;
  //     } else {
  //       delete day.backgroundColor;
  //     }
  //   });
  // }

  // /**
  //  * @hidden
  //  */
  // eventDropped(day: MonthViewDay, event: CalendarEvent): void {
  //   const year: number = getYear(day.date);
  //   const month: number = getMonth(day.date);
  //   const date: number = getDate(day.date);
  //   const newStart: Date = setDate(
  //     setMonth(setYear(event.start, year), month),
  //     date
  //   );
  //   let newEnd: Date;
  //   if (event.end) {
  //     const secondsDiff: number = differenceInSeconds(newStart, event.start);
  //     newEnd = addSeconds(event.end, secondsDiff);
  //   }
  //   this.eventTimesChanged.emit({ event, newStart, newEnd, day });
  // }

  /**
   * @hidden
   */
  // handleDayClick(clickEvent: any, day: MonthViewDay) {
  //   // when using hammerjs, stopPropagation doesn't work. See https://github.com/mattlewis92/angular-calendar/issues/318
  //   if (!clickEvent.target.classList.contains('cal-event')) {
  //     this.dayClicked.emit({ day });
  //   }
  // }

  private refreshHeader(): void {
    this.columnHeaders.length = 0;
    this.columnHeaders = this.getMonthDays();
    this.emitBeforeViewRender();
  }

  private refreshBody(): void {
    this.view = null;
    this.view = this.utils.getMonthView({
      viewDate: this.viewDate,
      joursPlanningByUsers: this.joursPlanningByUsers
    });
    this.emitBeforeViewRender();
  }

  // private checkActiveDayIsOpen(): void {
  //   if (this.activeDayIsOpen === true) {
  //     this.openDay = this.view.days.find(day =>
  //       isSameDay(day.date, this.viewDate)
  //     );
  //     const index: number = this.view.days.indexOf(this.openDay);
  //     // this.openRowIndex =
  //     //   Math.floor(index / this.view.totalDaysVisibleInWeek) *
  //     //   this.view.totalDaysVisibleInWeek;
  //   } else {
  //     this.openRowIndex = null;
  //     this.openDay = null;
  //   }
  // }

  private refreshAll(): void {
    // this.columnHeaders = null;
    this.view = null;
    this.refreshHeader();
    this.refreshBody();
    // this.checkActiveDayIsOpen();
  }

  private emitBeforeViewRender(): void {
    if (this.columnHeaders && this.view) {
      this.beforeViewRender.emit({
        header: this.columnHeaders,
        body: this.view.joursPlanningByUsers,
        period: this.view.period
      });
    }
  }

  private getMonthDays(): MonthDay[] {
    const start: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const end: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() +1, 0);
    const monthDays: Date[] = eachDay(start, end);
    for(const day of monthDays) {
      const monthDay = {
        date: day,
        dayNumber: day.getDate(),
        isPast: (isPast(day) ? true : false),
        isToday: (isToday(day) ? true : false),
        isFuture: (isFuture(day) ? true : false)
      };
      this.columnHeaders.push(monthDay);
    }
    return this.columnHeaders;
  }
}
