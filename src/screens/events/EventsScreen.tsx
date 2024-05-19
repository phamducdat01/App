import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {
    ButtonComponent,
    ContainerComponent,
    EventItem,
    RadioButtons,
    SectionComponent,
    TextComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { EventModel } from '../../models/EventModel';
import { globalStyles } from '../../styles/globalStyles';
import { LoadingModal } from '../../modals';

const EventsScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<EventModel[]>([]);
    const [eventType, setEventType] = useState<string>('upcoming');

    useEffect(() => {
        getData();
    }, [eventType]);

    const getData = async () => {
        setIsLoading(true);
        await getEvents();
        setIsLoading(false);
    };

    const getEvents = async () => {
        const api = `/get-events${eventType === 'upcoming' ? '?isUpcoming=true' : '?isPastEvents=true'
            }`;

        try {
            const res: any = await eventAPI.HandleEvent(api);
            setEvents(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderEmptyCompnent = (
        <View style={{ flex: 1 }}>
            <View style={[globalStyles.center, { flex: 1 }]}>
                <Image
                    source={require('../../assets/img/empty-events.png')}
                    style={{ width: 202, height: 202 }}
                />
                <TextComponent
                    text="No Upcoming Event"
                    title
                    size={24}
                    styles={{ marginVertical: 12 }}
                />

                <View style={{ width: '70%' }}>
                    <TextComponent
                        text="Lorem ipsum dolor sit amet, consectetur"
                        size={16}
                        color="#747688"
                        styles={{ textAlign: 'center' }}
                    />
                </View>
            </View>
            <SectionComponent styles={{}}>
                <ButtonComponent
                    onPress={() => navigation.navigate('ExploreEvents')}
                    text="Explore events"
                    type="primary"
                />
            </SectionComponent>
        </View>
    );

    return (
        <ContainerComponent
            title="Events"
            back
            right={
                <ButtonComponent
                    icon={
                        <MaterialIcons name="more-vert" size={22} color={appColors.text} />
                    }
                />
            }
            isScroll={false}>
            <RadioButtons
                selected={eventType}
                onSelect={(id: string) => setEventType(id)}
                data={[
                    {
                        label: 'Upcoming',
                        value: 'upcoming',
                    },
                    {
                        label: 'Past event',
                        value: 'pastEvent',
                    },
                ]}
            />
            {events.length > 0 ? (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <EventItem
                            item={item}
                            key={item._id}
                            type="list"
                            styles={{ flex: 1, width: undefined }}
                        />
                    )}
                />
            ) : (
                renderEmptyCompnent
            )}

            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
};

export default EventsScreen;