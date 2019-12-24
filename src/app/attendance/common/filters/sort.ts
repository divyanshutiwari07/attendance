import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any, field: string): any[] {

    console.log(array)
    console.log(field)
    if (!Array.isArray(array)) {
      return;
    }
    if (!field) {
      return array;
    }
    if ( field === 'inTime') {
      array.sort((a: any, b: any) => {
        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return -1;
        } else if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: any, b: any) => {
        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return -1;
        } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    console.log(array)
    return array;
  }
}
