import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

export default function Main(props){
  const {navigation} = props;
  return(
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.logo_container}>
      <Image style={styles.logo_st} source={require('../image/wip_logo.png')}/>
    </SafeAreaView>
    <SafeAreaView style={styles.menu_container}>
      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Search_Pill')}>
        <Text style={styles.txt_st}>알약검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Text style={styles.txt_st}>주변 약국 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Manage_Pill')}>
        <Text style={styles.txt_st}>알약 관리</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#B4E5AF',
  },
  logo_container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  menu_container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom:50,
  },
  btn_st:{
    height:'20%',
    width:'70%',
    backgroundColor:'#FDF5E6',
    margin:'3.5%',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  txt_st:{
    color:'black',
    fontSize:35,
    fontFamily:'Jua-Regular'
  },
  logo_st:{
    height:'95%',
    width:'80%',
    borderRadius:60,
    marginTop:'10%'
  }
});