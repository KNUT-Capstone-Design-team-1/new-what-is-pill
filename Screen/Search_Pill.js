import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'

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
  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>촬영 가이드 라인</Text>
    </SafeAreaView>

    <Image style={styles.photo_st} source={{uri:img_uri}}/>

    <Text style={styles.description_txt}>
    {'\n '}1. 알약의 글자가 나오게 찍어주세요{'\n\n '}
    2. 글자가 수평으로 보이게 찍어주세요{'\n\n '}
    3. 하나의 알약만 찍어주세요{'\n\n '}
    4. 손바닥과 알약이 잘 구분되게 찍어주세요{'\n\n '}
    </Text>

    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.opacity_st} onPress={()=>camera(props)}>
        <Image style={styles.btn_st} source={require('../image/camera.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.opacity_st} onPress={()=>gallery(props)}>
        <Image style={styles.btn_st} source={require('../image/gallery.png')}/>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#81C147',
  },
  header:{
    height:'6%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  photo_st:{
    height:'50%',
    width:'100%',
    marginVertical:'2%',
    resizeMode:'contain',
  },
  description_txt:{
    height:'30%',
    width:'100%',
    color:'black', 
    fontSize:22, 
    fontFamily:'Jua-Regular',
    borderWidth:2,
    borderRadius:8,
  },
  btn_container:{
    height:'30%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
    marginTop:'-15%',
    flexDirection:'row',
  },
  opacity_st:{
    height:'25%',
    width:'45%',
    margin:'2%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center',
  },
  btn_st:{
    height:'100%',
    width:'100%',
    margin:'2%',
  },
  txt_st:{
    color:'black',
    fontSize:30,
    fontFamily:'Jua-Regular',
  },
})