import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EventDetail, HomeScreen, SearchEvents } from '../screens';
import ExploreEvents from '../screens/events/ExploreEvents';
import PaymentScreen from '../screens/events/PaymentScreen';

const ExploreNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchEvents" component={SearchEvents} />
            <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            {/* <Stack.Screen name="EventDetail" component={EventDetail} /> */}
        </Stack.Navigator>
    );
};

export default ExploreNavigator;