import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(arraysearch, querystring: string) {
    if (!arraysearch) {
      return null;
    }
    if (!querystring) {
      return arraysearch;
    }
    querystring = querystring.toLowerCase();
    return arraysearch.filter(function(row) {
      return JSON.stringify(row).toLowerCase().includes(querystring);
    });
  }
}