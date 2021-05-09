import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'

export default class GuideLine extends React.Component{
  render(){
    const {navigation} = this.props;
    return(
    <SafeAreaView style={{flex:1}}>
      <SafeAreaView style={styles.header}>
        <Text style={{color:'black', fontSize:35, fontFamily:'Jua-Regular'}}>촬영 가이드 라인</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.image_container}>
        <Image style={{height:'120%', width:'100%', resizeMode:'contain'}} source={require('../image/example.jpg')}/>
      </SafeAreaView>
      <SafeAreaView style={styles.text_container}>
        <Text style={styles.first_txt}>
        1. 알약이 잘보이게 찍는다</Text>
        <Text style={styles.txt_st}>
        2. 글씨가 잘보이게 찍는다</Text>
        <Text style={styles.txt_st}>
        3. 색상이 잘보이게 찍는다</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.btn_container}>
        <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Check_Pic')}>
          <Text style={styles.btn_txt}>촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_st} onPress={()=>navigation.navigate('Check_Pic')}>
          <Text style={styles.btn_txt}>갤러리</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    flex:0.3,
    backgroundColor:'#83FFB3',
    justifyContent:'center',
    alignItems:'center'
  },
  image_container:{
    flex:1.7,
    justifyContent:'center',
    alignItems:'center',
    marginTop:"8%"
  },
  text_container:{
    flex:1,
    marginTop:'7%'
  },
  btn_container:{
    flex:0.8,
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row'
  },
  first_txt:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular', 
    marginTop:'5%', 
    marginLeft:'3%', 
    marginBottom:'3%'
  },
  txt_st:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular', 
    marginLeft:'3%', 
    marginBottom:'3%'
  },
  btn_st:{
    height: '30%',
    width: '45%',
    backgroundColor:'#83FFB3',
    margin: '3%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:"-15%"
  },
  btn_txt:{
    color:'black', 
    fontSize:25, 
    fontFamily:'Jua-Regular'
  },
});