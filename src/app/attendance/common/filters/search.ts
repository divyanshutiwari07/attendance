import {Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  // original
  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) { return []; }
    if (!keyword) { return items; }
    if (!properties) {return items; }
    return items.filter(item => {
      let itemFound: Boolean;
      for (let i = 0; i < properties.length; i++) {
        if (item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }

  // arrivaltime
  // transform(items: any[], dateString: any) {
  //   if (!items) { return []; }
  //   if (!dateString) { return items; }
  //   return items.filter(row => {
  //     const date = new Date(row.inTime).getTime().toString();
  //     return date >= dateString.firstTime && date <= dateString.lastTime;
  //   });
  // }

  // transform(value, firstDate , secondDate  ) {

  //   return value.filter(row => {
  //     return row.tStartDate >= firstDate && row.tEndDate <= secondDate;
  //   });
  // }

  // transform(value, arg1?: string[], arg2?: string[], ) {
  //   if (!arg1 || !arg2) {

  //   return value;

  //   }else{
  //     let startDate = new Date(arg1);
  //     let endDate = new Date(arg2);
  //     let a = value.filter(
  //       m => new Date(m.date) >= startDate && new Date(m.date) <= endDate
  //     )
  //     return a;
  //   }
  // }
}
