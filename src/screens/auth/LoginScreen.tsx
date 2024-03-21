import { Lock, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Image, Switch } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'

const LoginScreen = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [isRemember, setisRemember] = useState(true);

  return (
    <ContainerComponent isImageBackground isScroll>

      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 30,

        }}>
        <Image
          source={require('../../assets/img/text-logo.png')}
          style={{
            width: 162,
            height: 114,
          }}
        />
      </SectionComponent>

      <SectionComponent>

        <TextComponent size={24} font={fontFamily.bold} text='Sing in' />

        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder='Email'
          onChange={(val) => setEmail(val)}
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
        />

        <RowComponent justify='space-between'>
          <RowComponent onPress={() => setisRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setisRemember(!isRemember)}
            />
            <TextComponent text='Remember me' />
          </RowComponent>

          <ButtonComponent
            text='Forgot Password'
            onPress={() => { }}
            type='text'
            textColor={appColors.gay}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent text='SIGN IN' type='primary' />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent >
        <RowComponent justify='center'>
          <TextComponent text="Don't have an account?" />
          <ButtonComponent type='link' text='Sign up' />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginScreen