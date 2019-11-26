import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRandomColorService {

  constructor() { }

  getRandomColor() {
    const randomColorPlugin = {
      beforeUpdate(chart) {
          const backgroundColor = [];
          const borderColor = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < chart.config.data.datasets[0].data.length; i++) {
            // tslint:disable-next-line:quotemark
            // tslint:disable-next-line:max-line-length
            const color = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',';
              backgroundColor.push(color + '0.3)');
              borderColor.push(color + '1)');
          }
          chart.config.data.datasets[0].backgroundColor = backgroundColor;
          chart.config.data.datasets[0].borderColor = borderColor;
      }
    };
    return randomColorPlugin;
  }
}
