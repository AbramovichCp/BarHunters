import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'localizeEventsDates',
    pure: false
})

export class EventsDatesPipe implements PipeTransform {
    translatedDate: string;
    localizedDate: string;
    constructor(
        private translate: TranslateService
    ) { }
    transform(value: string): any {
        this.translatedDate = this.translate.instant('momentLocalizateDate');
        return this.localizedDate = moment(value).locale(this.translatedDate).format('llll');
    }
}
