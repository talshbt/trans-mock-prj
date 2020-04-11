import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform{
  transform(items: any[], searchText: string): any[] {
       if (!items) return [];
       if (!searchText) return items;


       return items.filter(function (item) {
        return Object.values(item).includes(searchText);

     
      });
    }



}