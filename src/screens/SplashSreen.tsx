import React from 'react'
import { ActivityIndicator, Image, ImageBackground } from 'react-native'
import { appInfors } from '../constants/appInfos'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashSreen = () => {
  return (
    <ImageBackground
      source={require('../assets/img/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      imageStyle={{ flex: 1 }}>
      <Image source={require('../assets/img/logomeo.png')} style={{
        width: appInfors.sizes.WIDTH * 1,
        resizeMode: 'contain',

      }} />

      <SpaceComponent height={20} />

      <ActivityIndicator color={appColors.gay} size={22} />
    </ImageBackground>
  )
}

export default SplashSreen