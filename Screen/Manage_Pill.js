import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import CheckBox from '@react-native-community/checkbox'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList} from 'react-native'
import DataBase, {get_all_pills, get_sepcific_pills} from './Database'
global.ref_name = ''

async function Look_Pill_Info(props){
  const {navigation} = props
  pill_managing_sw=1
  const ref_info_tmp = await get_sepcific_pills(ref_name)
  p_data=ref_info_tmp.map(item => (item))
  navigation.navigate('Pill_Information')
}

export default function Manage_Pill(props){
  const {navigation} = props
  const stored_pill_list = get_all_pills()
  const stored_pill_name = stored_pill_list.map((tmp) => ({'name' : tmp.name}))

  const render_list = ({item}) => (
  <SafeAreaView style={styles.List_container}>
    <TouchableOpacity style={styles.List_st} onPress={()=>{ ref_name=item.name, Look_Pill_Info(props)}}>
      <Text style={styles.txt_st}>{item.name}</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )

  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>알약 관리</Text>
    </SafeAreaView>

    <FlatList data={stored_pill_name} renderItem={render_list}/>

    <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Text style={styles.txt_st}>주변 약국 검색</Text>
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