import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native'
global.pharm_url=''

export default function Nearby_Pharmacies(props){
  const {navigation} = props;
  const render_list = ({item}) => (
    <SafeAreaView style={styles.flat_st}>
      <TouchableOpacity style={styles.list_st} onPress={()=>{
      pharm_url=item.url, navigation.navigate('Pharmacy_info')}}>
      <Text style={styles.txt_st}>{item.name}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

  return(
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.txt_st}>주변 약국 찾기</Text>
      </SafeAreaView>

      <FlatList data={place} renderItem={render_list}/>

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
  flat_st:{
    flex:1,
    margin:'1%',
  },
  list_st:{
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
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#DFD880',
    borderRadius: 5,
  },
  txt_st:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular', 
  },
})