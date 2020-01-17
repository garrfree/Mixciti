import React from 'react';
import { Appbar } from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import { StyleSheet, Text, View, Image } from 'react-native';



export default function MyFooter() {
    return ( 
      <View style={{  backgroundColor: "#e6e6e6",marginTop: '5%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
      <Ionicons name = "md-text" size = {40} color = "gray" style = {{marginLeft:10,marginTop:10}}/>
      <Ionicons name = "md-people" size = {40} color = "gray" style = {{marginLeft:10,marginTop:10}}/> 
      <Ionicons name = "md-compass" size = {40} color = "gray" style = {{marginLeft:10,marginTop:10}}/>  
      </View>

    );
  }
