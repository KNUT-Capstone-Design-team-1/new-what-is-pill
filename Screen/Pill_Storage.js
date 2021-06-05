import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import CheckBox from '@react-native-community/checkbox'
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList, Image} from 'react-native'
import DataBase, {get_all_pills, get_sepcific_pills} from './Database'
global.ref_name = ''

async function Look_Pill_Info(props){
  const {navigation} = props
  pill_managing_sw=1
  const ref_info_tmp = await get_sepcific_pills(ref_name)
  p_data=ref_info_tmp.map(item => (item))
  navigation.navigate('Pill_Information')
}

export default function Pill_Storage(props){
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
      <Text style={styles.header_txt}>알약 보관함</Text>
    </SafeAreaView>

    <FlatList data={stored_pill_name} renderItem={render_list}/>

    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Image style={styles.btn_st} source={require('../image/nearby_pharmacy_long.png')}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Main')}>
      <Image style={styles.btn_st} source={require('../image/main_long.png')}/>
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
    height:'6%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  header_txt:{
    color:'white',
    fontSize:30,
    fontFamily:'Jua-Regular', 
  },
  List_container:{
    flex:1,
    margin:'3%',
    backgroundColor:'#BDECB6',
    borderRadius:8,
  },
  List_st:{
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  opacity_st:{
    height:'7%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  txt_st:{
    color:'black',
    fontSize:30,
    fontFamily:'Jua-Regular', 
  },
})