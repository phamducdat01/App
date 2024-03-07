import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,

}

const ContainerComponent = (props: Props) => {

    const { isImageBackground, isScroll, title, children } = props;

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );

    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/img/splash-img.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>

                {returnContainer}

            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            <View>{returnContainer}</View>
        </SafeAreaView>
    )
}

export default ContainerComponent