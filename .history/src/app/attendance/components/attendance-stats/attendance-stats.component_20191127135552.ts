import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { GetRandomColorService } from '../../services/get-random-color.service';


@Component({
  selector: 'app-attendance-stats',
  templateUrl: './attendance-stats.component.html',
  styleUrls: ['./attendance-stats.component.scss']
})
export class AttendanceStatsComponent implements OnInit {
  LineChart: any = [];
  PieChart: any = [];

  constructor(private randomColor: GetRandomColorService) { }

  ngOnInit() {
    Chart.pluginService.register(this.randomColor.getRandomColor());

    this.PieChart = new Chart('pieChartMonthly', {
      type: 'pie',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
          label: '# of Votes',
          data: [9, 7 ],
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
      maintainAspectRatio: false,
      // scales: {
      //     yAxes: [{
      //         ticks: {
      //             maxTicksLimit: 10,
      //             beginAtZero: true,
      //             fontColor : 'black',
      //             fontSize : 14
      //         },
      //         gridLines: {
      //           color: '#3a3a3a',
      //           lineWidth: 2,
      //           zeroLineColor : '#3a3a3a',
      //           zeroLineWidth : 2
      //       },
      //       stacked: true
      //     }],
      //     xAxes: [{
      //       ticks: {
      //           fontColor : '#dfdfdf',
      //           fontSize : 14
      //       },
      //       gridLines: {
      //           color: '#3a3a3a',
      //           lineWidth: 2
      //       }
      //     }]
      //   },
        // responsive: false
      }
    });

    //  line chart
    this.LineChart = new Chart('lineChartMonthly', {
      type: 'line',
      data: {
        labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],
        datasets: [
          {
            data: [45, 46, 76 , 83, 15, 41, 25, 53 , 86, 77, 45, 41, 48, 83, 65],
            label: '#',
            borderColor: '#8e5ea2',
            fill: false,
            pointBackgroundColor: '#fff',
            lineTension: 0,
          },
          {
            data: [25, 41, 48, 33, 65, 83, 15, 41, 25, 53 , 86, 77, 45, 65, 83 ],
            label: '#',
            borderColor: '#8e5ea2',
            fill: false,
            pointBackgroundColor: '#fff',
            lineTension: 0,
          }
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
              label: function(tooltipItems, data) {
                return tooltipItems.yLabel + ' : ' + tooltipItems.xLabel ;
                //  const  multistringText = [tooltipItems.yLabel];
                //         // multistringText = [tooltipItems.yLabel];
                //         multistringText.push('Another Item');
                //         multistringText.push(tooltipItems.index + 1);
                //         multistringText.push('One more Item');
                //  return multistringText;
              }
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
              //  pointStyle: 'circle',
           }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5,
                    beginAtZero: true,
                    fontColor : '#000000',
                    fontSize : 14
                },
                gridLines: {
                  color: '#f2f2f2',
                  drawBorder: false,
                  // lineWidth: 1,
                  zeroLineColor : '#f2f2f2',
                  // zeroLineWidth : 2
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

    // yearly pie chart
    this.PieChart = new Chart('pieChartYearly', {
      type: 'pie',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
          label: '# of Votes',
          data: [9, 7 ],
          backgroundColor : ['rgba(192, 192, 192, 1)',
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
      maintainAspectRatio: false,
      }
    });

     // yearly line chart
    this.LineChart = new Chart('lineChartYearly', {
      type: 'line',
      data: {
        labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],
        datasets: [{
          data: [86, 77, 45, 65, 83, 15, 41, 48, 83, 25, 53, 65, 83, 15, 41],
          label: '#',
          borderColor: '#3e95cd',
          fill: false
        }, {
          data: [25, 41, 48, 83, 65, 83, 15, 41, 25, 53 , 86, 77, 45, 65, 83 ],
          label: '#',
          borderColor: '#8e5ea2',
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
                    beginAtZero: true,
                    fontColor : '#000000',
                    fontSize : 14
                },
                gridLines: {
                  color: '#f2f2f2',
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

  }
}
