import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-attendance-stats',
  templateUrl: './attendance-stats.component.html',
  styleUrls: ['./attendance-stats.component.scss']
})
export class AttendanceStatsComponent implements OnInit {
  LineChart: any = [];
  PieChart: any = [];

  constructor() { }

  ngOnInit() {

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [9, 7 , 3, 5, 2, 10],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
    },
    options: {
      title: {
          text: 'Pie Chart',
          display: true,
          fontColor: '#dfdfdf'
      },
      legend: {
        labels: {
            fontColor: '#dfdfdf'
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  maxTicksLimit: 10,
                  beginAtZero: true,
                  fontColor : '#dfdfdf',
                  fontSize : 14
              },
              gridLines: {
                color: '#3a3a3a',
                lineWidth: 2,
                zeroLineColor : '#3a3a3a',
                zeroLineWidth : 2
            },
            stacked: true
          }],
          xAxes: [{
            ticks: {
                fontColor : '#dfdfdf',
                fontSize : 14
            },
            gridLines: {
                color: '#3a3a3a',
                lineWidth: 2
            }
          }]
        },
        // responsive: false
      }
    });
  
    // line chart
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: 'Africa',
          borderColor: '3e95cd',
          fill: false
        }, { 
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: 'Asia',
          borderColor: '#8e5ea2',
          fill: false
        }]
      },
      options: {
        title: {
            text: 'Line Chart',
            display: true,
            fontColor: '#dfdfdf'
        },
        legend: {
          labels: {
              fontColor: '#dfdfdf'
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    fontColor : '#dfdfdf',
                    fontSize : 14
                },
                gridLines: {
                  color: '#3a3a3a',
                  lineWidth: 2,
                  zeroLineColor : '#3a3a3a',
                  zeroLineWidth : 2
              },
              stacked: true
            }],
            xAxes: [{
              ticks: {
                  fontColor : '#dfdfdf',
                  fontSize : 14
              },
              gridLines: {
                  color: '#3a3a3a',
                  lineWidth: 2
              }
            }]
          }
        }
    });

  }
}
