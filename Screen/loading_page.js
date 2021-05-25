import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, Text, StyleSheet, ToastAndroid, Image} from 'react-native'

// 인공지능 서버로의 데이터 전송
async function Send_img(props){
  ToastAndroid.showWithGravity('검색중..',ToastAndroid.SHORT,ToastAndroid.CENTER)

  try{
    const {navigation} = props
    const post_data = {'img_base64' : img_base64}

    // 메인 서버로 REST를 통해 POST로 전송 및 전송 성공 여부 확인
    let response = await fetch('http://3.37.82.154:8080/image',{
      method: 'POST',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify(post_data)})

    let resp = await response.json()
    console.log('response : ',resp)
    p_data.p_usage=resp.dosage

    navigation.navigate('Pill_Information')
  }catch(e){
    const {navigation} = props
    ToastAndroid.showWithGravity(`에러코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.CENTER)
    navigation.navigate('Check_Pic')
    console.log(e)
  }
}

export default function loading_page(props){
  const {navigation} = props
  Send_img(props)
  return(
    <SafeAreaView style={{flex:1,}}>
        <Image style={styles.photo_st} source={require('../image/loading_screen.png')}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  photo_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
    backgroundColor:'white',
  },
})