import { SearchNormal1 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {
    ButtonComponent,
    ContainerComponent,
    ListEventComponent,
    LoadingComponent,
    RowComponent,
    SpaceComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { EventModel } from '../../models/EventModel';
import GeoLocation from '@react-native-community/geolocation';

const ExploreEvents = ({ navigation, route }: any) => {
    const [events, setEvents] = useState<EventModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterCondition, setFilterCondition] = useState<{
        title: string;
        key: string;
    }>();

    useEffect(() => {
        if (route.params) {
            setFilterCondition(route.params);
            const { key } = route.params;

            if (key === 'upcoming') {
                getEvents(`/get-events?isUpcoming=true`);
            } else {
                GeoLocation.getCurrentPosition(
                    (position: any) => {
                        if (position.coords) {
                            const lat = position.coords.latitude;
                            const long = position.coords.longitude;

                            const api = `/get-events?lat=${lat}&long=${long}&distance=5
              &limit=5`;

                            getEvents(api);
                        }
                    },
                    (error: any) => {
                        console.log(error);
                    },
                    {},
                );
            }
        } else {
            getEvents(`/get-events`);
        }
    }, [route]);

    const getEvents = async (api: string) => {
        setIsLoading(true);

        try {
            const res = await eventAPI.HandleEvent(api);
            if (res.data) {
                setEvents(res.data);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent
            back
            title={filterCondition ? filterCondition.title : 'Events'}
            right={
                <RowComponent>
                    <ButtonComponent
                        onPress={() => navigation.navigate('SearchEvents')}
                        icon={<SearchNormal1 size={20} color={appColors.text} />}
                    />
                    <SpaceComponent width={12} />
                    <ButtonComponent
                        icon={
                            <MaterialIcons
                                name="more-vert"
                                size={22}
                                color={appColors.text}
                            />
                        }
                    />
                </RowComponent>
            }>
            {events.length > 0 ? (
                <ListEventComponent items={events} />
            ) : (
                <LoadingComponent isLoading={isLoading} values={events.length} />
            )}
        </ContainerComponent>
    );
};

export default ExploreEvents;