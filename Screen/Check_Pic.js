import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as Search_Pill from './Search_Pill'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, ToastAndroid} from 'react-native'

export default function Check_Pic(props){
  const {navigation} = props
  
  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>사진 확인</Text>
    </SafeAreaView>

    <Image style={styles.photo_st} source={{uri:img_uri}}/>

    <TouchableOpacity style={styles.btn_layer_1} onPress={()=>{navigation.navigate('Loading_Page'), pill_managing_sw=0}}>
      <Image style={styles.btn_st} source={require('../image/search.png')}/>
    </TouchableOpacity>

    <SafeAreaView style={styles.btn_layer_2}>
      <TouchableOpacity style={styles.opacity_st} onPress={()=>Search_Pill.camera(props)}>
        <Image style={styles.btn_st} source={require('../image/recamera.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.opacity_st} onPress={()=>Search_Pill.gallery(props)}>
        <Image style={styles.btn_st} source={require('../image/gallery.png')}/>
      </TouchableOpacity>
    </SafeAreaView>

    <TouchableOpacity style={styles.btn_layer_3} onPress={()=>navigation.navigate('Main')}>
      <Image style={styles.btn_st} source={require('../image/main.png')}/>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#81C147',
  },
  header:{
    height:'7%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  photo_st:{
    height:'61%',
    width:'100%',
    resizeMode:'contain',
  },
  btn_layer_1:{
    height:'14%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
  },
  btn_layer_2:{
    height:'10%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row',
  },
  btn_layer_3:{
    height:'9%',
    width:'100%',
    justifyContent:'center', 
    alignItems:'center',
  },
  opacity_st:{
    height:'100%',
    width:'48%',
    marginLeft:'3%',
    justifyContent: 'center',
    alignItems:'center',
  },
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  txt_st:{
    color:'white',
    fontSize:30,
    fontFamily:'Jua-Regular',
  },
})