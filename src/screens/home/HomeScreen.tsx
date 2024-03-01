import { View, Text, Button } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/appColors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }}>
      <Text style={{color:appColors.primary}}>HomeScreen</Text>
      <Button title='Logout' onPress={async ()=> await AsyncStorage.clear()} />
    </View>
  )
}

export default HomeScreen