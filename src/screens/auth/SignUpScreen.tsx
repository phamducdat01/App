import { Lock, Sms, User } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Image, Switch } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamily } from '../../constants/fontFamily'
import SocialLogin from './components/SocialLogin'

const innitValue = {
  username: '',
  password: '',
  email: '',
  comfirmPassword: '',
}

const SignUpScreen = ({ navigation }: any) => {

  const [values, setValues] = useState(innitValue);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  }

  return (
    <ContainerComponent isImageBackground isScroll back>

      <SectionComponent>

        <TextComponent size={24} title text='Sign up' />

        <SpaceComponent height={21} />
        <InputComponent
          value={values.username}
          placeholder='Full name'
          onChange={(val) => handleChangeValue('username', val)}
          allowClear
          type='email-address'
          affix={<User size={22} color={appColors.gay} />}
        />
        <InputComponent
          value={values.email}
          placeholder='abc123@gmail.com'
          onChange={(val) => handleChangeValue('email', val)}
          allowClear
          type='email-address'
          affix={<Sms size={22} color={appColors.gay} />}
        />

        <InputComponent
          value={values.password}
          placeholder='Password'
          onChange={(val) => handleChangeValue('password', val)}
          isPassword
          affix={<Lock size={22} color={appColors.gay} />}
        />
        <InputComponent
          value={values.comfirmPassword}
          placeholder='Comfirm Password'
          onChange={(val) => handleChangeValue('comfirmPassword', val)}
          isPassword
          affix={<Lock size={22} color={appColors.gay} />}
        />


      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent >
        <ButtonComponent text='SIGN UP' type='primary' />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent >
        <RowComponent justify='center'>
          <TextComponent text="Already have an account?" />
          <ButtonComponent
            type='link'
            text='Sign in'
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default SignUpScreen