import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function Pharmacy_info(props){
  const {navigation} = props;

  return(
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.txt_st}>약국 정보</Text>
      </SafeAreaView>

      <WebView style={{height:'100%', width:'100%',}} source={{uri:pharm_url}} useWebkit={true}/>

      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Text style={styles.txt_st}>약국 목록</Text>
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
    alignItems:'center'
  },
  btn_st:{
    height:'7%',
    width:'100%',
    backgroundColor:'#DFD880',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
  },
  txt_st:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular', 
  },
})