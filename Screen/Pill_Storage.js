import * as React from 'react'
// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// Realm 데이터베이스에 저장하기 위한 DB파일 모듈
import DataBase, {get_all_pills, get_sepcific_pills} from './Database'

// 전체 화면을 구성하는 컴포넌트
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, ToastAndroid, FlatList, Image} from 'react-native'

// 선택한 알약의 이름
global.ref_name = ''

// 선택한 알약의 정보 출력
async function Look_Pill_Info(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props

  // 알약 삭제 기능 활성화를 위한 스위치 
  pill_managing_sw=1

  // DBMS로 부터 선택한 알약에 대한 정보 로드
  const ref_info_tmp = await get_sepcific_pills(ref_name)

  // 전역 변수인 알약 정보에 DB로 부터 받은 특정한 알약의 데이터를 Mapping
  p_data=ref_info_tmp.map(item => (item))

  // 알약 정보화면으로 이동
  navigation.navigate('Pill_Information')
}


export default function Pill_Storage(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props
  // 저장된 알약의 데이터 Loading
  const stored_pill_list = get_all_pills()
  // 알약의 데이터 중 이름만 추출하여 Mapping
  const stored_pill_name = stored_pill_list.map((tmp) => ({'name' : tmp.name}))

  // 저장된 알약의 목록을 표시하기 위한 Flat List 렌더링
  const render_list = ({item}) => (
  <SafeAreaView style={styles.List_container}>
    {/* 알약의 이름을 버튼 리스트로 표시 */}
    <TouchableOpacity style={styles.List_st} onPress={()=>{ ref_name=item.name, Look_Pill_Info(props)}}>
      <Text style={styles.txt_st}>{item.name}</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )

  return(
  <SafeAreaView style={styles.container}>
    {/* 헤더 */}
    <SafeAreaView style={styles.header}>
      <Text style={styles.header_txt}>알약 보관함</Text>
    </SafeAreaView>

    {/* 저장된 알약 목록을 표시하기 위한 Flat List */}
    <FlatList data={stored_pill_name} renderItem={render_list}/>

    {/* 내 주변 약국 화면 이동 버튼 */}
    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Nearby_Pharmacies')}>
      <Image style={styles.btn_st} source={require('../image/nearby_pharmacy_long.png')}/>
    </TouchableOpacity>

    {/* 메인 화면 이동 버튼 */}
    <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Main')}>
      <Image style={styles.btn_st} source={require('../image/main_long.png')}/>
    </TouchableOpacity>
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
    height:'6%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  // 헤더 텍스트 레이아웃
  header_txt:{
    color:'white',
    fontSize:30,
    fontFamily:'Jua-Regular', 
  },
  // 저장된 알약 이름을 보여주는 리스트의 레이아웃
  List_container:{
    flex:1,
    margin:'3%',
    backgroundColor:'#BDECB6',
    borderRadius:8,
  },
  // 알약 이름이 출력되는 Flat list의 버튼 레이아웃
  List_st:{
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  // 내 주변 약국 및 메인 화면 이동 버튼 레이아웃
  opacity_st:{
    height:'7%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  // 버튼 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  // 텍스트 레이아웃
  txt_st:{
    color:'black',
    fontSize:30,
    fontFamily:'Jua-Regular', 
  },
})