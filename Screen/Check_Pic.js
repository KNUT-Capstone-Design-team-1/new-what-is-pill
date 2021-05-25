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

    <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('loading_page')}>
      <Text style={styles.txt_st}>검색</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn_st} onPress={()=>Search_Pill.camera(props)}>
      <Text style={styles.txt_st}>재촬영</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn_st} onPress={()=>Search_Pill.gallery(props)}>
      <Text style={styles.txt_st}>갤러리</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Main')}>
      <Text style={styles.txt_st}>메인화면</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FDF5E6',
  },
  header:{
    height:'6%',
    width:'100%',
    backgroundColor:'#DFD880',
    justifyContent:'center',
    alignItems:'center',
  },
  photo_st:{
    height:'65%',
    width:'100%',
    resizeMode:'contain',
  },
  txt_st:{
    color:'black',
    fontSize:30,
    fontFamily:'Jua-Regular',
  },
  btn_st:{
    height:'6%',
    width:'100%',
    backgroundColor:'#DFD880',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'1%',
    borderRadius: 5,
  },
})