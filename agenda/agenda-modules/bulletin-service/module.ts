import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { AgendaUtilsModule } from '../agenda-utils/module';
import { AgendaComponent } from './component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import localeFr from '@angular/common/locales/fr';
import { ContextMenuModule } from 'ngx-contextmenu';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    DragAndDropModule,
    AgendaUtilsModule,
    RouterModule.forChild([{ path: '', component: AgendaComponent }])
  ],
  declarations: [AgendaComponent],
  exports: [AgendaComponent]
})
export class AgendaModule {}
