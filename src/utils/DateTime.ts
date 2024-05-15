import { appInfors } from '../constants/appInfos';
import { numberToString } from './numberToString';

export class DateTime {
    static GetTime = (num: Date) => {
        const date = new Date(num);

        return `${numberToString(date.getHours())}:${numberToString(
            date.getMinutes(),
        )}`;
    };
    static GetDate = (num: Date) => {
        const date = new Date(num);

        return `${numberToString(date.getDate())} ${appInfors.monthNames[date.getMonth()]
            }, ${date.getFullYear()}`;
    };
}