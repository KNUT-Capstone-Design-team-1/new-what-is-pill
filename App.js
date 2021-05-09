import 'react-native-gesture-handler'
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Main from './Screen/Main'
import Check_Pic from './Screen/Check_Pic'
import GuideLine from './Screen/GuideLine'
import Information_Pill from './Screen/Information_Pill'
import Manage_Pill from './Screen/Manage_Pill'
import Pharm_Search from './Screen/Pharm_Search'

const Stack = createStackNavigator();

export default function App(){
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
