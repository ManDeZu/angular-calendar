import { Injectable } from '@angular/core';
import {
  MonthView,
  getMonthView,
  GetMonthViewArgs,
  getMonthViewHeader,
  GetMonthViewHeaderArgs,
  MonthDay,
  MonthViewJoursPlanningByUser,
  getMonthViewBody,
  GetMonthViewBodyArgs,
  WeekView,
  getWeekView,
  GetWeekViewArgs,
  getWeekViewHeader,
  GetWeekViewHeaderArgs,
  WeekDay,
  getDayView,
  GetDayViewArgs,
  getDayViewHourGrid,
  GetDayViewHourGridArgs,
  DayView,
  DayViewHour,
} from 'calendar-utils';

@Injectable()
export class CalendarUtils {

  getMonthView(args: GetMonthViewArgs): MonthView {
    return getMonthView(args);
  }

  getMonthViewHeader(args: GetMonthViewHeaderArgs): MonthDay[] {
    return getMonthViewHeader(args);
  } 

  getMonthViewBody(args: GetMonthViewBodyArgs): MonthViewJoursPlanningByUser[] {
    return getMonthViewBody(args);
  } 

  getWeekViewHeader(args: GetWeekViewHeaderArgs): WeekDay[] {
    return getWeekViewHeader(args);
  }

  getWeekView(args: GetWeekViewArgs): WeekView {
    return getWeekView(args);
  }

  getDayView(args: GetDayViewArgs): DayView {
    return getDayView(args);
  }

  getDayViewHourGrid(args: GetDayViewHourGridArgs): DayViewHour[] {
    return getDayViewHourGrid(args);
  }
}
