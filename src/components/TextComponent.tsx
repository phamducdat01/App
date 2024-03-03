import React from 'react'
import { StyleProp, Text, TextStyle, View } from 'react-native'
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    text: string,
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    styles?: StyleProp<TextStyle>,
    title?: boolean,
}

const TextComponent = (props: Props) => {

    const { text, color, size, flex, font, styles, title } = props;

    return (
        <Text
            style={[

                globalStyles.text,

                {
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontSize: size ?? title ? 24 : 14,
                    fontFamily: font ?? title ? fontFamily.bold : fontFamily.regular,
                },

                styles,

            ]}>
            {text}
        </Text>
    )
}

export default TextComponent