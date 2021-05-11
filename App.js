import * as React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions'
import {ToastAndroid, PermissionsAndroid} from 'react-native'
import Main from './Screen/Main'
import Check_Pic from './Screen/Check_Pic'
import GuideLine from './Screen/GuideLine'
import Information_Pill from './Screen/Information_Pill'
import Manage_Pill from './Screen/Manage_Pill'
import Pharm_Search from './Screen/Pharm_Search'

const Stack = createStackNavigator();

async function requestCameraPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: '카메라 권한 요청',
      message: '알약 촬영을 위한 카메라 권한이 필요합니다.',
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Camera Permission Success')
  } else {ToastAndroid.showWithGravity('카메라 권한이 거부되었습니다. 알약 촬영이 불가합니다.',ToastAndroid.LONG,ToastAndroid.CENTER)}
}

export default function App(){
  requestCameraPermission()
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
          <Stack.Screen name='Check_Pic' component={Check_Pic} options={{headerShown: false}}/>
          <Stack.Screen name='GuideLine' component={GuideLine} options={{headerShown: false}}/>
          <Stack.Screen name='Information_Pill' component={Information_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Manage_Pill' component={Manage_Pill} options={{headerShown: false}}/>
          <Stack.Screen name='Pharm_Search' component={Pharm_Search} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
