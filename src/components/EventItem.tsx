import { Bookmark, Bookmark2, Location } from 'iconsax-react-native';
import React from 'react';
import {
    AvatarGroup,
    CardComponent,
    RowComponent,
    SpaceComponent,
    TextComponent,
} from '.';
import { appColors } from '../constants/appColors';
import { appInfors } from '../constants/appInfos';
import { EventModel } from '../models/EventModel';
import { Image, ImageBackground, StyleProp, View, ViewStyle } from 'react-native';
import { fontFamily } from '../constants/fontFamily';
import { globalStyles } from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { DateTime } from '../utils/DateTime';
import { useSelector } from 'react-redux';
import { AuthState, authSelector } from '../redux/reducers/authReducer';
import { numberToString } from '../utils/numberToString';

interface Props {
    item: EventModel;
    type: 'card' | 'list';
    styles?: StyleProp<ViewStyle>;
}

const EventItem = (props: Props) => {
    const { item, type, styles } = props;

    const navigation: any = useNavigation();
    const auth: AuthState = useSelector(authSelector);

    console.log('auth.users: ');
    console.log(item.users);

    return (
        <CardComponent
            isShadow
            styles={[{ width: appInfors.sizes.WIDTH * 0.7 }, styles]}
            // onPress={() => console.log(item._id)}
            onPress={() => navigation.navigate('EventDetail', { id: item._id })}>
            {type === 'card' ? (
                <>
                    <ImageBackground
                        style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                        source={{ uri: item.photoUrl }}
                        imageStyle={{
                            resizeMode: 'cover',
                            borderRadius: 12,
                        }}>
                        <RowComponent justify="space-between">
                            <CardComponent
                                styles={[globalStyles.noSpaceCard]}
                                color="#ffffffB3">
                                <TextComponent
                                    color={appColors.danger2}
                                    font={fontFamily.bold}
                                    size={18}
                                    text={numberToString(new Date(item.date).getDate())}
                                />
                                <TextComponent
                                    color={appColors.danger2}
                                    font={fontFamily.semiBold}
                                    size={10}
                                    text={appInfors.monthNames[
                                        new Date(item.date).getMonth()
                                    ].substring(0, 3)}
                                />
                            </CardComponent>
                            {auth.follow_events && auth.follow_events.includes(item._id) && (
                                <CardComponent
                                    styles={[globalStyles.noSpaceCard]}
                                    color="#ffffffB3">
                                    <MaterialIcons
                                        name="bookmark"
                                        color={appColors.danger2}
                                        size={22}
                                    />
                                </CardComponent>
                            )}

                            <CardComponent
                                styles={[globalStyles.noSpaceCard]}
                                color="#ffffffB3">
                                <MaterialIcons
                                    name="bookmark"
                                    color={appColors.danger2}
                                    size={22}
                                />
                            </CardComponent>

                        </RowComponent>
                    </ImageBackground>
                    <TextComponent numOfLine={1} text={item.title} title size={18} />
                    <AvatarGroup userIds={item.users} />
                    <RowComponent>
                        <Location size={18} color={appColors.text3} variant="Bold" />
                        <SpaceComponent width={8} />
                        <TextComponent
                            flex={1}
                            numOfLine={1}
                            text={item.locationAddress}
                            size={12}
                            color={appColors.text2}
                        />
                    </RowComponent>
                </>
            ) : (
                <>
                    <RowComponent>
                        <Image
                            source={{ uri: item.photoUrl }}
                            style={{
                                width: 79,
                                height: 92,
                                borderRadius: 12,
                                resizeMode: 'cover',
                            }}
                        />
                        <SpaceComponent width={12} />
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'stretch',
                            }}>
                            <TextComponent
                                color={appColors.primary}
                                text={`${DateTime.GetDayString(item.date)} • ${DateTime.GetTime(
                                    new Date(item.startAt),
                                )}`}
                            />
                            <TextComponent text={item.title} title size={18} numOfLine={2} />
                            <RowComponent>
                                <Location size={18} color={appColors.text3} variant="Bold" />
                                <SpaceComponent width={8} />
                                <TextComponent
                                    flex={1}
                                    numOfLine={1}
                                    text={item.locationAddress}
                                    size={12}
                                    color={appColors.text2}
                                />
                            </RowComponent>
                        </View>
                    </RowComponent>
                </>
            )}
        </CardComponent>
    );
};

export default EventItem;