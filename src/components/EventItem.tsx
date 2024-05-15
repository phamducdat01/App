import { useNavigation } from '@react-navigation/native';
import { Location } from 'iconsax-react-native';
import React from 'react';
import { ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    AvatarGroup,
    CardComponent,
    RowComponent,
    SpaceComponent,
    TextComponent,
} from '.';
import { appColors } from '../constants/appColors';
import { appInfors } from '../constants/appInfos';
import { fontFamily } from '../constants/fontFamily';
import { EventModel } from '../models/EventModel';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    item: EventModel;
    type: 'card' | 'list';
}

const EventItem = (props: Props) => {
    const { item, type } = props;

    const navigation: any = useNavigation();

    return (
        <CardComponent
            isShadow
            styles={{ width: appInfors.sizes.WIDTH * 0.7 }}
            onPress={() => navigation.navigate('EventDetail', { item })}>
            <ImageBackground
                style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                source={require('../assets/img/event-image.jpg')}
                imageStyle={{
                    resizeMode: 'cover',
                    borderRadius: 12,
                }}>
                <RowComponent justify="space-between">
                    <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamily.bold}
                            size={18}
                            text="10"
                        />
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamily.semiBold}
                            size={10}
                            text="JUNE"
                        />
                    </CardComponent>
                    <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                        <MaterialIcons
                            name="bookmark"
                            color={appColors.danger2}
                            size={22}
                        />
                    </CardComponent>
                </RowComponent>
            </ImageBackground>
            <TextComponent numOfLine={1} text={item.title} title size={18} />
            <AvatarGroup />
            <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent
                    flex={1}
                    numOfLine={1}
                    text={item.location.address}
                    size={12}
                    color={appColors.text2}
                />
            </RowComponent>
        </CardComponent>
    );
};

export default EventItem;