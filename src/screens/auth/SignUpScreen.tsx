import { Lock, Sms, User } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import SocialLogin from './components/SocialLogin'
import LoadingModal from '../../modals/LoadingModal'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const innitValue = {
  username: '',
  password: '',
  email: '',
  comfirmPassword: '',
}

const SignUpScreen = ({ navigation }: any) => {

  const [values, setValues] = useState(innitValue);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (values.email || values.password || values.comfirmPassword) {
      seterrorMessage('');
    }
  }, [values.email, values.password, values.comfirmPassword])

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  }

  const handeRegister = async () => {
    const { email, password, comfirmPassword } = values;

    const emailValidation = Validate.email(email);
    const passwordValidation = Validate.Password(password);

    if (email && password && comfirmPassword) {
      if (emailValidation) {
        if (passwordValidation) {
          seterrorMessage('');
          setisLoading(true);
          try {
            const res = await authenticationAPI.HandleAuthentication('/register', {
              fullname: values.username,
              email,
              password,

            }, 'post');

            dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));

            setisLoading(false);
          } catch (error) {
            console.log(error);
            setisLoading(false);
          }
        } else {
          seterrorMessage('Password must be at least 6 characters long !!!');
        }
      } else {
        seterrorMessage('Email has incorrect format !!!');
      }

    } else {
      seterrorMessage('Please enter complete information');
    }
  }

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>

        <SectionComponent>

          <TextComponent size={24} title text='Sign up' />

          <SpaceComponent height={21} />
          <InputComponent
            value={values.username}
            placeholder='Full name'
            onChange={(val) => handleChangeValue('username', val)}
            allowClear
            type='default'
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

        {errorMessage && (
          <SectionComponent>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}



        <SpaceComponent height={16} />

        <SectionComponent >
          <ButtonComponent
            onPress={handeRegister}
            text='SIGN UP'
            type='primary'
          />
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
      <LoadingModal visible={isLoading} />
    </>
  )
}

export default SignUpScreen