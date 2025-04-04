import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Lists
import { ListsWidget3Component } from './lists/lists-widget3/lists-widget3.component';
import { ListsWidget4Component } from './lists/lists-widget4/lists-widget4.component';

// Other
import { DropdownMenusModule } from '../dropdown-menus/dropdown-menus.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsWidget1Component } from './charts/charts-widget1/charts-widget1.component';
import { TablesWidget1Component } from './tables/tables-widget1/tables-widget1.component';
import { TablesWidget2Component } from './tables/tables-widget2/tables-widget2.component';
import { TablesWidget10Component } from './tables/tables-widget10/tables-widget10.component';
// new
import { CardsWidget20Component } from './_new/cards/cards-widget20/cards-widget20.component';
import { CardsWidget17Component } from './_new/cards/cards-widget17/cards-widget17.component';
import { CardsWidget7Component } from './_new/cards/cards-widget7/cards-widget7.component';
import { NewChartsWidget8Component } from './_new/charts/new-charts-widget8/new-charts-widget8.component';
import { CardsWidget18Component } from './_new/cards/cards-widget18/cards-widget18.component';
import { SharedModule } from '../../../shared/shared.module';
import { CardsWidget8Component } from './_new/cards/cards-widget8/cards-widget8.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AccordionModule } from 'primeng/accordion';
import { SemiPieComponent } from './charts/semi-pie/semi-pie.component';
import { CardsWidget19Component } from './_new/cards/cards-widget19/cards-widget19.component';
import { HeritageCardsWidget1Component } from './_new/cards/heritage-cards-widget1/heritage-cards-widget1.component';
import { HeritageCardsWidget2Component } from './_new/cards/heritage-cards-widget2/heritage-cards-widget2.component';
@NgModule({
  declarations: [
    // Lists
    ListsWidget3Component,
    ListsWidget4Component,
    // Other
    ChartsWidget1Component,
    TablesWidget1Component,
    TablesWidget2Component,
    TablesWidget10Component,
    CardsWidget20Component,
    CardsWidget17Component,
    CardsWidget7Component,
    NewChartsWidget8Component,
    CardsWidget18Component,
    CardsWidget8Component,
    SemiPieComponent,
    CardsWidget19Component,
    HeritageCardsWidget1Component,
    HeritageCardsWidget2Component,
  ],
  imports: [
    CommonModule,
    DropdownMenusModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
    SharedModule,
    RouterModule,
    SweetAlert2Module.forChild(),
    AccordionModule,
  ],
  exports: [
    // Lists
    ListsWidget3Component,
    ListsWidget4Component,
    // Other
    ChartsWidget1Component,
    TablesWidget1Component,
    TablesWidget2Component,
    TablesWidget10Component,
    // new
    CardsWidget20Component,
    CardsWidget17Component,
    CardsWidget7Component,
    NewChartsWidget8Component,
    CardsWidget18Component,
    CardsWidget8Component,
    SemiPieComponent,
    CardsWidget19Component,
    HeritageCardsWidget1Component,
    HeritageCardsWidget2Component,
  ],
})
export class WidgetsModule {}
