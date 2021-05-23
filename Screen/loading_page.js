import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView, Text, StyleSheet, ToastAndroid, Image} from 'react-native'

export async function receive_message(){
    try{
       // rest 통신 대기 
    }catch(e){ToastAndroid.showWithGravity(`에러코드 : ${e}`,ToastAndroid.LONG,ToastAndroid.CENTER)}
}

export default function loading_page(props){
    return(
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.photo_st} source={require('../image/loading_screen.png')}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    photo_st:{
        height:'100%',
        width:'100%',
        resizeMode:'contain',
        flex:1,
    },
});