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
  view: string = 'day';
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  refresh: Subject<any> = new Subject();

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

  externalEquipes: Equipe[] = [
    {
      nom: 'Equipe 1',
      color: colors.grey
    },
    {
      nom: 'Equipe 2',
      color: colors.grey
    }
  ]

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  eventDropped({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex: number = this.externalEvents.indexOf(event);
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    this.viewDate = newStart;
    this.activeDayIsOpen = true;
    this.refresh.next();
  }
}
