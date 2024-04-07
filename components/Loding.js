import React from 'react'
import { View,Text,ActivityIndicator } from 'react-native'

const Loding = (props) => {
  return (
    <View className={'flex-1 flex justify-center items-center'}>
        <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loding