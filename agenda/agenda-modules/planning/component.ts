import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { addDays, differenceInDays, startOfDay, addHours } from 'date-fns';
import {
  CalendarModule,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventTitleFormatter
} from 'angular-calendar';
import { colors } from '../agenda-utils/colors';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import localeFr from '@angular/common/locales/fr';
import { Equipe, BulletinService } from './custom-calendar-events';
import { MonthViewJoursPlanningByUser } from 'calendar-utils';

@Component({
  selector: 'mwl-agenda-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class AgendaComponent {
  view: string = 'month';
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  refresh: Subject<any> = new Subject();

  joursPlanningByUsers: MonthViewJoursPlanningByUser[] = [
    {
      id: 1,
      user: {
        id: 1,
        nom: 'Columbo'
      },
      joursPlanning: [
        {
          id: 1,
          date: new Date('2018-04-01T10:00:00.000Z'),
          periode: 'MAT'
        },
        {
          id: 2,
          date: new Date('2018-04-02T10:00:00.000Z'),
          periode: 'CP'
        },
        {
          id: 3,
          date: new Date('2018-04-03T10:00:00.000Z'),
          periode: 'CP'
        },
        {
          id: 4,
          date: new Date('2018-04-04T10:00:00.000Z'),
          periode: 'MAT'
        },
        {
          id: 5,
          date: new Date('2018-04-05T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 6,
          date: new Date('2018-04-06T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 7,
          date: new Date('2018-04-07T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 8,
          date: new Date('2018-04-08T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 9,
          date: new Date('2018-04-09T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 10,
          date: new Date('2018-04-10T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 11,
          date: new Date('2018-04-11T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 12,
          date: new Date('2018-04-12T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 13,
          date: new Date('2018-04-13T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 14,
          date: new Date('2018-04-14T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 15,
          date: new Date('2018-04-15T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 16,
          date: new Date('2018-04-16T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 17,
          date: new Date('2018-04-17T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 18,
          date: new Date('2018-04-18T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 19,
          date: new Date('2018-04-19T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 20,
          date: new Date('2018-04-20T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 21,
          date: new Date('2018-04-21T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 22,
          date: new Date('2018-04-22T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 23,
          date: new Date('2018-04-23T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 24,
          date: new Date('2018-04-24T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 25,
          date: new Date('2018-04-25T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 26,
          date: new Date('2018-04-26T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 27,
          date: new Date('2018-04-27T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 28,
          date: new Date('2018-04-28T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 29,
          date: new Date('2018-04-29T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 30,
          date: new Date('2018-04-30T10:00:00.000Z'),
          periode: 'NUI',
        }
      ]
    },
    {
      id: 2,
      user: {
        id: 2,
        nom: 'Starsky' 
      },
      joursPlanning: [
        {
          id: 1,
          date: new Date('2018-04-01T10:00:00.000Z'),
          periode: 'MAT'
        },
        {
          id: 2,
          date: new Date('2018-04-02T10:00:00.000Z'),
          periode: 'AM'
        },
        {
          id: 3,
          date: new Date('2018-04-03T10:00:00.000Z'),
          periode: 'AM'
        },
        {
          id: 4,
          date: new Date('2018-04-04T10:00:00.000Z'),
          periode: 'NUI'
        },
        {
          id: 5,
          date: new Date('2018-04-05T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 6,
          date: new Date('2018-04-06T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 7,
          date: new Date('2018-04-07T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 8,
          date: new Date('2018-04-08T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 9,
          date: new Date('2018-04-09T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 10,
          date: new Date('2018-04-10T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 11,
          date: new Date('2018-04-11T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 12,
          date: new Date('2018-04-12T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 13,
          date: new Date('2018-04-13T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 14,
          date: new Date('2018-04-14T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 15,
          date: new Date('2018-04-15T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 16,
          date: new Date('2018-04-16T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 17,
          date: new Date('2018-04-17T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 18,
          date: new Date('2018-04-18T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 19,
          date: new Date('2018-04-19T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 20,
          date: new Date('2018-04-20T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 21,
          date: new Date('2018-04-21T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 22,
          date: new Date('2018-04-22T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 23,
          date: new Date('2018-04-23T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 24,
          date: new Date('2018-04-24T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 25,
          date: new Date('2018-04-25T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 26,
          date: new Date('2018-04-26T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 27,
          date: new Date('2018-04-27T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 28,
          date: new Date('2018-04-28T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 29,
          date: new Date('2018-04-29T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 30,
          date: new Date('2018-04-30T10:00:00.000Z'),
          periode: 'NUI',
        }
      ]
    },
    {
      id: 3,
      user:     {
        id: 3,
        nom: 'Hutch'
      },
      joursPlanning: [
        {
          id: 1,
          date: new Date('2018-04-01T10:00:00.000Z'),
          periode: 'NUI'
        },
        {
          id: 2,
          date: new Date('2018-04-02T10:00:00.000Z'),
          periode: 'AM'
        },
        {
          id: 3,
          date: new Date('2018-04-03T10:00:00.000Z'),
          periode: 'REP'
        },
        {
          id: 4,
          date: new Date('2018-04-04T10:00:00.000Z'),
          periode: 'AM'
        },
        {
          id: 5,
          date: new Date('2018-04-05T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 6,
          date: new Date('2018-04-06T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 7,
          date: new Date('2018-04-07T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 8,
          date: new Date('2018-04-08T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 9,
          date: new Date('2018-04-09T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 10,
          date: new Date('2018-04-10T10:00:00.000Z'),
          periode: 'CP',
        },        {
          id: 11,
          date: new Date('2018-04-11T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 12,
          date: new Date('2018-04-12T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 13,
          date: new Date('2018-04-13T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 14,
          date: new Date('2018-04-14T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 15,
          date: new Date('2018-04-15T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 16,
          date: new Date('2018-04-16T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 17,
          date: new Date('2018-04-17T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 18,
          date: new Date('2018-04-18T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 19,
          date: new Date('2018-04-19T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 20,
          date: new Date('2018-04-20T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 21,
          date: new Date('2018-04-21T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 22,
          date: new Date('2018-04-22T10:00:00.000Z'),
          periode: 'NUI',
        },        {
          id: 23,
          date: new Date('2018-04-23T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 24,
          date: new Date('2018-04-24T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 25,
          date: new Date('2018-04-25T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 26,
          date: new Date('2018-04-26T10:00:00.000Z'),
          periode: 'REP',
        },        {
          id: 27,
          date: new Date('2018-04-27T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 28,
          date: new Date('2018-04-28T10:00:00.000Z'),
          periode: 'AM',
        },        {
          id: 29,
          date: new Date('2018-04-29T10:00:00.000Z'),
          periode: 'MAT',
        },        {
          id: 30,
          date: new Date('2018-04-30T10:00:00.000Z'),
          periode: 'MAT',
        }
      ]
    }
  ]

  missions: CalendarEvent[] = [
    {
      id: 4,
      start: new Date(),
      end: addHours(new Date(), 4),
      title: 'BS 1',
      color: colors.orange,
      meta: {
        bs: 1
      }    
    }
  ];

  externalEvents: CalendarEvent[] = [
    {
      title: 'Mission 3',
      color: colors.orange,
      start: new Date(),
      end: addHours(new Date(), 3),
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        bs: 1
      }
    },
    {
      title: 'Mission 4',
      color: colors.red,
      start: new Date(),
      end: addHours(new Date(), 2),
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      meta: {
        bs: 1
      }
    }
  ];

  events: any[] = [
    {
      id: 1,
      title: 'Mission 1',
      color: colors.red,
      start: new Date('2018-04-03T10:00:00.000Z'),
      end: addHours(new Date(), 6), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      },
      draggable: true,
      meta: {
        bs: 2
      }
    },
    {
      id: 2,
      title: 'Mission 2',
      color: colors.orange,
      start: new Date('2018-04-03T06:00:00.000Z'),
      end: addHours(new Date(), 7),
      resizable: {
        beforeStart: true, 
        afterEnd: true
      },
      draggable: true,
      meta: {
        bs: 2
      }
    },
    {
      start: new Date(),
      end: addHours(new Date(), 7),
      title: 'BS 1',
      color: colors.grey,
      responsable: 'Toto'
    }
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  eventDropped({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
    this.refresh.next();
  }
}
