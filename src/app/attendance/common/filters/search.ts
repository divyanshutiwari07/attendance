import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // public transform(value, keys: string, term: string) {
  //   if (!term) { return value; }
  //   return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  // }

  transform(items: any[], keyword: any, properties: string[]): any[] {
    if (!items) { return []; }
    if (!keyword) { return items; }
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
}
