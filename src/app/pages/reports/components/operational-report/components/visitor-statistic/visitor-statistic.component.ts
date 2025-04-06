import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  NgZone,
  ViewChild,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';
import { VisitorsService } from 'src/app/_metronic/layout/core/services/reports/visitors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneratePdfService } from 'src/app/_metronic/layout/core/services/reports/generate-pdf.service';
import * as moment from 'moment-hijri';

@Component({
  selector: 'app-visitor-statistic',
  templateUrl: './visitor-statistic.component.html',
  styleUrl: './visitor-statistic.component.scss',
})
export class VisitorStatisticComponent {
  @ViewChild('chartdiv', { static: true }) chartDiv!: ElementRef;
  private root!: am5.Root;
  private series!: am5percent.PieSeries;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _VisitorsService = inject(VisitorsService);
  private readonly _DashboardService = inject(DashboardService);
  private readonly _GeneratePdfService = inject(GeneratePdfService);
  private readonly fb = inject(FormBuilder);
  private totalLabel!: am5.Label;

  data: any[] = [];
  username: string;
  visitorsSummary: any = {};
  seasonalVisitCounts: any[] = [];
  HeritageSitesVisitors: any[] = [];
  totalNumberOfVisitors: number = 0;

  // Form data parameters
  NationalityId!: number | null;
  Classification!: string | null;
  StartDate!: string | null;
  EndDate!: string | null;
  formGroup!: FormGroup;

  isLoading = false;
  nations: any[] = [];
  placesType: any[] = [
    { name: 'تاريخي', id: 0 },
    { name: 'أثري', id: 1 },
    { name: 'ثقافي', id: 2 },
    { name: 'طبيعي', id: 3 },
    { name: 'ديني', id: 4 },
  ];

  today: any;
  startDate: any = 'YYYY-MM-DD';
  endDate: any = 'YYYY-MM-DD';

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.username = localStorage.getItem('username') || '';
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      NationalityId: [null],
      Classification: [null],
      StartDate: [null],
      EndDate: [null],
    });

    this.getVisitorsSummary();
    this.getSeasonalVisitCounts();
    this.getHeritageSitesVisitors();
    this.getNation();
    this.today = this.convertToHijri(new Date());
  }

  convertToHijri(date: Date): string {
    return moment(date).locale('ar-SA').format('iD iMMMM iYYYY');
  }

  getVisitorsSummary(params: any = {}) {
    const defaultParams = {
      NationalityId: params.NationalityId || null,
      Classification: params.Classification || null,
      StartDate: params.StartDate || null,
      EndDate: params.EndDate || null,
    };

    this._VisitorsService.getvisitorsSummary(defaultParams).subscribe(
      (response) => {
        this.visitorsSummary = response.body.data;
        this.totalNumberOfVisitors = this.visitorsSummary.totalVisitors;

        this.updateChart(); // Update the chart with API data
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching visitor statistics', error);
      }
    );
  }

  getSeasonalVisitCounts(params: any = {}) {
    const defaultParams = {
      NationalityId: params.NationalityId || null,
      Classification: params.Classification || null,
      StartDate: params.StartDate || null,
      EndDate: params.EndDate || null,
    };

    this._VisitorsService.getseasonalVisitCounts(defaultParams).subscribe(
      (response) => {
        this.seasonalVisitCounts = response.body.data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching visitor statistics', error);
      }
    );
  }

  getHeritageSitesVisitors(params: any = {}) {
    const defaultParams = {
      NationalityId: params.NationalityId || null,
      Classification: params.Classification || null,
      StartDate: params.StartDate || null,
      EndDate: params.EndDate || null,
    };

    this._VisitorsService.getHeritageSitesVisitors(defaultParams).subscribe(
      (response) => {
        this.HeritageSitesVisitors = response.body.data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching visitor statistics', error);
      }
    );
  }

  updateChart() {
    if (this.series) {
      const chartData = [
        { category: 'الزوار الجدد', value: this.visitorsSummary.newVisitors },
        { category: 'العائدين', value: this.visitorsSummary.returningVisitors },
      ];

      this.series.data.setAll(chartData);

      // Update the total visitors label
      this.totalLabel.set(
        'text',
        `[fontSize:13px]جميع الزوار[/]\n[bold fontSize:20px]${this.visitorsSummary.totalVisitors}[/]`
      );
    }
  }

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

  getNation() {
    this.dashboardService.getNation().subscribe({
      next: (res) => {
        this.nations = res.data;
      },
    });
  }

  lastSubmittedParams = {};
  onSubmit() {
    if (this.formGroup?.valid) {
      const getLocalDate = (dateValue: any) => {
        if (!dateValue) return null;
        const date = new Date(dateValue);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      };

      const params: any = {
        NationalityId: this.formGroup?.get('NationalityId')?.value || null,
        Classification: this.formGroup?.get('Classification')?.value || null,
        StartDate: getLocalDate(this.formGroup?.get('StartDate')?.value),
        EndDate: getLocalDate(this.formGroup?.get('EndDate')?.value),
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === '') {
          delete params[key];
        }
      });
      this.lastSubmittedParams = params;
      this.getHeritageSitesVisitors(params);
      this.getSeasonalVisitCounts(params);
      this.getVisitorsSummary(params);

      this.startDate = params.StartDate;
      this.endDate = params.EndDate;
    }
  }

  exportPDF() {
    this._VisitorsService
      .heritageSitesVisitorsReport(this.lastSubmittedParams)
      .subscribe(
        (res: any) => {
          console.log('API Response:', res);
          const responseBody = res.body ? res.body : res;
          if (responseBody?.data) {
            this._GeneratePdfService.dwonloadWithAuth(
              { file: responseBody.data, fileName: 'report.pdf' },
              'pdf'
            );
          } else {
            console.error(
              'Invalid response format or missing file data',
              responseBody
            );
          }
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
