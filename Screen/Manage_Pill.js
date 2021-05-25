import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList} from 'react-native'

// 저장중인 알약 정보 삭제
export function Delete_pill(props){
  ToastAndroid.showWithGravity('삭제중..',ToastAndroid.LONG,ToastAndroid.CENTER)
}

export default function Manage_Pill(props){
  state={
    pills:[
      {key:'0', data:'각성제'},
      {key:'0', data:'각성제'},
      {key:'0', data:'각성제'},
      {key:'0', data:'각성제'},
      {key:'0', data:'각성제'},
    ],
  }

  const {navigation} = props;
  const render_list = ({item}) => (
  <SafeAreaView style={styles.List_container}>
    <TouchableOpacity style={styles.List_st} onPress={()=>alert(`${item.data} 입니다`)}>
      <Text style={styles.txt_st}>{item.key}: {item.data}</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )

  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>알약 관리</Text>
    </SafeAreaView>

    <FlatList data={state.pills} renderItem={render_list}/>

    <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Text style={styles.txt_st}>주변 약국 검색</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn_st} onPress={()=>Delete_pill(props)}>
      <Text style={styles.txt_st}>삭제</Text>
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
  List_container:{
    flex:1,
    margin:'1.5%',
  },
  List_st:{
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:8,
  },
  btn_st:{
    height:'7%',
    width:'100%',
    backgroundColor:'#DFD880',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'1%',
    borderRadius: 5,
  },
  txt_st:{
    color:'black',
    fontSize:30,
    fontFamily:'Jua-Regular', 
  },
})