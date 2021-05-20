import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid} from 'react-native'
global.clicked=0

export default function Nearby_Pharmacies(props){
  const {navigation} = props;
  return(
    <SafeAreaView style={{flex:1}}>
      <SafeAreaView style={styles.header}>
        <Text style={{color:'black', fontSize:30, fontFamily:'Jua-Regular'}}>주변 약국 찾기</Text>
      </SafeAreaView>
      <SafeAreaView style={{flex:1}}>
        {
          clicked === 1
          ? {pharm_list_btn}
          :(<WebView style={{flex:1}} source={{uri:'http://place.map.kakao.com/8731490'}} useWebkit={true}/>)
        }
      </SafeAreaView>
      <SafeAreaView style={styles.btn_container}>
        <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Main')}>
          <Text style={styles.txt_st}>메인화면</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  )
  }
  
  
const styles = StyleSheet.create({
  header:{
    flex:0.07,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center'
  },
  btn_container:{
    flex:0.2,
    justifyContent:'center',
    alignItems:'center',
    marginRight:'2%',
    marginLeft:'2%',
  },
  txt_st:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular', 
  },
  btn_st:{
    height:'40%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
  },
});