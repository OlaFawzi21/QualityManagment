import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { getCSSVariableValue } from '../../../../../../kt/_utils';
import { DashboardService } from 'src/app/_metronic/layout/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-new-charts-widget8',
  templateUrl: './new-charts-widget8.component.html',
  styleUrls: ['./new-charts-widget8.component.scss'],
})
export class NewChartsWidget8Component implements OnInit {
  @ViewChild('weekChart') weekChart: ElementRef<HTMLDivElement>;
  @ViewChild('monthChart') monthChart: ElementRef<HTMLDivElement>;
  @ViewChild('yearChart') yearChart: ElementRef<HTMLDivElement>;

  @Input() chartHeight: string = '425px';
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = '';
  tab: 'Week' | 'Month' | 'Year' = 'Week';
  chart1Options: any = {};
  chart2Options: any = {};
  chart3Options: any = {};
  hadDelay: boolean = false;
  dates: any[] = [];
  values: any[] = [];
  monthValues: any[] = [];
  datesOfMonth: any[] = [];
  yearValues: any[] = [];
  datesOfYear: any[] = [];
  weeks: any[] = [];
  months: any[] = [];
  years: any[] = [];
  private readonly _DashboardService = inject(DashboardService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getWeekStatistics();
    this.getMonthStatistics();
    this.getYearStatistics();
    this.setupCharts();
  }

  init() {
    this.chart1Options = getChart1Options(
      this.chartHeightNumber,
      this.weeks,
      this.values
    );
    this.chart2Options = getChart2Options(
      this.chartHeightNumber,
      this.months,
      this.monthValues
    );
    this.chart3Options = getChart3Options(
      this.chartHeightNumber,
      this.years,
      this.yearValues
    );
    this.cdr.detectChanges();
  }

  getWeekStatistics() {
    const param = { interval: 1 };
    this._DashboardService.getStatisticsForChart(param).subscribe({
      next: (response: any) => {
        if (
          response &&
          response.body.isSuccess &&
          Array.isArray(response.body.data)
        ) {
          this.dates = response.body.data.map(
            (item: { date: any }) => item.date
          );
          this.values = response.body.data.map(
            (item: { value: any }) => item.value
          );

          // Generate weeks array in "week-{number}" format
          this.weeks = this.dates.map(
            (date) => `الأسبوع-${this.getWeekNumber(date)}`
          );
          this.chart1Options = getChart1Options(
            this.chartHeightNumber,
            this.weeks,
            this.values
          );

          this.cdr.detectChanges();
        } else {
          this.dates = [];
          this.values = [];
          this.weeks = [];
        }
      },
    });
  }

  getMonthStatistics() {
    const param = { interval: 2 };
    this._DashboardService.getStatisticsForChart(param).subscribe({
      next: (response: any) => {
        if (
          response &&
          response.body.isSuccess &&
          Array.isArray(response.body.data)
        ) {
          this.datesOfMonth = response.body.data.map(
            (item: { date: any }) => item.date
          );
          this.monthValues = response.body.data.map(
            (item: { value: any }) => item.value
          );
          this.months = this.datesOfMonth.map(
            (date) => `${this.getMonthName(date)}`
          );
          console.log(this.months);

          this.chart2Options = getChart2Options(
            this.chartHeightNumber,
            this.months,
            this.monthValues
          );

          this.cdr.detectChanges();
        } else {
          console.error('Invalid response format:', response);
          this.dates = [];
          this.values = [];
          this.weeks = [];
          this.months = [];
        }
      },
    });
  }
  getYearStatistics() {
    const param = { interval: 3 };
    this._DashboardService.getStatisticsForChart(param).subscribe({
      next: (response: any) => {
        if (
          response &&
          response.body.isSuccess &&
          Array.isArray(response.body.data)
        ) {
          this.datesOfYear = response.body.data.map(
            (item: { date: any }) => item.date
          );
          this.yearValues = response.body.data.map(
            (item: { value: any }) => item.value
          );
          this.years = this.datesOfYear.map((date) => `${this.getYear(date)}`);
          this.chart3Options = getChart3Options(
            this.chartHeightNumber,
            this.years,
            this.yearValues
          );
          console.log(this.years);

          this.cdr.detectChanges();
        } else {
          console.error('Invalid response format:', response);
          this.dates = [];
          this.values = [];
          this.weeks = [];
          this.months = [];
          this.years = [];
        }
      },
    });
  }

  getWeekNumber(dateString: string): number {
    const date = new Date(dateString);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const dayOfYear =
      Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)) +
      1;
    return Math.ceil(dayOfYear / 7);
  }
  getMonthName(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = [
      'يناير',
      'فبراير',
      'مارس',
      'ابريل',
      'مايو',
      'يونيو',
      'يوليو',
      'اغسطس',
      'سبتمبر',
      'اكتوبر',
      'نوفمبر',
      'ديسمبر',
    ];
    return monthNames[date.getMonth()]; // Returns month name
  }
  getYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString(); // Returns the year as a string
  }

  setTab(_tab: 'Week' | 'Month' | 'Year') {
    this.tab = _tab;
    if (_tab === 'Week') {
      this.getWeekStatistics();
      this.chart2Options = getChart1Options(
        this.chartHeightNumber,
        this.weeks,
        this.values
      );
    }

    if (_tab === 'Month') {
      this.getMonthStatistics();
      this.chart1Options = getChart2Options(
        this.chartHeightNumber,
        this.months,
        this.monthValues
      );
    }
    if (_tab === 'Year') {
      this.getYearStatistics();
      this.chart3Options = getChart3Options(
        this.chartHeightNumber,
        this.years,
        this.yearValues
      );
    }

    this.setupCharts();
    this.init();
    this.cdr.detectChanges();
  }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.init();
      this.cdr.detectChanges();
    }, 100);
  }
}

function getChart1Options(chartHeightNumber: number, dates: any, values: any) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-warning');
  const lightColor = getCSSVariableValue('--bs-warning-light');

  return {
    series: [
      {
        name: 'المستخدمون الجدد',
        data: values.reverse(),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.7,
    },
    stroke: {
      curve: 'straight',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: dates.reverse(),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        offsetX: -5,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      // y: {
      //   formatter: function (val: number) {
      //     return '$' + val + ' thousands';
      //   },
      // },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}

function getChart2Options(chartHeightNumber: number, dates: any, values: any) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-warning');
  const lightColor = getCSSVariableValue('--bs-warning-light');

  return {
    series: [
      {
        name: 'المستخدمون الجدد',
        data: values.reverse(),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.7,
    },
    stroke: {
      curve: 'straight',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: dates.reverse(),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        offsetX: -10,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      // y: {
      //   formatter: function (val: number) {
      //     return '$' + val + ' thousands';
      //   },
      // },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
function getChart3Options(chartHeightNumber: number, dates: any, values: any) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-warning');
  const lightColor = getCSSVariableValue('--bs-warning-light');

  return {
    series: [
      {
        name: 'المستخدمون الجدد',
        data: values.reverse(),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.7,
    },
    stroke: {
      curve: 'straight',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: dates.reverse(),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        offsetX: -10,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      // y: {
      //   formatter: function (val: number) {
      //     return '$' + val + ' thousands';
      //   },
      // },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
