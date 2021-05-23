import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function Pharmacy_info(props){
  const {navigation} = props;

  return(
    <SafeAreaView style={{flex:1}}>

      <SafeAreaView style={styles.header}>
        <Text style={styles.txt_st}>약국 정보</Text>
      </SafeAreaView>

      <WebView style={{flex:1}} source={{uri:pharm_url}} useWebkit={true}/>

      <SafeAreaView style={styles.btn_container}>

        <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
          <Text style={styles.txt_st}>약국 목록</Text>
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
    alignItems:'center'
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