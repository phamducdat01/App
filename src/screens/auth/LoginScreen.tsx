import AsyncStorage from '@react-native-async-storage/async-storage'
import { Lock, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Alert, Image, Switch } from 'react-native'
import { useDispatch } from 'react-redux'
import authenticationAPI from '../../apis/authApi'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { addAuth } from '../../redux/reducers/authReducer'
import { Validate } from '../../utils/validate'
import SocialLogin from './components/SocialLogin'

const LoginScreen = ({ navigation }: any) => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [isRemember, setisRemember] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          { email, password },
          'post',
        );

        dispatch(addAuth(res.data));

        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Email is not correct!!!!');
    }
  };

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
          source={require('../../assets/img/logomeo.png')}
          style={{
            width: 162 * 1.5,
            height: 114 * 1.5,
            resizeMode: 'cover'
          }}
        />
      </SectionComponent>

      <SectionComponent >

        <TextComponent size={24} title text='Sign in' />

        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder='abc123@gmail.com'
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
            type='link'
            textColor={appColors.gay}
            onPress={() => navigation.navigate('FogotPassword')}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent >
        <ButtonComponent onPress={handleLogin} text='SIGN IN' type='primary' />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent >
        <RowComponent justify='center'>
          <TextComponent text="Don't have an account?" />
          <ButtonComponent
            type='link'
            text='Sign up'
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginScreen

