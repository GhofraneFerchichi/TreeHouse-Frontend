import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course'
})
export class CoursePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it:any) => {
      return (it?.name?.toLocaleLowerCase()?.includes(searchText) || it?.educationLevel?.toLocaleLowerCase()?.includes(searchText));
    });
  }

}
