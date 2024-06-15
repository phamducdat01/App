import { Dimensions } from "react-native";

export const appInfors = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: 'http://192.168.16.104:3001',
    GoogleApiKey: 'AIzaSyCbtwJ3e1wGs0RcFkgQPtaLwg0P4XxkELA',
    domain: 'https://devtogerther.netlify.app',
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}