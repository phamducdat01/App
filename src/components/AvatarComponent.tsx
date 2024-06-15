import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageProps,
    ImageStyle,
    StyleProp,
    TouchableOpacity,
    View,
    ViewProps,
} from 'react-native';
import { TextComponent } from '.';
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';
import { globalStyles } from '../styles/globalStyles';
import userAPI from '../apis/userApi';

interface Props {
    photoURL?: string;
    uid?: string;
    name?: string;
    size?: number;
    styles?: StyleProp<ImageStyle>;
    onPress?: () => void;
}

const AvatarComponent = (props: Props) => {
    const { photoURL, name, size, styles, onPress, uid } = props;

    const [profile, setProfile] = useState<{ name?: string; photoUrl?: string }>({
        name: name ?? '',
        photoUrl: photoURL ?? '',
    });

    useEffect(() => {
        if (!photoURL && uid) {
            getUserProfile();
        }
    }, [photoURL, uid]);

    const getUserProfile = async () => {
        console.log('get profile uid');
        const api = `/get-profile?uid=${uid}`;
        try {
            const res: any = await userAPI.HandleUser(api);
            console.log(res.data.photoUrl);
            setProfile({
                name: res.data.name,
                photoUrl: res.data.photoUrl,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
            {profile.photoUrl ? (
                <Image
                    source={{ uri: profile.photoUrl }}
                    style={[
                        {
                            width: size ?? 40,
                            height: size ?? 40,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: appColors.white,
                        },
                        styles,
                    ]}
                />
            ) : (
                <View
                    style={[
                        globalStyles.center,
                        {
                            width: size ?? 40,
                            height: size ?? 40,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: appColors.white,
                            backgroundColor: appColors.gay2,
                        },
                    ]}>
                    <TextComponent
                        text={
                            profile.name
                                ? profile.name.substring(0, 1).toLocaleUpperCase()
                                : ''
                        }
                        font={fontFamily.bold}
                        color={appColors.white}
                        size={size ? size / 3 : 14}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AvatarComponent;