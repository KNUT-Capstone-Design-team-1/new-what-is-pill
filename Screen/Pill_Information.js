import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList, Image, ScrollView} from 'react-native'
import DataBase, {get_all_pills, add_pill, delete_pill, delete_all} from './Database'

// 알약 정보 저장
function Save_pill(props){
  add_pill(
    p_data[0].image, p_data[0].name, p_data[0].effect, p_data[0].dosage,
    p_data[0].caution, p_data[0].take, p_data[0].maker,
  )
  ToastAndroid.showWithGravity('저장완료', ToastAndroid.LONG, ToastAndroid.CENTER)
  const aa = get_all_pills()
}

// 알약 정보 삭제
function Delete_pill(props){
  const {navigation} = props
  delete_pill(p_data[0].name)
  ToastAndroid.showWithGravity('삭제완료', ToastAndroid.SHORT, ToastAndroid.CENTER)
  navigation.replace('Manage_Pill')
}

// 알약 정보 데이터 베이스 초기화
function flush_DB(props){ delete_all() }

export default function Pill_Information(props){
  const {navigation} = props

  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>알약 정보</Text>
    </SafeAreaView>
    
    <Image style={styles.photo_st} source={{uri:p_data[0].image}}/>

    <ScrollView>
      <Text style={styles.item_txt_st}>
        {'\n '}이름 : {p_data[0].name}
        {"\n\n"} 효능 및 효과 {'\n'} : {p_data[0].effect}
        {"\n\n"} 용법 및 용량 {'\n'} : {p_data[0].dosage}
        {"\n\n"} 주의사항 {'\n'} : {p_data[0].caution}
        {"\n\n"} 복약정보 {'\n'} : {p_data[0].take}
        {"\n\n"} 제조사 {'\n'} : {p_data[0].maker}
      </Text>
    </ScrollView>

    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Text style={styles.btn_txt}>주변 약국 찾기</Text>
      </TouchableOpacity>

      {
        pill_managing_sw===0
        ? (<TouchableOpacity style={styles.btn_st} onPress={()=>Save_pill(props)}>
            <Text style={styles.btn_txt}>저장</Text>
           </TouchableOpacity>)
        : (<TouchableOpacity style={styles.btn_st} onPress={()=>Delete_pill(props)}>
            <Text style={styles.btn_txt}>삭제</Text>
           </TouchableOpacity>)
      }

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