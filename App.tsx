import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigator/AuthNavigator';
import { SplashSreen } from './src/screens';

const App = () => {

  const [isShowSplash, setisShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setisShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      {isShowSplash ? <SplashSreen /> : <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>}
    </>
  )
}

export default App