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
    textFont?: string,
    onPress?: () => void,
    iconFlex?: 'right' | 'left',
    disable?: boolean,

}

const ButtonComponent = (props: Props) => {

    const { icon, text, type, color, styles, textColor, textStyles, onPress, iconFlex, textFont, disable } = props;

    return type === 'primary' ? (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                disabled={disable}

                onPress={onPress}

                style={[
                    globalStyles.button,
                    globalStyles.shawdow,
                    {
                        backgroundColor: color
                            ? color
                            : disable
                                ? appColors.gay3
                                : appColors.primary,
                        marginBottom: 17,
                        width: '80%'
                    },
                    styles,
                ]}
            >

                {icon && iconFlex === 'left' && icon}
                <TextComponent
                    text={text}
                    color={textColor ?? appColors.white}
                    styles={[
                        textStyles,
                        {
                            marginLeft: icon ? 12 : 0,
                            fontSize: 16,
                            textAlign: 'center'
                        }
                    ]}
                    flex={icon && iconFlex === 'right' ? 1 : 0}
                    font={textFont ?? fontFamily.medium}
                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        </View>
    ) :
        (
            <TouchableOpacity onPress={onPress}>
                <TextComponent text={text} color={textColor ?? appColors.link} />
            </TouchableOpacity>
        )
}

export default ButtonComponent