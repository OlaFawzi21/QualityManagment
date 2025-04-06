import {
  Component,
  AfterViewInit,
  ElementRef,
  NgZone,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-semi-pie',
  templateUrl: './semi-pie.component.html',
  styleUrl: './semi-pie.component.scss',
})
export class SemiPieComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartdiv', { static: true }) chartDiv!: ElementRef;
  private root!: am5.Root;
  private series!: am5percent.PieSeries;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _DashboardService = inject(DashboardService);
  data: any[] = [];

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.getUsersCountByRegion();
  }

  private totalLabel!: am5.Label;

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      if (!this.root) {
        this.root = am5.Root.new(this.chartDiv.nativeElement);

        if (this.root._logo) {
          this.root._logo.dispose();
        }

        this.root.setThemes([am5themes_Animated.default.new(this.root)]);

        let chart = this.root.container.children.push(
          am5percent.PieChart.new(this.root, {
            startAngle: 160,
            endAngle: 380,
            layout: this.root.verticalLayout,
          })
        );

        this.series = chart.series.push(
          am5percent.PieSeries.new(this.root, {
            valueField: 'userCount',
            categoryField: 'region',
            startAngle: 160,
            endAngle: 380,
            innerRadius: am5.percent(70),
          })
        );

        // Create dynamic label & store reference
        this.totalLabel = chart.seriesContainer.children.push(
          am5.Label.new(this.root, {
            textAlign: 'center',
            centerY: am5.p100,
            centerX: am5.p50,
            text: `[fontSize:18px]مجموع الأعضاء[/]:\n[bold fontSize:30px]0[/]`,
          })
        );

        this.series.labels.template.setAll({
          text: '{category}',
          fontSize: 14,
          textAlign: 'left',
          inside: true,
          centerY: am5.p100,
          centerX: am5.p50,
          fill: am5.color('#000'),
          direction: 'ltr',
          oversizedBehavior: 'wrap',
        });
        this.series.labels.template.set('visible', false);
        this.series.set(
          'tooltip',
          am5.Tooltip.new(this.root, {
            labelText: '{category}: {value}',
            pointerOrientation: 'horizontal',
          })
        );

        this.series.get('tooltip')?.label.setAll({
          textAlign: 'left',
          fontSize: 12,
          fill: am5.color('#000'),
        });

        this.series.slices.template.adapters.add('fill', (fill, target) => {
          let colors = [
            am5.color('#6d01ba'),
            am5.color('#6f2ae7'),
            am5.color('#7367F0'),
          ];
          let dataItem = target.dataItem as
            | am5.DataItem<am5percent.IPieSeriesDataItem>
            | undefined;
          let index = dataItem ? this.series.dataItems.indexOf(dataItem) : 0;
          return colors[index % colors.length];
        });

        this.series.slices.template.adapters.add('stroke', () =>
          am5.color('#f4f4f4')
        );

        this.series.appear(1000, 100);
      }

      // Update the chart data
      this.series.data.setAll(this.data);
    });
  }

  getUsersCountByRegion() {
    this._DashboardService
      .getUsersCountByRegion()
      .subscribe((response: any) => {
        this.data = response.data;
        const totalUsers = this.data.reduce(
          (sum, item) => sum + item.userCount,
          0
        ); // Calculate total

        console.log('Updated Data:', this.data, 'Total Users:', totalUsers);

        if (this.series) {
          this.series.data.setAll(this.data);

          if (this.totalLabel) {
            this.totalLabel.set(
              'text',
              `[fontSize:18px]مجموع الأعضاء[/]\n[bold fontSize:30px]${totalUsers.toLocaleString()}[/]`
            );
          }
        } else {
          this.ngAfterViewInit();
        }

        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
