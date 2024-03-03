import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { appInfors } from '../../constants/appInfos'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'
import { fontFamily } from '../../constants/fontFamily'


const OnboardingScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0);

    return (
        <View style={[globalStyles.container]}>
            <Swiper style={{}}
                loop={false}
                onIndexChanged={num => { setIndex(num) }}
                index={index}
                activeDotColor={appColors.white}
            >
                <Image
                    source={require('../../assets/img/onboarding-1.png')}
                    style={{
                        flex: 1,
                        width: appInfors.sizes.WIDTH,
                        height: appInfors.sizes.HEIGHT,
                        resizeMode: 'cover'
                    }}
                />
                <Image
                    source={require('../../assets/img/onboarding-2.png')}
                    style={{
                        flex: 1,
                        width: appInfors.sizes.WIDTH,
                        height: appInfors.sizes.HEIGHT,
                        resizeMode: 'cover'
                    }}
                />
                <Image
                    source={require('../../assets/img/onboarding-3.png')}
                    style={{
                        flex: 1,
                        width: appInfors.sizes.WIDTH,
                        height: appInfors.sizes.HEIGHT,
                        resizeMode: 'cover'
                    }}
                />

            </Swiper>

            <View style={[
                {
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }
            ]}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <TextComponent
                        text='Skip'
                        color={appColors.white}
                        font={fontFamily.medium}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    return index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
                }}>
                    <TextComponent
                        text='Next'
                        color={appColors.white}
                        font={fontFamily.medium}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnboardingScreen

