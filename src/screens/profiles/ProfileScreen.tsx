import { View, Text } from 'react-native';
import React from 'react';
import { ButtonComponent, ContainerComponent } from '../../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    return (
        <ContainerComponent back>
            <Text>ProfileScreen</Text>

            <ButtonComponent
                type="primary"
                text="Logout"
                onPress={async () => {
                    await GoogleSignin.signOut();
                    await LoginManager.logOut();
                    dispatch(removeAuth({}));
                    await AsyncStorage.clear();
                }}
            />
        </ContainerComponent>
    );
};

export default ProfileScreen;