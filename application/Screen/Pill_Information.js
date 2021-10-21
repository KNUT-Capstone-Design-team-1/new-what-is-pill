import * as React from 'react'
// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// 알약 정보 저장 및 삭제를 위한 DB 모듈
import DataBase, {get_all_pills, add_pill, delete_pill, delete_all, get_sepcific_pills} from './Database'

// 화면 구성을 위한 컴포넌트
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList, Image, ScrollView} from 'react-native'


// 알약 정보 저장
function Save_pill(props){
  // DB로 부터 특정한 알약 정보 추출
  const In_DB = get_sepcific_pills(p_data[0].name)

  // 저장하기로 한 알약이 DB에 존재하지 않는 경우
  if (In_DB.toString() == ""){
    // DB에 알약 정보 저장
    add_pill(
    p_data[0].image, p_data[0].name, p_data[0].effect, p_data[0].dosage,
    p_data[0].caution, p_data[0].take, p_data[0].maker,
    )
    // 메시지 출력
    ToastAndroid.showWithGravity('저장완료', ToastAndroid.LONG, ToastAndroid.CENTER)
  }
  // 저장할 알약이 DB에 존재하는 경우
  else {
    ToastAndroid.showWithGravity('중복저장', ToastAndroid.LONG, ToastAndroid.CENTER)
  }
}

// 알약 정보 삭제
function Delete_pill(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props

  // 데이터베이스 알약 삭제 함수 호출
  delete_pill(p_data[0].name)
  ToastAndroid.showWithGravity('삭제완료', ToastAndroid.SHORT, ToastAndroid.CENTER)
  // 뒤로가기
  navigation.replace('Pill_Storage')
}

// 알약 정보 데이터 베이스 초기화
function flush_DB(props){ delete_all() }


export default function Pill_Information(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props

  return(
  <SafeAreaView style={styles.container}>
    {/* 헤더 */}
    <SafeAreaView style={styles.header}>
      <Text style={styles.txt_st}>알약 정보</Text>
    </SafeAreaView>
    
    {/* 알약의 이미지 */}
    <Image style={styles.photo_st} source={{uri:p_data[0].image}}/>

    {/* 알약에 대한 정보 */}
    <ScrollView>
      <Text style={styles.item_txt_st}>
        {'\n '}이름 : {p_data[0].name}
        {"\n\n\n\n"} 효능 및 효과 {'\n'} : {p_data[0].effect}
        {"\n\n\n\n"} 용법 및 용량 {'\n'} : {p_data[0].dosage}
        {"\n\n\n\n"} 주의사항 {'\n'} : {p_data[0].caution}
        {"\n\n\n\n"} 복약정보 {'\n'} : {p_data[0].take}
        {"\n\n\n\n"} 제조사 {'\n'} : {p_data[0].maker}
      </Text>
    </ScrollView>

    {/* 버튼 컨테이너 */}
    <SafeAreaView style={styles.btn_container}>
      {/* 내 주변 약국 화면 이동 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
        <Image style={styles.btn_st} source={require('../image/nearby_pharmacy_mini.png')}/>
      </TouchableOpacity>

      {/* 데이터베이스 내 알약정보 저장 / 삭제 버튼 */}
      {
        pill_managing_sw===0
        // 저장버튼
        ? (<TouchableOpacity style={styles.opacity_st} onPress={()=>Save_pill(props)}>
            <Image style={styles.btn_st} source={require('../image/save.png')}/>
           </TouchableOpacity>)
        // 삭제버튼
        : (<TouchableOpacity style={styles.opacity_st} onPress={()=>Delete_pill(props)}>
            <Image style={styles.btn_st} source={require('../image/delete.png')}/>
           </TouchableOpacity>)
      }

      {/* 메인 화면 이동 버튼 */}
      <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Main')}>
        <Image style={styles.btn_st} source={require('../image/main_mini.png')}/>
      </TouchableOpacity>
    </SafeAreaView>
  </SafeAreaView>
  )
}

// 디자인
const styles = StyleSheet.create({
  // 전체적인 화면 레이아웃
  container:{
    flex:1,
    backgroundColor:'#81C147',
  },
  // 헤더 레이아웃
  header:{
    height:'5%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  // 알약 이미지 레이아웃
  photo_st:{
    height:'30%',
    width:'100%',
    resizeMode:'contain',
  },
  // 버튼 컨테이너 레이아웃
  btn_container:{
    height:'8%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  // 버튼 레이아웃
  opacity_st:{
    height:'100%',
    width:'33%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderRadius:8,
  },
  // 알약 정보 텍스트 레이아웃
  item_txt_st:{
    color:'black', 
    fontSize:20, 
    fontFamily:'NanumGothicBold',
    padding:'2%',
    backgroundColor:'#BDECB6',
  },
  // 버튼 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  // 텍스트 레이아웃
  txt_st:{
    color:'white', 
    fontSize:35, 
    fontFamily:'Jua-Regular', 
  },
})