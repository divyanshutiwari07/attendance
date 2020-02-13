import {Component, OnInit, HostListener} from '@angular/core';
import {Chart} from 'chart.js';
import {ApiService} from '../../services/api.service';
import * as Utils from '../../common/utils';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';
import { UserService } from '../../services/user.service';

const BACK_YEARS_COUNT = 5;
// const TOTAL_EMP = 20;

@Component({
  selector: 'app-attendance-stats',
  templateUrl: './attendance-stats.component.html',
  styleUrls: ['./attendance-stats.component.scss']
})
export class AttendanceStatsComponent implements OnInit {
  public lineChartMonthly;
  public pieChartMonthly;
  public lineChartYearly;
  public pieChartYearly;
  public chartData;
  public selectedYear;
  public selectedMonth;
  public years = [];
  public months = [];

  private report = {
    month: {
      attendancePercentage: 0
    },
    year: {
      attendancePercentage: 0
    }
  };
  public totalEmp;

  constructor(
    private apiService: ApiService,
    private notifyService: NotificationService,
    private userService: UserService
  ) {
    this.initializeMonthDropdown();
    this.initializeYearDropdown();
  }
  getRegisterUserData() {
    this.userService.loadRegisterUsers().subscribe(data => {
        this.totalEmp = (<any>data).count;
        // console.log('registerUserData1', data);
    });
  }

  initializeYearDropdown() {
    for ( let i = 0; i < BACK_YEARS_COUNT; i++ ) {
        const row = {year: null, startTimeStamp: null, endTimeStamp: null};
        const year = new Date().getFullYear() - i;
        row.year = year;
        row.startTimeStamp = Utils.getStartTimeStampOfYear(year);
        row.endTimeStamp = Utils.getEndTimeStampOfYear(year);
        this.years.push( row );
    }
  }

  initializeMonthDropdown() {
    this.months = [
      {name: 'Jan', number: '01'},
      {name: 'Feb', number: '02'},
      {name: 'Mar', number: '03'},
      {name: 'Apr', number: '04'},
      {name: 'May', number: '05'},
      {name: 'Jun', number: '06'},
      {name: 'Jul', number: '07'},
      {name: 'Aug', number: '08'},
      {name: 'Sep', number: '09'},
      {name: 'Oct', number: '10'},
      {name: 'Nov', number: '11'},
      {name: 'Dec', number: '12'},
    ];
  }

  ngOnInit() {
    this.getRegisterUserData();
    // this.checkRegisterUserDataPresent();
    this.selectedYear = this.years[0];
    // console.log('oninit', this.selectedYear, '', this.selectedMonth.number);
    this.selectedMonth = this.months[ new Date().getMonth() ];
    this.getYearReportForAllEmployees();

    // Chart.pluginService.register(Utils.getRandomColor());
  }

