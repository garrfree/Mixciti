import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";


import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MyHeader from "./Component/MyHeader"
import Login from "./Component/Login"
import MyFooter from "./Component/MyFooter"

import {Ionicons} from '@expo/vector-icons'




export default function ChatMenu() {
    return ( 
        
    <View style={styles.container}>
 <Text> a</Text>
      {/* {<View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
        <MyHeader />
      </View>}


      <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: '10%', height: "10%" }} >
        <TextInput style={{ borderRadius: 5, backgroundColor: "#e6e6e6", height: 40, width: 350 }} type="Text" placeholder="Search" ></TextInput>
      </View>


      <View style={{ marginLeft: '4%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
        <View style={{ flex: 1, flexDirection: 'row', }} >

        <Ionicons name = "md-add-circle" size = {80} color = "gray" style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />

            
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', }} >
          <Image source={require('./Img/BanerImg.jpg')}
            style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />

          <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', }} >
          <Image source={require('./Img/BanerImg.jpg')}
            style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
            <View style={styles.cont}></View>
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', }} >
          <Image source={require('./Img/BanerImg.jpg')}
            style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
            <View style={styles.cont}></View>
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
        </View>

      </View>
      

      <View style={{ marginTop: '10%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
        <Image source={require('./Img/BanerImg.jpg')}
          style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
          <View style={styles.cont2}></View>
          
        <View style={{ flex: 4, flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }} >
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
         
            <Text style={{ fontSize: 22, fontWeight: '300' }} > My Friend In chat</Text>
            <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >17:11</Text>
          </View>
        </View>
      </View>
            <View style={{ marginTop: '10%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
        <Image source={require('./Img/BanerImg.jpg')}
          style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
        
        <View style={{ flex: 4, flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }} >
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
            <Text style={{ fontSize: 22, fontWeight: '300' }} > My Friend In chat</Text>
            <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >17:11</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: '10%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
        <Image source={require('./Img/BanerImg.jpg')}
          style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
         <View style={styles.cont2}></View>
        <View style={{ flex: 4, flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }} >
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
            <Text style={{ fontSize: 22, fontWeight: '300' }} > My Friend In chat</Text>
            <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >17:11</Text>
          </View>
        </View>
      </View>
  
      <MyFooter/> */}
     
    </View> 

    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  
    Logo: {
      flex: 1,
      backgroundColor: '#fff',
      width: "100%",
      height: "15%"
  
    },
  
    IconText: {
      fontSize: 17,
      fontWeight: '300',
      alignItems: 'center',
    },
  
    Icons: {
      width: "50%",
      height: "25%"
    },
    cont: {
      width: "1%",
      height: "2%",
      backgroundColor:"rgba(32, 193, 11, 0.96)",
      borderRadius:100,
      flex: 1, 
      position: 'absolute',
      marginTop: '55%',
      marginLeft: '55%'
    },
    cont2: {
      width: 10,
      height: 8,
      backgroundColor:"rgba(32, 193, 11, 0.96)",
      borderRadius:100,
      position: 'absolute',
      marginTop: '5%',
      marginLeft: 65,
      flexDirection:"row",
      paddingLeft:30,
      alignItems:"flex-end"
  
  
    },
  
   
  });