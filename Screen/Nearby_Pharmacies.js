import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, Alert, ToastAndroid} from 'react-native'

export function call_to_pharmacy(){
  ToastAndroid.showWithGravity('전화중..',ToastAndroid.LONG,ToastAndroid.CENTER)
}

export default function Nearby_Pharmacies(props){
  const {navigation} = props;
  return(
  <SafeAreaView style={{flex:1}}>
    <SafeAreaView style={styles.header}>
      <Text style={{color:'black', fontSize:35, fontFamily:'Jua-Regular'}}>주변 약국 검색 </Text>
    </SafeAreaView>
    <SafeAreaView style={styles.photo_container}>
      <Image style={{height:'100%',width:'100%',resizeMode:'contain'}} source={{uri:'https://user-images.githubusercontent.com/33280934/117855772-c6e30400-b2c5-11eb-9d5c-97d1d2ad8262.jpg'}}/>
    </SafeAreaView>
    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st2} onPress={()=>call_to_pharmacy(props)}>
        <Text style={styles.txt_st}>전화</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st2} onPress={()=>navigation.navigate('Main')}>
        <Text style={styles.txt_st}>메인화면</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    flex:0.12,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center'
  },
  photo_container:{
    flex:1.5,
    alignItems:'center',
    margin:'2%',
  },
  btn_container:{
    flex:0.35,
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
  btn_st1:{
    height:'40%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
    marginTop:'-50%'
  },
  btn_st2:{
    height:'40%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
    marginTop:'2%'
  },
});