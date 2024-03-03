import { View, Text, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { ViewConfig } from 'react-native-reanimated/lib/typescript/ConfigHelper'
import { TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';

interface Props {
    icon?: ReactNode,
    text: string,
    type?: 'primary' | 'text' | 'link',
    color?: string,
    styles?: StyleProp<ViewStyle>,
    textColor?: string,
    textStyles?: StyleProp<TextStyle>,
    onPress: () => void,
    iconFlex?: 'right' | 'left',
}

const ButtonComponent = (props: Props) => {

    const { icon, text, type, color, styles, textColor, textStyles, onPress, iconFlex } = props;

    return type === 'primary' ? (
        <TouchableOpacity

            onPress={onPress}

            style={[
                globalStyles.button,
                {
                    backgroundColor: color ?? appColors.primary
                },
                styles
            ]}
        >

            {icon && icon}
            <TextComponent
                text={text}
                color={textColor ?? appColors.white}
                styles={[
                    textStyles,
                    {
                        marginLeft: icon ? 12 : 0,
                    }
                ]}
                flex={icon && iconFlex === 'right' ? 1 : 0}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ):
    (
        <TouchableOpacity>
            <TextComponent text={text} />
        </TouchableOpacity>
    )
}

export default ButtonComponent