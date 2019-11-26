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

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [9, 7 ],
          backgroundColor :['rgba(192, 192, 192, 0.2)',
          ],
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
    },
    options: {
      // title: {
      //     text: 'Pie Chart',
      //     display: true,
      //     fontColor: '#dfdfdf'
      // },
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

    // line chart
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          data: [86, 77, 45, 65, 83, 15, 41, 48, 83, 25, 53],
          label: '#',
          borderColor: '#3e95cd',
          fill: false
        }, {
          data: [25, 41, 48, 83, 25, 53 , 86, 77, 45, 65, 83 ],
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
                  lineWidth: 2,
                  zeroLineColor : '#000000',
                  zeroLineWidth : 2
              },

            }],
            xAxes: [{
              ticks: {
                  fontColor : '#000000',
                  fontSize : 14
              },
              gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                  lineWidth: 2
              }
            }]
          }
        }
    });

  }
}
