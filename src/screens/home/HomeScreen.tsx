import { View, Text, Button } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/appColors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'


const HomeScreen = () => {

  const dispatch = useDispatch();
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: appColors.primary }}>HomeScreen</Text>
      <Button title='Logout' onPress={async () => {
        AsyncStorage.clear();
        dispatch(removeAuth({}))
      }} />
    </View>
  )
}

export default HomeScreen