import * as React from 'react'
import {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'
global.img_uri = 'https://user-images.githubusercontent.com/33280934/119253999-db40ce00-bbee-11eb-8757-1be2fc2702cb.jpg'
global.img_base64 = ''

// 카메라 실행
export function camera(props){
  const options={
    mediaType:'photo',
    cameraType:'front',
    saveToPhotos:true,
    includeBase64:true,
  }
  try {launchCamera(options, (uri)=>{
    const {navigation} = props
    if (uri.uri!=null){
      img_uri = uri.uri
      img_base64 = uri.base64
      navigation.replace('Check_Pic')
    }})}
  catch(e){
    if (e=='camera_unavailable'){ToastAndroid.showWithGravity('카메라를 사용할 수 없습니다',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else if (e=='permission'){ToastAndroid.showWithGravity('앱의 카메라 권한을 허용해주세요.',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else {ToastAndroid.showWithGravity(`오류코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.BOTTOM)}
  }
}

// 갤러리 실행
export function gallery(props){
  const options={ 
    mediaType:'photo', 
    quality:1,
    includeBase64:true, 
  }
  try {launchImageLibrary(options, (uri)=>{
    const {navigation} = props
    if (uri.uri!=null){
      img_uri = uri.uri
      img_base64 = uri.base64
      navigation.replace('Check_Pic')
    }})}
  catch(e){
    if (e=='permission'){ToastAndroid.showWithGravity('앱의 권한을 허용해주세요.',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else {ToastAndroid.showWithGravity(`오류코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.BOTTOM)}
  }
}

export default function Search_Pill(props){
  const [image, set_image] = useState(img_uri)
  const change_image=()=>{set_image(img_uri)}

  return(
  <SafeAreaView style={{flex:1}}>

    <SafeAreaView style={styles.header}>
      <Text style={styles.header_txt}>촬영 가이드 라인</Text>
    </SafeAreaView>

    <SafeAreaView style={styles.image_container}>
      <Image style={styles.photo_st} source={{uri:image}}/>
    </SafeAreaView>

    <SafeAreaView style={styles.text_container}>
      <Text style={styles.txt_st}>
      1. 알약의 글자가 나오게 찍어주세요</Text>
      <Text style={styles.txt_st}>
      2. 하나의 알약만 찍어주세요</Text>
      <Text style={styles.txt_st}>
      3. 글자가 잘 보이도록 가까이서 찍어주세요</Text>
      <Text style={styles.txt_st}>
      4. 손바닥과 알약이 잘 구분되게 찍어주세요</Text>
    </SafeAreaView>

    <SafeAreaView style={styles.btn_container}>

      <TouchableOpacity style={styles.btn_st} onPress={()=>camera(props)}>
        <Text style={styles.header_txt}>카메라</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn_st} onPress={()=>gallery(props)}>
        <Text style={styles.header_txt}>갤러리</Text>
      </TouchableOpacity>

    </SafeAreaView>

  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    flex:0.25,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center',
  },
  header_txt:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular', 
  },
  image_container:{
    flex:1.7,
    justifyContent:'center',
    alignItems:'center',
    marginTop:"8%",
  },
  photo_st:{
    height:'120%',
    width:'100%',
    resizeMode:'contain',
  },
  text_container:{
    flex:1,
    paddingTop:'7%',
    marginTop:'7%',
  },
  txt_st:{
    color:'black', 
    fontSize:22, 
    fontFamily:'Jua-Regular', 
    marginLeft:'3%', 
    marginBottom:'3%',
  },
  btn_container:{
    flex:0.8,
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row',
  },
  btn_st:{
    height: '30%',
    width: '45%',
    backgroundColor:'#83FFB3',
    margin: '3%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:"-15%",
  },
});