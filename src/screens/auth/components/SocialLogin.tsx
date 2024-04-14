import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
//import { LoginManager, Profile, Settings } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import { Facebook, Google } from '../../../assets/svgs';
import {
    ButtonComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '../../../components';
import { appColors } from '../../../constants/appColors';


import { addAuth } from '../../../redux/reducers/authReducer';
import { fontFamily } from '../../../constants/fontFamily';
import LoadingModal from '../../../modals/LoadingModal';
import { LoginButton, LoginManager, Profile, Settings } from 'react-native-fbsdk-next';

GoogleSignin.configure({
    webClientId:
        '305884282556-gen2kivcjtsf7mvudlu2ou0fvf86mh0d.apps.googleusercontent.com',
    // iosClientId:
    //     '51183564123-ftijaqo23c9thm2kfe9ssgqq6p92ru72.apps.googleusercontent.com',
    // 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
});
Settings.setAppID('782159963980027');

const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const api = `/google-signin`;
    const dispatch = useDispatch();

    const handleLoginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();


            const user = userInfo.user;

            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                user,
                'post',
            );

            dispatch(addAuth(res.data));

            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginWithFacebook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
            ]);

            if (result.isCancelled) {
                console.log('Login cancel');
            } else {
                const profile = await Profile.getCurrentProfile();

                if (profile) {
                    setIsLoading(true);
                    const data = {
                        name: profile.name,
                        givenName: profile.firstName,
                        familyName: profile.lastName,
                        email: profile.userID,
                        photo: profile.imageURL,
                    };

                    const res: any = await authenticationAPI.HandleAuthentication(
                        api,
                        data,
                        'post',
                    );

                    dispatch(addAuth(res.data));

                    await AsyncStorage.setItem('auth', JSON.stringify(res.data));

                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SectionComponent>
            <TextComponent
                styles={{ textAlign: 'center' }}
                text="OR"
                color={appColors.gay}
                size={16}
                font={fontFamily.medium}
            />
            <SpaceComponent height={16} />

            <ButtonComponent
                type="primary"
                onPress={handleLoginWithGoogle}
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Google"
                textFont={fontFamily.regular}
                iconFlex="left"
                icon={<Google />}
            />


            <ButtonComponent
                type="primary"
                color={appColors.white}
                textColor={appColors.text}
                text="Login with Facebook"
                textFont={fontFamily.regular}
                onPress={handleLoginWithFacebook}
                iconFlex="left"
                icon={<Facebook />}
            />
            <LoadingModal visible={isLoading} />
        </SectionComponent>
    );
};

export default SocialLogin;