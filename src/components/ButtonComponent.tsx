import { View, Text, StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { ViewConfig } from 'react-native-reanimated/lib/typescript/ConfigHelper'
import { TextComponent } from '.';

interface Props {
    icon?: ReactNode,
    text: string,
    type?: 'primary' | 'text' | 'link',
    color?: string,
    styles?: StyleProp<ViewConfig>,
    textColor?: string,
    textStyles?: StyleProp<TextStyle>,
    onPress: () => void,
    iconFlex?:'right' | 'left',
}

const ButtonComponent = (props: Props) => {

    const {icon,text,type,color,styles,textColor,textStyles,onPress,iconFlex} =props;

    return (
        <TouchableOpacity>
            <TextComponent text={text} color={textColor} styles={textStyles} />
        </TouchableOpacity>
    )
}

export default ButtonComponent