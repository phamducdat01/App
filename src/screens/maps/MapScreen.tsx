import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { appInfors } from '../../constants/appInfos';

const MapScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{
                    width: appInfors.sizes.WIDTH,
                    height: appInfors.sizes.HEIGHT - 220,
                    marginVertical: 40,
                    zIndex: -1,
                }}
                showsMyLocationButton
                showsUserLocation
                initialRegion={{
                    latitude: 21.0721145,
                    longitude: 105.7979988,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude: 21.0721145,
                    longitude: 105.7979988,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.015,
                }}
                mapType="standard"
            />
        </View>
    );
};

export default MapScreen;
