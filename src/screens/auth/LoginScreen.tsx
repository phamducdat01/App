import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { ContainerComponent, InputComponent, TextComponent } from '../../components'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const LoginScreen = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  return (
    <ContainerComponent isImageBackground>

      <TextComponent text='phamducdat' flex={0} />

      {/* <InputComponent
        value={email}
        placeholder='Email'
        onChange={(val) => setEmail(val)}
        // isPassword
        allowClear
        type='email-address'
        affix={<Sms size={22} color={appColors.gay} />}
      />

      <InputComponent
        value={password}
        placeholder='Password'
        onChange={(val) => setPassword(val)}
        isPassword
        affix={<Lock size={22} color={appColors.gay} />}
      /> */}
    </ContainerComponent>
  )
}

export default LoginScreen