import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { appColors } from '../../constants/appColors'
import { ContainerComponent, SectionComponent, TextComponent, InputComponent, SpaceComponent, ButtonComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'

const FogotPassword = () => {

    const [email, setEmail] = useState('');

    return (
        <ContainerComponent back isImageBackground>
            <SectionComponent>
                <TextComponent text='Reset Password' title />
                <TextComponent text='Please enter your email address to request a password reset' />

                <SpaceComponent height={16} />

                <InputComponent
                    value={email}
                    placeholder='abc123@gmail.com'
                    onChange={(val) => setEmail(val)}
                    allowClear
                    type='email-address'
                    affix={<Sms size={22} color={appColors.gay} />}
                />
            </SectionComponent>

            <SectionComponent>
                <ButtonComponent
                    text='Send'
                    type='primary'
                    icon={<ArrowRight size={20} color={appColors.white} />}
                    iconFlex='right'
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default FogotPassword