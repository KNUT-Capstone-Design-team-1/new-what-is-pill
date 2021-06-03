import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {WebView} from 'react-native-webview'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'

export default function Pharmacy_info(props){
  const {navigation} = props;

  return(
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
          <Image style={styles.btn_st} source={require('../image/back.png')}/>
        </TouchableOpacity>
        <Text style={styles.txt_st}>약국 정보</Text>
      </SafeAreaView>

      <WebView style={{height:'100%', width:'100%',}} source={{uri:pharm_url}} useWebkit={true}/>
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
    flexDirection:'row',
  },
  opacity_st:{
    height:'100%',
    width:'15%',
    position:'absolute',
    top:0,
    left:0,
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