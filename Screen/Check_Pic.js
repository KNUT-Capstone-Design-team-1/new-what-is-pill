import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as Search_Pill from './Search_Pill'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, Alert, ToastAndroid} from 'react-native'

// 인공지능 서버에 사진 보낸뒤 검색 서버로 부터 결과를 받아올것
// Error code에 따라 다른 Alert표시
// 어떤 종류의 검색 실패든 화면을 GuideLine으로 전환
// 검색 성공시에는 Information_Pill로 전환

export function Send_img(props){
    const {navigation} = props
    ToastAndroid.showWithGravity('검색중..',ToastAndroid.LONG,ToastAndroid.CENTER)
    navigation.navigate('Information_Pill')
}

export default function Check_Pic(props){
  return(
  <SafeAreaView style={{flex:1}}>
    <SafeAreaView style={styles.header}>
      <Text style={{color:'black', fontSize:35, fontFamily:'Jua-Regular'}}>사진 확인</Text>
    </SafeAreaView>
    <SafeAreaView style={styles.photo_container}>
      <Image style={{height:'70%',width:'100%',resizeMode:'contain'}} source={{uri:img_temp}}/>
    </SafeAreaView>
    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st1} onPress={()=>Send_img(props)}>
        <Text style={styles.txt_st}>검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st2} onPress={()=>Search_Pill.camera(props)}>
        <Text style={styles.txt_st}>재촬영</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st2} onPress={()=>Search_Pill.gallery(props)}>
        <Text style={styles.txt_st}>갤러리</Text>
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