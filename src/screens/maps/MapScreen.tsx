import GeoLocation from '@react-native-community/geolocation';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {
    CardComponent,
    CategoriesList,
    EventItem,
    InputComponent,
    MakerCustom,
    RowComponent,
    SpaceComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { appInfors } from '../../constants/appInfos';
import { EventModel } from '../../models/EventModel';
import { globalStyles } from '../../styles/globalStyles';
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from '../../modals';

const MapScreen = ({ navigation }: any) => {
    const [currentLocation, setCurrentLocation] = useState<{
        lat: number;
        long: number;
    }>();
    const [events, setEvents] = useState<EventModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isFocused = useIsFocused();

    //eventhub://app/detail/12345

    useEffect(() => {
        GeoLocation.getCurrentPosition(
            (position: any) => {
                if (position.coords) {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                }
            },
            (error: any) => {
                console.log(error);
            },
            {},
        );
    }, []);

    useEffect(() => {
        currentLocation && isFocused && getNearbyEvents();
    }, [currentLocation, isFocused]);

    const getNearbyEvents = async (categoryId?: string) => {
        setIsLoading(true);
        const api = `/get-events?lat=${currentLocation?.lat}&long=${currentLocation?.long
            }&distance=${5}${categoryId ? `&categoryId=${categoryId}` : ''}`;

        try {
            const res = await eventAPI.HandleEvent(api);

            setEvents(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} />

            {currentLocation ? (
                <MapView
                    style={{
                        width: appInfors.sizes.WIDTH,
                        height: appInfors.sizes.HEIGHT,
                    }}
                    showsMyLocationButton
                    showsUserLocation
                    initialRegion={{
                        latitude: currentLocation.lat,
                        longitude: currentLocation.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={{
                        latitude: currentLocation.lat,
                        longitude: currentLocation.long,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.015,
                    }}
                    mapType="standard">
                    {events.length > 0 &&
                        events.map((event, index) => (
                            <Marker
                                key={`event${index}`}
                                title={event.title}
                                description=""
                                onPress={() =>
                                    navigation.navigate('EventDetail', { id: event._id })
                                }
                                coordinate={{
                                    longitude: event.position.long,
                                    latitude: event.position.lat,
                                }}>
                                <MakerCustom categoryId={event.categories} />
                            </Marker>
                        ))}
                </MapView>
            ) : (
                <></>
            )}

            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    top: 0,
                    right: 0,
                    left: 0,
                    padding: 20,
                    paddingTop: 48,
                }}>
                <RowComponent>
                    <RowComponent styles={{ flex: 1 }}>
                        <InputComponent
                            styles={{ marginBottom: 0 }}
                            affix={
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Explore', {
                                            screen: 'HomeScreen',
                                        })
                                    }>
                                    <ArrowLeft2 size={24} color={appColors.text} />
                                </TouchableOpacity>
                            }
                            placeholder="Search"
                            value={inputValue}
                            onChange={val => setInputValue(val)}
                        />
                    </RowComponent>
                    <SpaceComponent width={12} />
                    <CardComponent
                        onPress={getNearbyEvents}
                        styles={[globalStyles.noSpaceCard, { width: 56, height: 56 }]}
                        color={appColors.white}>
                        <MaterialIcons
                            name="my-location"
                            size={28}
                            color={appColors.primary}
                        />
                    </CardComponent>
                </RowComponent>
                <SpaceComponent height={20} />
                <CategoriesList onFilter={catId => getNearbyEvents(catId)} />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 0,
                    left: 0,
                }}>
                <FlatList
                    initialScrollIndex={0}
                    data={events}
                    renderItem={({ item }) => <EventItem item={item} type="list" />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <LoadingModal visible={isLoading} />
        </View>
    );
};

export default MapScreen;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const App = () => {
//     const [address, setAddress] = useState('');
//     const [currentLocation, setCurrentLocation] = useState({ lat: null, lon: null });

//     const handleGeocode = async () => {
//         try {
//             const response = await axios.get('https://nominatim.openstreetmap.org/search', {
//                 params: {
//                     q: address,
//                     format: 'json',
//                 },
//             });

//             if (response.data.length > 0) {
//                 const location = response.data[0];
//                 setCurrentLocation({
//                     lat: location.lat,
//                     lon: location.lon,
//                 });
//             } else {
//                 console.warn('No results found for the given address.');
//             }
//         } catch (error) {
//             console.error('Failed to fetch location:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter address"
//                 value={address}
//                 onChangeText={text => setAddress(text)}
//             />
//             <Button title="Get Location" onPress={handleGeocode} />
//             {currentLocation.lat && currentLocation.lon && (
//                 <Text style={styles.text}>
//                     Latitude: {currentLocation.lat}, Longitude: {currentLocation.lon}
//                 </Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         width: '100%',
//         marginBottom: 16,
//         paddingLeft: 8,
//     },
//     text: {
//         fontSize: 18,
//         marginTop: 16,
//     },
// });

// export default App;
