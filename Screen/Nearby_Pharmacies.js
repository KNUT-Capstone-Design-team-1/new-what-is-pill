import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, FlatList, Image} from 'react-native'
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
        <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Main')}>
          <Image style={styles.btn_st} source={require('../image/home.png')}/>
        </TouchableOpacity>
        <Text style={styles.txt_st}>주변 약국 찾기</Text>
      </SafeAreaView>

      <FlatList data={place} renderItem={render_list}/>
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
  header_txt:{
    backgroundColor:'black',
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