import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'highlight.js/styles/github.css';
import '../src/angular-calendar.scss';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTabsetModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AgendaAppComponent } from './agenda-app.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@NgModule({
  declarations: [AgendaAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbTabsetModule.forRoot(),
    NgbCollapseModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'planning',
          loadChildren: './agenda-modules/planning/module#AgendaModule',
          data: {
            label: 'PLANNING'
          }
        },
        {
          path: '**',
          redirectTo: 'planning'
        }
      ],
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  bootstrap: [AgendaAppComponent]
})
export class AgendaAppModule {}
