import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigator/AuthNavigator';
import { SplashSreen } from './src/screens';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigator/MainNavigator';

const App = () => {

  const [isShowSplash, setisShowSplash] = useState(true);

  const [accessToken, setaccessToken] = useState('');

  const { getItem, setItem } = useAsyncStorage('assetToken');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setisShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();

    token && setaccessToken(token);
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      {isShowSplash ? <SplashSreen /> :
        <NavigationContainer>
          {
            accessToken ? <MainNavigator /> : <AuthNavigator />
          }

        </NavigationContainer>}
    </>
  )
}

export default App