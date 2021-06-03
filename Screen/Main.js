import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import RNLocation from 'react-native-location'
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
global.img_uri = ''
global.img_base64 = ''
global.place=''
global.p_data=''
global.pill_managing_sw=0

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
      place = result_tmp.documents.map(res => ({'name': res.place_name, 'url': res.place_url}))
    }catch(e){ console.log(e) }
  })
}

export default function Main(props){
  const {navigation} = props
  get_pharm_list()

  return(
  <SafeAreaView style={styles.container}>
    <Image style={styles.logo_st} source={require('../image/wip_main_logo.png')}/>

    <TouchableOpacity style={styles.opacity_st} onPress={()=>{
      navigation.navigate('Search_Pill')
      pill_managing_sw=0
      img_uri='https://user-images.githubusercontent.com/33280934/119253999-db40ce00-bbee-11eb-8757-1be2fc2702cb.jpg'}}>
      <Image style={styles.btn_st} source={require('../image/pill_search.png')}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Image style={styles.btn_st} source={require('../image/nearby_pharmacy.png')}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Manage_Pill')}>
      <Image style={styles.btn_st} source={require('../image/pill_manage.png')}/>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#81C147',
    justifyContent:'center',
    alignItems:'center',
  },
  logo_st:{
    height:'30%',
    width:'100%',
    marginTop:'-15%',
    resizeMode:'contain',
  },
  opacity_st:{
    height:'20%',
    width:'92%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'2%',
  },
  btn_st:{
    height:'100%',
    width:'100%',
    margin:'2%',
  },
})