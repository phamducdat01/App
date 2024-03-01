import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigator/AuthNavigator';
import { SplashSreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

    const [isShowSplash, setisShowSplash] = useState(true);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setisShowSplash(false);
        },1500);

        return ()=> clearTimeout(timeout);
    },[]);

  return (
    isShowSplash ? <SplashSreen />: <NavigationContainer>
        <AuthNavigator />
    </NavigationContainer>
  )
}

export default App