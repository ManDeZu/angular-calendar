import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { filter } from 'rxjs/operators/filter';
import { sources as agendaUtilsSources } from './agenda-modules/agenda-utils/sources';

interface Source {
  filename: string;
  contents: {
    raw: string;
    highlighted: string;
  };
  language: string;
}

interface Agenda {
  label: string;
  path: string;
  sources?: Source[];
}

async function getSources(folder: string): Promise<Source[]> {
  const { sources } = await import('./agenda-modules/' + folder + '/sources.ts');

  return sources.map(({ filename, contents }) => {
    const [, extension]: RegExpMatchArray = filename.match(/^.+\.(.+)$/);
    const languages: { [extension: string]: string } = {
      ts: 'typescript',
      html: 'html',
      css: 'css'
    };
    return {
      filename,
      contents: {
        raw: contents.raw
          .replace(
            ",\n    RouterModule.forChild([{ path: '', component: AgendaComponent }])",
            ''
          )
          .replace("\nimport { RouterModule } from '@angular/router';", ''),
        highlighted: contents.highlighted // TODO - move this into a regexp replace for both
          .replace(
            ',\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: AgendaComponent }])',
            ''
          )
          .replace(
            '\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;',
            ''
          )
      },
      language: languages[extension]
    };
  });
}

const dependencyVersions: any = {
  angular: require('@angular/core/package.json').version,
  angularRouter: require('@angular/router/package.json').version,
  angularCalendar: require('../package.json').version,
  calendarUtils: require('calendar-utils/package.json').version,
  angularResizableElement: require('angular-resizable-element/package.json')
    .version,
  angularDraggableDroppable: require('angular-draggable-droppable/package.json')
    .version,
  dateFns: require('date-fns/package.json').version,
  rxjs: require('rxjs/package.json').version,
  typescript: '2.2.2',
  bootstrap: require('bootstrap/package.json').version,
  zoneJs: require('zone.js/package.json').version,
  reflectMetadata: require('reflect-metadata/package.json').version,
  ngBootstrap: require('@ng-bootstrap/ng-bootstrap/package.json').version,
  rrule: require('rrule/package.json').version,
  ngxContextmenu: require('ngx-contextmenu/package.json').version,
  fontAwesome: require('font-awesome/package.json').version,
  angularCdk: require('@angular/cdk/package.json').version,
  positioning: require('positioning/package.json').version
};

@Component({
  selector: 'mwl-agenda-app',
  styleUrls: ['./agenda-app.css'],
  templateUrl: './agenda-app.html'
})
export class AgendaAppComponent implements OnInit {
  agendas: Agenda[] = [];
  activeAgenda: Agenda;
  isMenuVisible = false;
  firstAgendaLoaded = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const defaultRoute = this.router.config.find(route => route.path === '**');

    this.agendas = this.router.config
      .filter(route => route.path !== '**')
      .map(route => ({
        path: route.path,
        label: route.data['label']
      }));

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe(() => (this.firstAgendaLoaded = true));

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .pipe(
        map((event: NavigationStart) => {
          if (event.url === '/') {
            return { url: `/${defaultRoute.redirectTo}` };
          }
          return event;
        })
      )
      .subscribe(async (event: NavigationStart) => {
        this.activeAgenda = this.agendas.find(
          agenda => `/${agenda.path}` === event.url
        );
        this.activeAgenda.sources = await getSources(this.activeAgenda.path);
      });
  }
}
