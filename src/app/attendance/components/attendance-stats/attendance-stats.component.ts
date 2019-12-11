import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {GetRandomColorService} from '../../services/get-random-color.service';
import {ApiService} from '../../services/api.service';
import * as Utils from '../../common/utils';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';

const BACK_YEARS_COUNT = 5;
const TOTAL_EMP = 20;

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

  constructor(
    private randomColor: GetRandomColorService,
    private apiService: ApiService,
    private notifyService: NotificationService
  ) {
    this.initializeMonthDropdown();
    this.initializeYearDropdown();
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

    this.selectedYear = this.years[0];
    this.selectedMonth = this.months[ new Date().getMonth() ];
    this.getYearReportForAllEmployees();

    Chart.pluginService.register(this.randomColor.getRandomColor());
  }

  private showMonthlyPieChart() {

    const dataset = [this.report.month.attendancePercentage, 100 - this.report.month.attendancePercentage];

    console.log( 'MOnth:showMonthlyPieChart:', dataset);
    if (!this.pieChartMonthly ) {
      this.pieChartMonthly = new Chart('pieChartMonthly', {
        type: 'pie',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [{
            label: '# of Votes',
            data: dataset,
            backgroundColor : ['rgba(192, 192, 192, 1)',
              // #b6ccc8
            ],
            // borderColor: 'rgba(255,99,132,1)',
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
    const dataset = [this.report.year.attendancePercentage, 100 - this.report.year.attendancePercentage];
    console.log('dataset', dataset);
    if (!this.pieChartYearly ) {
      this.pieChartYearly = new Chart('pieChartYearly', {
        type: 'pie',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [{
            label: 'Attendance %',
            data: dataset,
            backgroundColor : ['rgba(192, 192, 192, 1)',
            ],
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
    const dataset = [];
    let workingDayCountForMonth = 0;
    const monthData = this.chartData.filter(d => {
      return d.date.split('-')[1] === this.selectedMonth.number
          && d.date.split('-')[2] === this.selectedYear.year.toString();
    });
    const totalEmpCountForMonth = monthData.reduce((a, {count}) => a + count, 0);

    const dayCount = Utils.getDayCountInMonth(this.selectedMonth.number, this.selectedYear.year);

    for (let i = 1; i <= dayCount; i++ ) {

      dataset[i] = monthData.find(d => {
        return parseInt(d.date.split('-')[0], 0) === i;
      });

      if ( dataset[i] ) {
        workingDayCountForMonth += 1;
        dataset[i - 1] = (dataset[i].count / TOTAL_EMP) * 100;
        // dataset[i - 1] = dataset[i].count ;
      } else {
        dataset[i] = 0;
      }
    }

    this.report.month.attendancePercentage = ((totalEmpCountForMonth / workingDayCountForMonth) / TOTAL_EMP) * 100;

    if ( !this.lineChartMonthly ) {
      this.lineChartMonthly = new Chart('lineChartMonthly', {
        type: 'bar',
        data: {
          // tslint:disable-next-line:max-line-length
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '22', '24', '25', '26', '27', '28', '29', '30', '31'],
          datasets: [
            {
              data: dataset,
              label: 'Present',
              borderColor: '#8e5ea2',
              fill: false,
              backgroundColor : 'rgba(192, 192, 192, 1)',
              borderWidth: 1
            },
          ]
        },
        options: {
          title: {
            text: 'Line Chart',
            display: true,
            fontColor: '#000000'
          },
          tooltips: {
            enabled: true,
            mode: 'point',
            callbacks: {
              label: function (tooltipItem, data) {
                const label = data.datasets[tooltipItem.datasetIndex].label;
                const yValue = tooltipItem.yLabel;
                // const xValue = tooltipItem.xLabel;
                return label + ': ' + yValue;
              },
              footer: function (tooltipItem, data) {
                return ['new line', 'another line'];
              }
              // label: function(tooltipItem, data) {
              //   return ' ' + data.datasets[tooltipItem.datasetIndex].label + '<br> ' + tooltipItem.yLabel;
              // }

              // label: function(tooltipItems, data) {
              //   return  tooltipItems.yLabel + ' : ' + tooltipItems.xLabel ;
              //   //  const  multistringText = [tooltipItems.yLabel];
              //   //         // multistringText = [tooltipItems.yLabel];
              //   //         multistringText.push('Another Item');
              //   //         multistringText.push(tooltipItems.index + 1);
              //   //         multistringText.push('One more Item');
              //   //  return multistringText;
              // }
            }
          },
          legend: {
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
      this.lineChartMonthly.update();
    }
}

  private showYearlyBarChart() {
    const dataset = [];
    const workingDayCountForYear = [];
    const yearData = this.chartData.filter(d => {
      return d.date.split('-')[2] === this.selectedYear.year.toString();
    });
    for (let i = 0; i < 12; i++ ) {

      dataset[i] = yearData.filter(d => {
        return parseInt(d.date.split('-')[1], 0) === i + 1;
      });
      if ( dataset[i] && dataset[i].length) {
        workingDayCountForYear[i] = Object.keys(dataset[i]).length;
        dataset[i] = ((dataset[i].reduce((a, {count}) => a + count, 0) / workingDayCountForYear[i]) / TOTAL_EMP) * 100;
      }
    }

    this.report.year.attendancePercentage = dataset.reduce((a, b) => a + b, 0) / 12;

    if ( !this.lineChartYearly ) {
      this.lineChartYearly = new Chart('lineChartYearly', {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: dataset,
            label: '#',
            borderColor: '#3e95cd',
            backgroundColor : 'rgba(192, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          title: {
            text: 'Line Chart',
            display: true,
            fontColor: '#000000'
          },
          legend: {
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
    this.apiService.getChartData({
      'start_time': this.selectedYear.startTimeStamp,
      'end_time': this.selectedYear.endTimeStamp,
      'awi_chart_data': true }
    ).subscribe(response => {
      if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
        this.errorToaster(response.msg);
        return;
      }
      this.successToaster(response.msg);
      this.chartData = response.data;
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
