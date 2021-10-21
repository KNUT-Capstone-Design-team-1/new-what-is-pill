import * as React from 'react'

// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// 재촬영 및 갤러리 사진 재선택을 위한 모듈 포함
import * as Search_Pill from './Search_Pill'

// 화면 구성 컴포넌트
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'


export default function Check_Pic(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props
  
  return(
  <SafeAreaView style={styles.container}>
    {/* 헤더 */}
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>사진 확인</Text>
    </SafeAreaView>

    {/* 촬영하거나 선택한 사진 */}
    <Image style={styles.photo_st} source={{uri:img_uri}}/>

    {/* 검색버튼 */}
    <TouchableOpacity style={styles.btn_layer_1} onPress={()=>{navigation.navigate('Loading_Page'), pill_managing_sw=0}}>
      <Image style={styles.btn_st} source={require('../image/search.png')}/>
    </TouchableOpacity>

    <SafeAreaView style={styles.btn_layer_2}>
      {/* 재촬영 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>Search_Pill.camera(props)}>
        <Image style={styles.btn_st} source={require('../image/recamera.png')}/>
      </TouchableOpacity>

      {/* 갤러리 재선택 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>Search_Pill.gallery(props)}>
        <Image style={styles.btn_st} source={require('../image/gallery.png')}/>
      </TouchableOpacity>
    </SafeAreaView>

    {/* 메인 화면 이동 */}
    <TouchableOpacity style={styles.btn_layer_3} onPress={()=>navigation.navigate('Main')}>
      <Image style={styles.btn_st} source={require('../image/main.png')}/>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

// 디자인 레이아웃
const styles = StyleSheet.create({
  // 전체 화면 레이아웃
  container:{
    flex:1,
    backgroundColor:'#81C147',
  },
  // 헤더 레이아웃
  header:{
    height:'6%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  // 촬영 및 선택한 사진 레이아웃
  photo_st:{
    height:'61%',
    width:'100%',
    resizeMode:'contain',
  },
  // 검색 버튼 컨테이너 레이아웃
  btn_layer_1:{
    height:'14%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
  },
  // 재촬영 및 갤러리 재선택 버튼 컨테이너 레이아웃
  btn_layer_2:{
    height:'10%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row',
  },
  // 메인 화면 버튼 컨테이너 레이아웃
  btn_layer_3:{
    height:'9%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
  },
  // 버튼 레이아웃
  opacity_st:{
    height:'100%',
    width:'48%',
    marginLeft:'3%',
    justifyContent: 'center',
    alignItems:'center',
  },
  // 버튼 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  // 전체적인 텍스트 레이아웃
  txt_st:{
    color:'white',
    fontSize:35,
    fontFamily:'Jua-Regular',
  },
})