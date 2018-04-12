import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './calendar-open-day-events.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarMonthViewBodyComponent } from './calendar-month-view-body.component';
import { ContextMenuModule } from 'ngx-contextmenu';

export {
  CalendarMonthViewComponent,
  CalendarMonthViewBeforeRenderPlanning,
  CalendarMonthViewEventTimesChangedEvent
} from './calendar-month-view.component';
export { MonthViewDay as CalendarMonthViewDay } from 'calendar-utils';

@NgModule({
  imports: [CommonModule, DragAndDropModule, CalendarCommonModule, ContextMenuModule],
  declarations: [
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthViewBodyComponent
  ],
  exports: [
    DragAndDropModule,
    CalendarMonthViewComponent,
    CalendarMonthCellComponent,
    CalendarOpenDayEventsComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthViewBodyComponent
  ]
})
export class CalendarMonthModule {}
