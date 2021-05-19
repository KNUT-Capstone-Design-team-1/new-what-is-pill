import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList} from 'react-native'

export function Delete_pill(props){
  ToastAndroid.showWithGravity('삭제중..',ToastAndroid.LONG,ToastAndroid.CENTER)
}

export default function Manage_Pill(props){
  state={
    pills:[
      {key:'0', data:'각성제'},
      {key:'1', data:'페놀타인 정'},
      {key:'2', data:'타이레놀 정'},
      {key:'3', data:'크레아틴 정'},
      {key:'4', data:'루테인 정'},
      {key:'5', data:'비타민 정'},
      {key:'6', data:'칼슘 정'},
      {key:'7', data:'ZMA 정'},
      {key:'8', data:'아연 정'},
      {key:'9', data:'나트륨 정'},
      {key:'10', data:'우환청심환 정'},
      {key:'12', data:'아인슈타인 정'},
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
  <SafeAreaView style={{flex:1}}>
    <SafeAreaView style={styles.header}>
      <Text style={{color:'black', fontSize:30, fontFamily:'Jua-Regular'}}>알약 관리</Text>
    </SafeAreaView>
    <FlatList style={{width:'100%', height:'5%'}} data={state.pills} renderItem={render_list}/>
    <SafeAreaView style={styles.btn_container}>
      <TouchableOpacity style={styles.btn_st1} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Text style={styles.txt_st}>주변 약국 검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st1} onPress={()=>Delete_pill(props)}>
        <Text style={styles.txt_st}>삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st2} onPress={()=>navigation.navigate('Main')}>
        <Text style={styles.txt_st}>메인화면</Text>
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
  List_container:{
    flex:1,
    margin:'1.5%',
  },
  btn_container:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center',
    marginRight:'2%',
    marginLeft:'2%', 
  },
  txt_st:{
    color:'black', 
    fontSize:27, 
    fontFamily:'Jua-Regular', 
  },
  List_st:{
    height:'100%',
    width:'100%',
    borderWidth:1,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  },
  btn_st1:{
    height:'30%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
    marginTop:'2%'
  },
  btn_st2:{
    height:'30%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
    marginTop:'2%',
    marginBottom:'5%'
  },
});