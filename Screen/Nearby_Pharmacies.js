import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import RNLocation from 'react-native-location'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid} from 'react-native'

async function get_pharm_list(){
  RNLocation.subscribeToLocationUpdates()
  RNLocation.getLatestLocation({ timeout: 60000 }).then(async latestLocation => {
    console.log('x = ', latestLocation.longitude, 'y =', latestLocation.latitude)
    try{
      let response = await fetch('https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=PM9&radius=20000&x=-122.08399953&y=37.4219731&input_coord=WGS84',{
        headers:{Authorization : 'KakaoAK 33a8b02db1a0de6d37b4d7de43955e46'},})
      const result = await response.text()
      console.log(result)
    }catch(e){ console.log(e) }
  })
}

export default function Nearby_Pharmacies(props){
  const {navigation} = props;
  get_pharm_list()

  return(
    <SafeAreaView style={{flex:1}}>
      <SafeAreaView style={styles.header}>
        <Text style={{color:'black', fontSize:30, fontFamily:'Jua-Regular'}}>주변 약국 찾기</Text>
      </SafeAreaView>
        <WebView style={{flex:1}} source={{uri:'https://map.kakao.com/?q=%EC%95%BD%EA%B5%AD'}} useWebkit={true}/>
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