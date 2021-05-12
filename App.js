import * as React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions'
import {ToastAndroid, PermissionsAndroid} from 'react-native'
import Main from './Screen/Main'
import Check_Pic from './Screen/Check_Pic'
import Search_Pill from './Screen/Search_Pill'
import Information_Pill from './Screen/Information_Pill'
import Manage_Pill from './Screen/Manage_Pill'
import Nearby_Pharmacies from './Screen/Nearby_Pharmacies'
const Stack = createStackNavigator();

async function requestPermission() {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    // PermissionsAndroid.PERMISSIONS.INTERNET,
  ]).then((result)=>{
    if (result['android.permission.CAMERA']
    && result['android.permission.WRITE_EXTERNAL_STORAGE']
    && result['android.permission.READ_EXTERNAL_STORAGE']
    && result['android.permission.ACCESS_COARSE_LOCATION']
    && result['android.permission.ACCESS_FINE_LOCATION']
    === 'granted'){
      ToastAndroid.showWithGravity('모든 권한 획득',ToastAndroid.LONG,ToastAndroid.CENTER)
    } else {
      ToastAndroid.showWithGravity('권한 거절',ToastAndroid.LONG,ToastAndroid.CENTER)
    }
  })
}

export default function App(){
  requestPermission()
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
          <Stack.Screen name='Check_Pic' component={Check_Pic} options={{headerShown: false}}/>
          <Stack.Screen name='Search_Pill' component={Search_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Information_Pill' component={Information_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Manage_Pill' component={Manage_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Nearby_Pharmacies' component={Nearby_Pharmacies} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
