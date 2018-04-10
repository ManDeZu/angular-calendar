import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
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
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }])
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