  private showMonthlyPieChart() {
    const absentPercentage = (100 - this.report.month.attendancePercentage).toFixed(2);
    const dataset = [this.report.month.attendancePercentage, parseFloat(absentPercentage)];

    // console.log( 'MOnth:showMonthlyPieChart:', dataset);
    if (!this.pieChartMonthly ) {
      this.pieChartMonthly = new Chart('pieChartMonthly', {
        type: 'pie',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [{
            label: '# of Votes',
            data: dataset,
            backgroundColor :
            [
              '#3B566E',
              '#DEDEDE'
            ],
            borderColor: '#000000',
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text: 'Pie Chart',
            display: true,
            fontColor: '#000000'
          },
          legend: {
            onClick: (e) => e.stopPropagation(),
            labels: {
              fontColor: 'black'
            },
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      this.pieChartMonthly.data.datasets[0].data = dataset;
      this.pieChartMonthly.update();
    }
  }

  private showYearlyPieChart() {
    const absentPercentage = (100 - this.report.year.attendancePercentage).toFixed(2);
    const dataset = [this.report.year.attendancePercentage, parseFloat(absentPercentage)];

    if (!this.pieChartYearly ) {
      this.pieChartYearly = new Chart('pieChartYearly', {
        type: 'pie',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [{
            label: 'Attendance %',
            data: dataset,
            backgroundColor :
            [
              '#3B566E',
              '#DEDEDE'
            ],
            borderColor: '#000000',
            borderWidth: 1
          }]
        },
        options: {
          title: {
            text: 'Pie Chart',
            display: true,
            fontColor: '#000000'
          },
          legend: {
            onClick: (e) => e.stopPropagation(),
            labels: {
              fontColor: 'black'
            },
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      this.pieChartYearly.data.datasets[0].data = dataset;
      this.pieChartYearly.update();
    }
  }

  private showMonthlyBarChart() {
    const dayCount = Utils.getDayCountInMonth(this.selectedMonth.number, this.selectedYear.year);
    const monthLabel = [];
    for (let i = 0; i <= dayCount - 1; i++) {
      monthLabel[i] = (i + 1).toString();
    }
    // console.log('monthlabel', monthLabel);
    const dataset = [];
    let workingDayCountForMonth = 0;
    if (!this.chartData) { return; }
    const monthData = this.chartData.filter(d => {
      return d.date.split('-')[1] === this.selectedMonth.number
          && d.date.split('-')[2] === this.selectedYear.year.toString();
    });
    const totalEmpCountForMonth = monthData.reduce((a, {count}) => a + count, 0);

    for (let i = 1; i <= dayCount; i++ ) {

      dataset[i] = monthData.find(d => {
        return parseInt(d.date.split('-')[0], 0) === i;
      });

      if ( dataset[i] ) {
        workingDayCountForMonth += 1;
        dataset[i - 1] =  ((dataset[i].count / this.totalEmp) * 100).toFixed(2);
        // dataset[i - 1] = dataset[i].count ;
      } else {
        dataset[i] = 0;
      }
    }

    const attendancePercentage = (((totalEmpCountForMonth / workingDayCountForMonth) / this.totalEmp) * 100).toFixed(2);
    this.report.month.attendancePercentage = parseFloat(attendancePercentage);

    if ( !this.lineChartMonthly ) {
      const _this = this;
      this.lineChartMonthly = new Chart('lineChartMonthly', {
        type: 'bar',
        data: {
          // tslint:disable-next-line:max-line-length
          labels: monthLabel,
          datasets: [
            {
              data: dataset,
              label: 'Present',
              fill: false,
              backgroundColor : '#3B566E',
              borderColor: '#000000',
              borderWidth: 1
            },
          ]
        },
        options: {
          title: {
            text: 'Bar Chart',
            display: true,
            fontColor: '#000000'
          },
          // tooltips: {
          //   enabled: true,
          //   mode: 'point',
          //   callbacks: {
          //     label: function (tooltipItem, data) {
          //       const label = data.datasets[tooltipItem.datasetIndex].label;
          //       const yValue = tooltipItem.yLabel;
          //       // const xValue = tooltipItem.xLabel;
          //       return label + ': fs' + yValue;
          //     },
          //     footer: function (tooltipItem, data) {
          //       return ['new line', 'another line'];
          //     }
          //   }
          // },

          tooltips: {

            custom: function(tooltip) {
              if (!tooltip) { return; }
              tooltip.displayColors = false;
            },
            callbacks: {
              title: function() { return ''; },
              label: function(tooltipItem, data) {
                  const date = 'Date : ' + _this.selectedMonth.name + '  ' + tooltipItem.xLabel + ', ' + _this.selectedYear.year ;
                  const value = 'Present : ' + tooltipItem.yLabel;
                  return (date + '/n' + value).split('/n');
              },

            }
          },

          legend: {
            display: false,
            labels: {
              fontColor: '#000000'
            },
          },
          elements: {
            point: {
              radius: 5,
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                beginAtZero: true,
                fontColor: '#000000',
                fontSize: 14,
                max: 100,
              },
              gridLines: {
                color: '#f2f2f2',
                drawBorder: false,
                zeroLineColor: '#f2f2f2',
              },

            }],
            xAxes: [{
              ticks: {
                fontColor: '#000000',
                fontSize: 14
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0)',
                lineWidth: 2,
              }
            }]
          }
        }
      });
    } else {
      this.lineChartMonthly.data.datasets[0].data = dataset;
      this.lineChartMonthly.data.labels = monthLabel;
      this.lineChartMonthly.update();
    }
}

  private showYearlyBarChart() {
    const _this = this;
    const dataset = [];
    const workingDayCountForYear = [];
    let workingMonthCount = 0;
    if (!this.chartData) { return; }
    const yearData = this.chartData.filter(d => {
      return d.date.split('-')[2] === this.selectedYear.year.toString();
    });
    for (let i = 0; i < 12; i++ ) {

      dataset[i] = yearData.filter(d => {
        return parseInt(d.date.split('-')[1], 0) === i + 1;
      });
      if ( dataset[i] && dataset[i].length) {
        workingMonthCount += 1;
        workingDayCountForYear[i] = Object.keys(dataset[i]).length;
        dataset[i] = (((dataset[i].reduce((a, {count}) => a + count, 0) / workingDayCountForYear[i]) / this.totalEmp) * 100).toFixed(2);
      } else {
        dataset[i] = 0;
      }
    }
    // console.log('workingmonth ', workingMonthCount);
    let attendancePercentage = dataset.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / workingMonthCount  ;
    // console.log('attendancePercentage', attendancePercentage);
    attendancePercentage = attendancePercentage || NaN;
    const attendancePercentageFixedNum = attendancePercentage.toFixed(2);
    this.report.year.attendancePercentage = parseFloat(attendancePercentageFixedNum);

    if ( !this.lineChartYearly ) {
      this.lineChartYearly = new Chart('lineChartYearly', {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: dataset,
            label: 'Present',
            borderColor: '#000000',
            backgroundColor : '#3B566E',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          title: {
            text: 'Bar Chart',
            display: true,
            fontColor: '#000000'
          },

          tooltips: {
            custom: function(tooltip) {
              if (!tooltip) { return; }
              tooltip.displayColors = false;
            },
            callbacks: {
              title: function() { return ''; },
              label: function(tooltipItem, data) {
                  const date = 'Date : '  + tooltipItem.xLabel + ', ' + _this.selectedYear.year ;
                  const value = 'Present : ' + tooltipItem.yLabel;
                  return (date + '/n' + value).split('/n');
              },

            }
          },

          legend: {
            display: false,
            labels: {
              fontColor: '#000000'
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                max: 100,
                beginAtZero: true,
                fontColor : '#000000',
                fontSize : 14,
              },
              gridLines: {
                color: '#f2f2f2',
                // color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
                zeroLineColor : '#f2f2f2',
              },

            }],
            xAxes: [{
              ticks: {
                fontColor : '#000000',
                fontSize : 14
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0)',
                lineWidth: 2,
              }
            }]
          }
        }
      });
    } else {
      this.lineChartYearly.data.datasets[0].data = dataset;
      this.lineChartYearly.update();
    }
  }

  getYearReportForAllEmployees() {
    // console.log('selectedyear', this.selectedYear);
    this.apiService.getChartData({
      'start_time': this.selectedYear.startTimeStamp,
      'end_time': this.selectedYear.endTimeStamp,
      'awi_chart_data': true }
    ).subscribe(response => {
      if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
        this.errorToaster(response.msg);
        this.chartData = response.data;
        // return [];
      } else {
        this.successToaster(response.msg);
        this.chartData = response.data;
        console.log(response);
      }
      // console.log('chart data', this.chartData);
      this.showMonthlyBarChart();
      this.showYearlyBarChart();
      this.showMonthlyPieChart();
      this.showYearlyPieChart();
    });

  }

  getAllEmployeeForSelectedMonth() {
    this.showMonthlyBarChart();
    this.showMonthlyPieChart();
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }
  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }
}
