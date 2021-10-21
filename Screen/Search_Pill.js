import * as React from 'react'

// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// 카메라 및 갤러리 실행을 위한 라이브러리
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker'

// 화면 구성을 위한 컴포넌트
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'


// 카메라 실행
export function camera(props){
  // 카메라 실행 관련 옵션
  const options={
    mediaType:'photo',
    cameraType:'front',
    saveToPhotos:true,
    includeBase64:true,
  }
  // 카메라 실행 및 예외처리
  try {launchCamera(options, (uri)=>{
    // 화면 이동을 위한 네비게이션 선언
    const {navigation} = props
    // 촬영한 이미지 base64 변환
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
  // 갤러리 관련 옵션
  const options={ 
    mediaType:'photo', 
    quality:1,
    includeBase64:true, 
  }
  // 갤러리 실행 및 예외처리
  try {launchImageLibrary(options, (uri)=>{
    // 화면 이동을 위한 네비게이션 선언
    const {navigation} = props
    // 선택한 이미지 base64 변환
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
    {/* 헤더 */}
    <SafeAreaView style={styles.header}>
      <Text style={styles.header_txt}>이렇게 찍어주세요</Text>
    </SafeAreaView>

    {/* 예시 이미지 */}
    <Image style={styles.photo_st} source={{uri:img_uri}}/>

    {/* 안내사항 */}
    <Text style={styles.description_txt}>
    {'\n '}ㆍ 알약의 글자가 잘보이게 찍어주세요{'\n\n '}
    ㆍ 글자가 수평으로 보이게 찍어주세요{'\n\n '}
    ㆍ 알약은 하나씩 올려서 찍어주세요{'\n\n '}
    </Text>

    {/* 버튼  */}
    <SafeAreaView style={styles.btn_container}>
      {/* 촬영 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>camera(props)}>
        <Image style={styles.btn_st} source={require('../image/camera.png')}/>
      </TouchableOpacity>

      {/* 갤러리 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>gallery(props)}>
        <Image style={styles.btn_st} source={require('../image/gallery.png')}/>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

// 디자인 레이아웃
const styles = StyleSheet.create({
  // 전체적인 레이아웃
  container:{
    flex:1,
    backgroundColor:'#81C147',
    alignItems:'center',
  },
  // 헤더 레이아웃
  header:{
    height:'6%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  // 헤더 텍스트 디자인
  header_txt:{
    color:'white',
    fontSize:30,
    fontFamily:'Jua-Regular',
  },
  // 예시 이미지 레이아웃
  photo_st:{
    height:'50%',
    width:'100%',
    marginVertical:'2%',
    resizeMode:'contain',
  },
  // 설명 텍스트 레이아웃
  description_txt:{
    height:'30%',
    width:'90%',
    color:'black', 
    fontSize:21,
    fontWeight:'bold', 
    fontFamily:'NanumSquareEB',
    borderWidth:2,
    borderRadius:8,
    backgroundColor:'#BDECB6',
  },
  // 버튼 컨테이너 레이아웃
  btn_container:{
    height:'30%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
    marginTop:'-15%',
    flexDirection:'row',
  },
  // 버튼 레이아웃
  opacity_st:{
    height:'25%',
    width:'45%',
    margin:'2%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center',
  },
  // 버튼 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    margin:'2%',
  },
})