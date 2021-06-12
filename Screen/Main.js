import * as React from 'react'

// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// 현재 위치 파악을 위한 라이브러리
import RNLocation from 'react-native-location'

// 화면 구성을 위한 컴포넌트
import { SafeAreaView, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

// 앱 내에서 사용되는 전역변수
global.img_uri = ''             // 화면에 표시되는 이미지의 주소
global.img_base64 = ''          // json에 첨부될 base64 
global.place=''                 // kakao map API에서 받아오는 약국 정보
global.p_data=''                // 알약에 대한 데이터
global.pill_managing_sw=0       // Pill Storage에서 저장 버튼과 삭제 버튼을 전환하는 스위치


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
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props
  
  // 카카오 맵 API 호출을 수행하는 함수 호출
  get_pharm_list()

  return(
  <SafeAreaView style={styles.container}>
    {/* 로고 이미지 */}
    <Image style={styles.logo_st} source={require('../image/wip_main_logo.png')}/>

    {/* 알약 검색 버튼 */}
    <TouchableOpacity style={styles.opacity_st} onPress={()=>{
      navigation.navigate('Search_Pill')
      pill_managing_sw=0
      img_uri='https://user-images.githubusercontent.com/33280934/119253999-db40ce00-bbee-11eb-8757-1be2fc2702cb.jpg'}}>
      <Image style={styles.btn_st} source={require('../image/pill_search.png')}/>
    </TouchableOpacity>

    {/* 내 주변 약국 버튼 */}
    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Image style={styles.btn_st} source={require('../image/nearby_pharmacy.png')}/>
    </TouchableOpacity>

    {/* 알약 보관함 버튼 */}
    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Pill_Storage')}>
      <Image style={styles.btn_st} source={require('../image/pill_storage.png')}/>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

// 스타일 선언
const styles = StyleSheet.create({
  // 전체적인 뷰의 레이아웃
  container:{
    flex:1,
    backgroundColor:'#81C147',
    justifyContent:'center',
    alignItems:'center',
  },
  // 로고 이미지 레이아웃
  logo_st:{
    height:'30%',
    width:'100%',
    marginTop:'-15%',
    resizeMode:'contain',
  },
  // 버튼 디자인 레이아웃
  opacity_st:{
    height:'20%',
    width:'92%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'2%',
  },
  // 버튼 내 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    margin:'2%',
  },
})