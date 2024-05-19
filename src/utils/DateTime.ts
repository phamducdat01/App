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

    static GetEventTime = (date: number, time: number) => {
        const d = new Date(date);
        const t = new Date(time);

        const value = new Date(`${d.getFullYear()}-${numberToString(d.getMonth() + 1)}-${numberToString(d.getDate())} ${numberToString(t.getHours())}:${numberToString(t.getMinutes())}:${numberToString(t.getSeconds())}`).getTime();
        return value;
    };

    static GetDayString = (num: number) => {
        const date = new Date(num);

        return `${appInfors.dayNames[date.getDay()]}, ${appInfors.monthNames[date.getMonth()]
            } ${numberToString(date.getDate())}`;
    };

    static GetStartAndEnd = (start: number, end: number) => {
        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        return `${numberToString(dateStart.getHours())}:${numberToString(
            dateStart.getMinutes(),
        )} - ${numberToString(dateEnd.getHours())}:${numberToString(
            dateEnd.getMinutes(),
        )}`;
    };

    static GetDateUpdate = (num: number) => {
        const date = new Date(num).toISOString();
        const today = new Date().toISOString();

        const strDate = date.split('T')[0].split('-');
        const strToday = today.split('T')[0].split('-');


        if (
            strDate[0] == strToday[0] &&
            strDate[1] === strToday[1] &&
            strDate[2] === strToday[2]
        ) {
            const time = new Date().getTime() - num;
            const second = time / 1000;
            const min = time / (60 * 1000);
            const hour = time / (60 * 60 * 1000);

            let timeStr = '';

            if (second < 60) {
                timeStr = 'few';
            } else if (min < 60) {
                timeStr = `${min.toFixed(0)} mins`;
            } else if (hour > 0 && hour < 24) {
                timeStr = `${hour.toFixed(0)} hours`;
            }
            return timeStr;
        } else {
            return this.GetDate(new Date(num));
        }
    };
}