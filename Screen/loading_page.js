import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, Text, StyleSheet, ToastAndroid, Image} from 'react-native'

// 메인 서버로의 데이터 전송
async function Send_img(props){
  ToastAndroid.showWithGravity('검색중..',ToastAndroid.SHORT,ToastAndroid.CENTER)

  try{
    const {navigation} = props
    const post_data = {'img_base64' : img_base64}

    // 메인 서버로 REST를 통해 POST로 전송 및 전송 성공 여부 확인
    let response = await fetch('http://54.180.97.234:8080/image',{
      method:'POST',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify(post_data)})

    const p_datadummy = await response.json()
    if (p_datadummy[0].status=='good'){
      ToastAndroid.showWithGravity('검색완료',ToastAndroid.SHORT,ToastAndroid.CENTER)
      p_data = p_datadummy[0].resBody.map(item => (item))
      navigation.navigate('Pill_Information')
    }
    else if (p_datadummy[0].status=='bad'){
      ToastAndroid.showWithGravity(`${p_datadummy[0].message}`,ToastAndroid.SHORT,ToastAndroid.CENTER)
      navigation.navigate('Pill_Information')
    }
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