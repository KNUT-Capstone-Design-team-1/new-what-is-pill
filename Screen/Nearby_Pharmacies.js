import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native'
global.pharm_url=''

export default function Nearby_Pharmacies(props){
  const {navigation} = props;
  const render_list = ({item}) => (
    <SafeAreaView style={{flex:1, margin:'1.5%'}}>

      <TouchableOpacity style={styles.List_st} onPress={()=>{
        pharm_url=item.url
        navigation.navigate('Pharmacy_info')}}>
        <Text style={styles.txt_st}>{item.name}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )

  return(
    <SafeAreaView style={{flex:1}}>

      <SafeAreaView style={styles.header}>
        <Text style={styles.txt_st}>주변 약국 찾기</Text>
      </SafeAreaView>

      <FlatList style={styles.FlatList_st} data={place} renderItem={render_list}/>

      <SafeAreaView style={styles.btn_container}>

        <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Main')}>
          <Text style={styles.txt_st}>메인화면</Text>
        </TouchableOpacity>

      </SafeAreaView>

    </SafeAreaView>
  )
  }
  
const styles = StyleSheet.create({
  header:{
    flex:0.07,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center',
  },
  List_st:{
    height:'100%',
    width:'100%',
    borderWidth:1,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  FlatList_st:{
    width:'100%', 
    height:'5%',
  },
  btn_container:{
    flex:0.2,
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
  btn_st:{
    height:'40%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#83FFB3',
    borderRadius: 5,
  },
});