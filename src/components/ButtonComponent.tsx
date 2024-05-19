import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import { TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';

interface Props {
    icon?: ReactNode;
    text?: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    textFont?: string;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
    width?: any;
}

const ButtonComponent = (props: Props) => {
    const {
        icon,
        text,
        textColor,
        textStyles,
        textFont,
        color,
        styles,
        onPress,
        iconFlex,
        type,
        disable,
        width,
    } = props;

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
                                ? appColors.gray4
                                : appColors.primary,
                        marginBottom: 17,
                        width: width ? width : '90%',
                    },
                    styles,
                ]}>
                {icon && iconFlex === 'left' && icon}
                {text && (
                    <TextComponent
                        text={text}
                        color={textColor ?? appColors.white}
                        styles={[
                            textStyles,
                            {
                                marginLeft: icon ? 12 : 0,
                                fontSize: 16,
                                textAlign: 'center',
                            },
                        ]}
                        flex={icon && iconFlex === 'right' ? 1 : 0}
                        font={textFont ?? fontFamily.medium}
                    />
                )}
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        </View>
    ) : (
        <TouchableOpacity onPress={onPress}>
            {icon && icon}
            {text && (
                <TextComponent
                    flex={0}
                    text={text}
                    color={type === 'link' ? appColors.primary : appColors.text}
                />
            )}
        </TouchableOpacity>
    );
};

export default ButtonComponent;