import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamily } from '../../../constants/fontFamily'
import { Google } from 'iconsax-react-native'

const SocialLogin = () => {
    return (
        <SectionComponent>
            <TextComponent
                styles={{ textAlign: 'center' }}
                text='OR'
                color={appColors.gay}
                size={16}
                font={fontFamily.medium}
            />

            <ButtonComponent
                type='primary'
                text='Login with Google'
                color={appColors.white}
                textColor={appColors.text}
                icon={<Google size={24} color={appColors.primary} />}
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin