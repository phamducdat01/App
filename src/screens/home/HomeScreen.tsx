//ChDZ3csCXlFXoTIA3RQ4LNJSIuWiT8ZFMRQiWiScFqE

import GeoLocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {
  ButtonComponent,
  CategoriesList,
  CircleComponent,
  EventItem,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamily } from '../../constants/fontFamily';
import { AddressModel } from '../../models/AddressModel';
import { EventModel } from '../../models/EventModel';
import { globalStyles } from '../../styles/globalStyles';
import { handleLinking } from '../../utils/handleLinking';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { appInfors } from '../../constants/appInfos';

const HomeScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<EventModel[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>();
  const [unReadNotifications, setUnReadNotifications] = useState([]);

  const isFocused = useIsFocused();
  const user = useSelector(authSelector);

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      (position: any) => {
        if (position.coords) {
          reverseGeoCode({
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

    getEvents();
    getEventsData();
    messaging().onMessage(async (mess: any) => {
      Toast.show({
        text1: mess.notification.title,
        text2: mess.notification.body,
        onPress: () => {
          const id = mess.data ? mess.data.eventId : '';
          id && navigation.navigate('EventDetail', { id });
        },
      });
    });

    // messaging()
    //   .getInitialNotification()
    //   .then((mess: any) => {
    //     const id = mess && mess.data ? mess.data.id : '';
    //     id && handleLinking(`${appInfors.domain}/detail/${mess.data.id}`);
    //   });

    checkNetWork();

    firestore()
      .collection('notifcation')
      .where('idRead', '==', false)
      .where('uid', '==', user.id)
      .onSnapshot(snap => {
        if (snap.empty) {
          setUnReadNotifications([]);
        } else {
          const items: any = [];

          snap.forEach(item =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setUnReadNotifications(items);
        }
      });
  }, []);

  useEffect(() => {
    getNearByEvents();
  }, [currentLocation]);

  useEffect(() => {
    if (isFocused) {
      getEvents();
      getNearByEvents();
    }
  }, [isFocused]);

  const checkNetWork = () => {
    NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
  };

  const getNearByEvents = () => {
    currentLocation &&
      currentLocation.position &&
      getEvents(currentLocation.position.lat, currentLocation.position.lng);
  };

  const reverseGeoCode = async ({ lat, long }: { lat: number; long: number }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=ChDZ3csCXlFXoTIA3RQ4LNJSIuWiT8ZFMRQiWiScFqE`;

    try {
      const res = await axios(api);

      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async (lat?: number, long?: number, distance?: number) => {
    const api = `${lat && long
      ? `/get-events?lat=${lat}&long=${long}&distance=${distance ?? 5
      }&limit=5&isUpcoming=true`
      : `/get-events?limit=5&isUpcoming=true`
      }`;

    if (events.length === 0 || nearbyEvents.length === 0) {
      setIsLoading(true);
    }
    try {
      const res: any = await eventAPI.HandleEvent(api);

      setIsLoading(false);
      res &&
        res.data &&
        (lat && long ? setNearbyEvents(res.data) : setEvents(res.data));
    } catch (error) {
      setIsLoading(false);
      console.log(`Get event error in home screen line 74 ${error}`);
    }
  };

  const getEventsData = async (
    lat?: number,
    long?: number,
    distance?: number,
  ) => {
    const api = `/get-events`;
    try {
      const res = await eventAPI.HandleEvent(api);

      const data = res.data;

      const items: EventModel[] = [];

      data.forEach((item: any) => items.push(item));

      setEventData(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: 'center' }]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city}, ${currentLocation.address.county}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamily.medium}
                  size={13}
                />
              )}
            </View>

            <CircleComponent
              onPress={() => navigation.navigate('NotificationsScreen')}
              color="#524CE0"
              size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                {unReadNotifications.length > 0 && (
                  <View
                    style={{
                      backgroundColor: '#02E9FE',
                      width: 10,
                      height: 10,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: '#524CE0',
                      position: 'absolute',
                      top: -2,
                      right: -2,
                    }}
                  />
                )}
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{ flex: 1 }}
              onPress={() => navigation.navigate('SearchEvents')}>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gay2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gay2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', { isFilter: true })
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{ marginBottom: -16 }}>
          <CategoriesList isFill />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent
            title="Upcoming Events"
            onPress={() =>
              navigation.navigate('ExploreEvents', {
                key: 'upcoming',
                title: 'Upcoming Events',
              })
            }
          />
          {events.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={events}
              renderItem={({ item, index }) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent isLoading={isLoading} values={events.length} />
          )}
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/img/invite-image.png')}
            style={{ flex: 1, padding: 16, minHeight: 127 }}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                onPress={() => console.log('fafafa')}
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamily.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent
            title="Nearby You"
            onPress={() =>
              navigation.navigate('ExploreEvents', {
                key: 'nearby',
                title: 'Nearby You',
              })
            }
          />
          {nearbyEvents.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={nearbyEvents}
              renderItem={({ item, index }) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={isLoading}
              values={nearbyEvents.length}
            />
          )}
        </SectionComponent>
      </ScrollView>

      <Modal animationType="fade" style={[{ flex: 1 }]} visible={!isOnline}>
        <View style={[globalStyles.center, { flex: 1 }]}>
          <Text>Network error</Text>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;