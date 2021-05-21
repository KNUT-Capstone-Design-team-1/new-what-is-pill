import * as React from 'react'
import {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import RNLocation from 'react-native-location'
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
global.place=''

// 주변 약국 정보를 수집하기 위한 위치정보 최신화 및 카카오맵 API 호출
async function get_pharm_list(){

  // 위치 정보 최신화
  RNLocation.subscribeToLocationUpdates()

  // 마지막 위치정보 좌표를 카카오맵 API로 전송
  RNLocation.getLatestLocation({ timeout: 60000 }).then(async latestLocation => {
    try{
      // latestLocation.longitude   latestLocation.latitude
      let response = await fetch('https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=PM9&radius=20000&x='+latestLocation.longitude+'&y='+latestLocation.latitude+'&input_coord=WGS84',{
        headers:{Authorization : 'KakaoAK 33a8b02db1a0de6d37b4d7de43955e46'},})

      // 카카오맵으로 부터 응답받은 데이터를 json으로 파싱
      const result_tmp = await response.json()

      // 약국의 이름과 정보 url만 추출하여 리스트에 저장
      const result = result_tmp.documents.map(res => ({'name': res.place_name, 'url': res.place_url}));
      place = result;
    }catch(e){ console.log(e) }
  })
}

export default function Main(props){
  const {navigation} = props
  get_pharm_list()

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
    fontFamily:'Jua-Regular',
  },
  logo_st:{
    height:'95%',
    width:'80%',
    borderRadius:60,
    marginTop:'10%',
  },
});