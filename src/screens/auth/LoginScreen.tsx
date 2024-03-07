import React, { useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { InputComponent } from '../../components'
import { Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const LoginScreen = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  return (
    <View style={[globalStyles.container, {
      padding: 16,
      // backgroundColor: 'coral',
      justifyContent: 'center',
      alignItems: 'center',
    }]}>
      <InputComponent
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
        affix={<Sms size={22} color={appColors.gay} />}
      />
    </View>
  )
}

export default LoginScreen