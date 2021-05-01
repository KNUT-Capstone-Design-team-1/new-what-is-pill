import React, {Component, useEffect} from 'react';
import type {Node} from 'react';
import { SafeAreaView, View, TouchableOpacity, Text,alert, StyleSheet} from 'react-native';

export default class App extends React.Component{
  render(){
    return(
    <SafeAreaView style={styles.container}>
    <Text style={styles.text_st}>Hello</Text>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"black"
  },
  text_st:{
    color:"red",
    fontSize:40,
  }
});