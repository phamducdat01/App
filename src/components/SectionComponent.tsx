import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    children: ReactNode,
    styles?: StyleProp<ViewStyle>,

}

const SectionComponenet = (props: Props) => {

    const { children, styles } = props;

    return (
        <View style={[globalStyles.section, styles]}>
            {children}
        </View>
    )
}

export default SectionComponenet