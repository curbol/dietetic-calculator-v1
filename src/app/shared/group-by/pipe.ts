import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, propName: string): Array<any> {
    if (!value || !value.length) { return value; }

    const groupedObj = value.reduce((acc, cur) => {
      if (!acc[cur[propName]]) {
        acc[cur[propName]] = [cur];
      } else {
        acc[cur[propName]].push(cur);
      }
      return acc;
    }, {});

    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}
