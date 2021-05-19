import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as Search_Pill from './Search_Pill'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'

async function Send_img(props){
  ToastAndroid.showWithGravity('검색중..',ToastAndroid.LONG,ToastAndroid.CENTER)
  try{
    const {navigation} = props
    const post_data = {'img_base64' : img_base64}
    let response = await fetch('http://52.79.235.20:5000/data',{
      method: 'POST',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify(post_data)
    })
    let result = await response.text()
    ToastAndroid.showWithGravity(`${result}`,ToastAndroid.LONG,ToastAndroid.CENTER)
    if (result == 'Success'){
      navigation.navigate('Information_Pill')
    } else {
      ToastAndroid.showWithGravity('다시 시도해 주십시오',ToastAndroid.LONG,ToastAndroid.CENTER)
    }
  }catch(e){
    ToastAndroid.showWithGravity(`에러코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.CENTER)
  }
}

export default function Check_Pic(props){
  const {navigation} = props
  return(
  <SafeAreaView style={{flex:1}}>
    <SafeAreaView style={styles.header}>
      <Text style={{color:'black', fontSize:30, fontFamily:'Jua-Regular'}}>사진 확인</Text>
    </SafeAreaView>
    <SafeAreaView style={styles.photo_container}>
      <Image style={{height:'70%',width:'100%',resizeMode:'contain'}} source={{uri:img_uri}}/>
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