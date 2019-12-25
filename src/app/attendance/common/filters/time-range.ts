import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeRange'
})

export class TimeRangePipe implements PipeTransform {
  transform(items: any[], timeRangeObj: any) {
    if (!items) { return []; }
    if (!timeRangeObj) { return items; }
    return items.filter(row => {
      const dateHours = new Date(row.inTime).getHours();
      return dateHours >= timeRangeObj.startTime && dateHours < timeRangeObj.endTime;
    });
  }

}
