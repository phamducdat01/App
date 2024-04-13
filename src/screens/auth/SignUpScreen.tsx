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


interface ErrorMessages {
  email: string;
  password: string;
  confirmPassword: string;
}

const innitValue = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
}

const SignUpScreen = ({ navigation }: any) => {

  const [values, setValues] = useState(innitValue);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[key] = value;
    setValues(data);
  }

  const formValidator = (key: string) => {
    const data = { ...errorMessage };
    let message = ``;

    switch (key) {
      case 'email':
        if (!values.email) {
          message = `Email is required!!!`;
        } else if (!Validate.email(values.email)) {
          message = 'Email is not invalid!!';
        } else {
          message = '';
        }

        break;

      case 'password':
        message = !values.password ? `Password is required!!!` :
          !Validate.Password(values.password) ? `Pass min 6 character` : '';
        break;

      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = `Please type confirm password!!`;
        } else if (values.confirmPassword !== values.password) {
          message = 'Password is not match!!!';
        } else {
          message = '';
        }

        break;
    }

    data[key] = message;

    seterrorMessage(data);
  };

  const handeRegister = async () => {
    const api = `/verification`;
    setisLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        { email: values.email },
        'post',
      );

      console.log(res.data.code);

      setisLoading(false);

      navigation.navigate('Verification', {
        code: res.data.code,
        ...values,
      });
    } catch (error) {
      console.log(error);
      setisLoading(false);
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
            onEnd={() => formValidator('email')}
          />

          <InputComponent
            value={values.password}
            placeholder='Password'
            onChange={(val) => handleChangeValue('password', val)}
            isPassword
            affix={<Lock size={22} color={appColors.gay} />}
            onEnd={() => formValidator('password')}

          />
          <InputComponent
            value={values.confirmPassword}
            placeholder='Confirm Password'
            onChange={(val) => handleChangeValue('confirmPassword', val)}
            isPassword
            affix={<Lock size={22} color={appColors.gay} />}
            onEnd={() => formValidator('confirmPassword')}

          />


        </SectionComponent>

        {errorMessage && (
          <SectionComponent>
            {Object.keys(errorMessage).map(
              (error, index) =>
                errorMessage[error] && (
                  <TextComponent
                    text={errorMessage[error]}
                    key={`error${index}`}
                    color={appColors.danger}
                  />
                ),
            )}
          </SectionComponent>
        )}



        <SpaceComponent height={16} />

        <SectionComponent >
          <ButtonComponent
            onPress={handeRegister}
            text='SIGN UP'
            disable={isDisable}
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