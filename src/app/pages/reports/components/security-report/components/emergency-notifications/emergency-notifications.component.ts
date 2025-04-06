import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
@Component({
  selector: 'app-emergency-notifications',
  templateUrl: './emergency-notifications.component.html',
  styleUrl: './emergency-notifications.component.scss',
})
export class EmergencyNotificationsComponent {
  @ViewChild('chartdiv', { static: true }) chartDiv!: ElementRef;
  private root!: am5.Root;
  private series!: am5percent.PieSeries;
  username: string;

  constructor(private zone: NgZone) {
    this.username = localStorage.getItem('username') || '';
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
            valueField: 'value',
            categoryField: 'category',
            alignLabels: false,
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
            text: '[fontSize:13px]جميع الزوار[/]\n[bold fontSize:20px]8,345[/]',
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
          let colors = [am5.color('#a480be'), am5.color('#ffb966')];
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
      this.series.data.setAll([
        { category: 'الزوار الجدد', value: 40 },
        { category: 'العائدين', value: 30 },
      ]);
    });
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
