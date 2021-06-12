import * as React from 'react'
// 화면 이동을 위한 라이브러리
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// 화면을 구성하는 컴포넌트
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, FlatList, Image} from 'react-native'

// 선택한 약국의 정보가 적힌 kakao map 주소
global.pharm_url=''


export default function Nearby_Pharmacies(props){
  // 화면 이동을 위한 네비게이션 선언
  const {navigation} = props;

  // kakao map api으로 부터 받아온 약국 이름을 표시하기 위한 Flat List 렌더링 <스크롤>
  const render_list = ({item}) => (

    // Flat List에 item으로 부터 받아온 정보를 버튼으로 생성
    <SafeAreaView style={styles.flat_st}>
      <TouchableOpacity style={styles.list_st} onPress={()=>{
      pharm_url=item.url, navigation.navigate('Pharmacy_Info')}}>
      <Text style={styles.pharm_name}>{item.name}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )

  return(
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <SafeAreaView style={styles.header}>
        {/* 메인 화면 이동 버튼 */}
        <TouchableOpacity style={styles.opacity_st} onPress={()=>navigation.navigate('Main')}>
          <Image style={styles.btn_st} source={require('../image/home.png')}/>
        </TouchableOpacity>

        <Text style={styles.txt_st}>내 주변 약국</Text>
      </SafeAreaView>

      {/* 약국 목록을 표시하기 위한 Flat List */}
      <FlatList data={place} renderItem={render_list}/>
    </SafeAreaView>
  )
}
  
// 디자인 레이아웃
const styles = StyleSheet.create({
  // 전체 화면 레이아웃
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
    flexDirection:'row',
  },
  // 헤더 텍스트 레이아웃
  header_txt:{
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center',
  },
  // Flat List 레이아웃
  flat_st:{
    flex:1,
    margin:'4%',
    backgroundColor:'#BDECB6',
    borderRadius:8,
  },
  // Flat List에 생성되는 버튼 디자인
  list_st:{
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  // 약국 이름 목록 텍스트 레이아웃
  pharm_name:{
    color:'black', 
    fontSize:30, 
    fontFamily:'Jua-Regular',
  },
  // 메인 화면 이동 버튼 레이아웃
  opacity_st:{
    height:'100%',
    width:'15%',
    position:'absolute',
    top:0,
    left:0,
  },
  // 메인 화면 이동 버튼 이미지 레이아웃
  btn_st:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
  },
  // 전체적인 텍스트 레이아웃
  txt_st:{
    color:'white', 
    fontSize:30, 
    fontFamily:'Jua-Regular',
  },
})