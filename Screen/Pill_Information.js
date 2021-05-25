import * as React from 'react'
import {useState, useReducer} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList, Image, ScrollView} from 'react-native'

class pill{}
pill.schema = {
  name: 'pill',
  properties:{
    p_image:'string',
    p_name:'string',
    p_effrot:'string',
    p_usage:'string',
    p_volume:'string',
    p_caution:'string',
    p_take:'string',
    p_maker:'string',
    p_add:'string',
  }
}

// 알약 정보 저장
function Save_pill(props){
  ToastAndroid.showWithGravity('저장중..',ToastAndroid.LONG,ToastAndroid.CENTER)
}

export default function Pill_Information(props){
  const {navigation} = props
  
  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>알약 정보</Text>
    </SafeAreaView>
    
    <Image style={styles.photo_st} source={{uri:p_data.p_image}}/>

    <ScrollView>
      <Text style={styles.item_txt_st}>
      {'\n '}이름 : {p_data.p_name}
      {"\n\n"} 효능 및 효과 {'\n'} : {p_data.p_effort}
      {"\n\n"} 용법 {'\n'} : {p_data.p_usage}
      {"\n\n"} 용량 {'\n'} : {p_data.p_volume}
      {"\n\n"} 주의사항 {'\n'} : {p_data.p_caution}
      {"\n\n"} 복용정보 {'\n'} : {p_data.p_take}
      {"\n\n"} 제조사 {'\n'} : {p_data.p_maker}
      {"\n\n"} 첨가제 {'\n'} : {p_data.p_add}
      </Text>
    </ScrollView>

    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Text style={styles.btn_txt}>주변 약국 찾기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn_st} onPress={()=>Save_pill(props)}>
        <Text style={styles.btn_txt}>저장</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Main')}>
        <Text style={styles.btn_txt}>메인화면</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    height:'30%',
    width:'100%',
    resizeMode:'contain',
  },
  btn_container:{
    height:'10%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  btn_st:{
    height:'90%',
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#DFD880',
    borderRadius: 5,
    marginHorizontal:'1%',
  },
  item_txt_st:{
    color:'black', 
    fontSize:20, 
    fontFamily:'NanumGothicBold',
    padding:'2%',
    borderWidth:2,
    borderRadius:8,
  },
  btn_txt:{
    color:'black', 
    fontSize:21, 
    fontFamily:'Jua-Regular', 
  },
  txt_st:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular', 
  },
})