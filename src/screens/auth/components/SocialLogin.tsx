
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamily } from '../../../constants/fontFamily'
import { Facebook, Google } from '../../../assets/svgs'

const SocialLogin = () => {
    return (
        <SectionComponent >
            <TextComponent
                styles={{ textAlign: 'center' }}
                text='OR'
                color={appColors.gay}
                size={16}
                font={fontFamily.medium}
            />

            <SpaceComponent height={5} />

            <ButtonComponent
                type='primary'
                text='Login with Google'
                color={appColors.white}
                textColor={appColors.text}
                textFont={fontFamily.regular}
                icon={<Google />}
                iconFlex='left'
            />

            <ButtonComponent
                type='primary'
                text='Login with Facebook'
                color={appColors.white}
                textColor={appColors.text}
                textFont={fontFamily.regular}
                icon={<Facebook />}
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin