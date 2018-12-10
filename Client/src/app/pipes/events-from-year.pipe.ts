import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventsFromYear'
  })

@Injectable()  
export class EventsFromYearPipe implements PipeTransform {
    transform(items: any[], filter: number): any {
        return items.filter(item => new Date(item.event_date).getFullYear() == filter);
        }
  }