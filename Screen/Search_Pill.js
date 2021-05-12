import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'
global.img_temp = 'https://user-images.githubusercontent.com/33280934/117855772-c6e30400-b2c5-11eb-9d5c-97d1d2ad8262.jpg'

export function camera(props){
  const options={
    mediaType:'photo',
    cameraType:'front',
    saveToPhotos:true,
  };
  const {navigation} = props
  try {launchCamera(options, (uri)=>{
    img_temp = uri.uri
    if (uri.uri!=null){navigation.replace('Check_Pic')}})}
  catch(e){
    if (e=='camera_unavailable'){ToastAndroid.showWithGravity('카메라를 사용할 수 없습니다',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else if (e=='permission'){ToastAndroid.showWithGravity('앱의 카메라 권한을 허용해주세요.',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else {ToastAndroid.showWithGravity(`오류코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.BOTTOM)}
  }
}

export function gallery(props){
  const options={ mediaType:'photo', quality:1, }
  const {navigation} = props

  try {launchImageLibrary(options, (uri)=>{
    img_temp = uri.uri
    if (uri.uri!=null){navigation.replace('Check_Pic')}})}
  catch(e){
    if (e=='permission'){ToastAndroid.showWithGravity('앱의 권한을 허용해주세요.',ToastAndroid.LONG,ToastAndroid.BOTTOM)} 
    else {ToastAndroid.showWithGravity(`오류코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.BOTTOM)}
  }
}

export default function Search_Pill(props){
  img_temp='https://user-images.githubusercontent.com/33280934/117855772-c6e30400-b2c5-11eb-9d5c-97d1d2ad8262.jpg'
  state = {image:img_temp,}
  const {navigation} = props

  return(
  <SafeAreaView style={{flex:1}}>
    <SafeAreaView style={styles.header}>
      <Text style={{color:'black', fontSize:35, fontFamily:'Jua-Regular'}}>촬영 가이드 라인</Text>
    </SafeAreaView>
    <SafeAreaView style={styles.image_container}>
      <Image style={{height:'120%', width:'100%', resizeMode:'contain'}} source={{uri:state.image}}/>
    </SafeAreaView>
    <SafeAreaView style={styles.text_container}>
      <Text style={styles.first_txt}>
      1. 알약이 잘보이게 찍는다</Text>
      <Text style={styles.txt_st}>
      2. 글씨가 잘보이게 찍는다</Text>
      <Text style={styles.txt_st}>
      3. 색상이 잘보이게 찍는다</Text>
    </SafeAreaView>
    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st} onPress={()=>camera(props)}>
        <Text style={styles.btn_txt}>카메라</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st} onPress={()=>gallery(props)}>
        <Text style={styles.btn_txt}>갤러리</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header:{
    flex:0.3,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center'
  },
  image_container:{
    flex:1.7,
    justifyContent:'center',
    alignItems:'center',
    marginTop:"8%"
  },
  text_container:{
    flex:1,
    marginTop:'7%'
  },
  btn_container:{
    flex:0.8,
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row'
  },
  first_txt:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular', 
    marginTop:'5%', 
    marginLeft:'3%', 
    marginBottom:'3%'
  },
  txt_st:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular', 
    marginLeft:'3%', 
    marginBottom:'3%'
  },
  btn_st:{
    height: '30%',
    width: '45%',
    backgroundColor:'#83FFB3',
    margin: '3%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:"-15%"
  },
  btn_txt:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular'
  },
});