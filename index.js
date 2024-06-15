/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { handleLinking } from './src/utils/handleLinking';
import { appInfors } from './src/constants/appInfos';

messaging().setBackgroundMessageHandler(async mess => {
    handleLinking(`${appInfors.domain}/detail/${mess.data.eventId}`);
});

messaging().onNotificationOpenedApp(mess => {
    handleLinking(`${appInfors.domain}/detail/${mess.data.eventId}`);
});

AppRegistry.registerComponent(appName, () => App);