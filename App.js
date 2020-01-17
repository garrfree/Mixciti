import React from 'react';
import {TouchableOpacity, TouchableHighlight,StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
// import * as firebase from "firebase";




import { Avatar, Button, Card, Title, Paragraph,ScrollView } from 'react-native-paper';
import MyHeader from "./Component/MyHeader"
import Amera from "./Component/Camera"
import Cht from "./Component/Chat"
import Login from "./Component/Login"
import Pushnotification from "./Component/Pushnotification"
import Registration from './Component/Registration'

import MyFooter from "./Component/MyFooter"


import {Ionicons} from '@expo/vector-icons'
import Navigation from './Config/Navigation'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    image: null,
      hasCameraPermission: null,
      list: [],
      type: Camera.Constants.Type.back,
      modalVisible: false,
      hasCameraPermission: null,
      toggle:false,

    list: [],
    type: Camera.Constants.Type.back,
    modalVisible: false
    }
  }

  // async componentDidMount() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // }
  // async capture() {
  //   const photo = await this.camera.takePictureAsync();
  //   console.log('photo *********', photo);
  //   this.setState({photo: photo.uri})
  // }
  // cameraOn(togle){
  //   // alert(this.props.togle)
  //   console.log(togle)



  //   // this.rendercamera()
  // }


  render() {
    return (


      //Chat List
      <View style={styles.container}>
        <Navigation/>
        {/* <Pushnotification/> */}

        {/* <Amera/>  */}
        {/* <Cht/>       */}
        {/* <Login/> */}
       {/* <Registration/> */}


       {/* {<View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
    <MyHeader />
      </View>}
     <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: '10%', height: "10%" }} >
      <TextInput style={{ borderRadius: 5, backgroundColor: "#e6e6e6", height: 40, width: 350 }} type="Text" placeholder="Search" ></TextInput>
      </View>


      <View style={{ marginLeft: '4%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
        <View style={{ flex: 1, flexDirection: 'row', }} >
         <Image source={require('./Img/BanerImg.jpg')}
            style={{ width: 65, height: 65, marginLeft: '3%', borderRadius:65 / 2 }} />
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
        <View style={{ flex: 4, flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }} >
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
            <Text style={{ fontSize: 22, fontWeight: '300' }} > My Friend In chat</Text>
            <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >17:11</Text>
          </View>
        </View>
      </View> */}



      {/* <Text>HELLO</Text> */}
      {/* <Button onPress={this.gone.bind(this)}>open</Button> */}
     {/* {this.state.toggle && <Amera/>}  */}
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
            <MyHeader />
          </View> */}



      {/* <View style={{marginLeft: 20 ,marginTop: 25, justifyContent: "space-around", flexDirection: 'row' }} >
           <View style={{ justifyContent:"space-around",backgroundColor:"#d1d1d1",flex:4,flexDirection: 'column',  alignItems: 'flex-start',width:"100%", borderRadius: 100 / 8 }} >
           <Text style={{color: 'black',fontSize: 18, fontWeight: '100',flexWrap:'wrap' }} > My Friend In chatMy Friend In chatMy Friend In chatMy Friend In chatMy Friend In chat</Text>
         </View>

      <View style={{ flex:1,flexDirection: 'column',  alignItems: 'flex-start',height:150,width:"100%", borderRadius: 150 / 8 }} >
      </View>
      </View> */}


      {/* <View style={{ marginRight: 20 ,marginTop: 25,  flexDirection: 'row' }} >

         <View style={{ flex:1,flexDirection: 'column',  alignItems: 'flex-start',height:150,width:"100%", borderRadius: 150 / 8 }} >
         <Image source={require('./Img/BanerImg.jpg')}
          style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
       </View>
    <View style={{ flex:3,flexDirection: 'column',  alignItems: 'flex-end',backgroundColor:"#0083ff",height:150,width:"100%", borderRadius: 150 / 8 }} >
    <Text style={{ color: 'white',fontSize: 18, fontWeight: '100',flexWrap:'wrap' }} > My Friend In chatMy Friend In chatMy Friend In chatMy Friend In chatMy Friend In chat</Text>
    </View>
    </View> */}

{/* ok chat */}
    {/* <View style={{marginLeft: 20 ,marginTop: 25, justifyContent: "space-around", flexDirection: 'row' }} >
           <View style={{ flex:1,backgroundColor:"#d1d1d1",flex:4,flexDirection: 'column',  alignItems: 'center',borderRadius: 150 / 8 }} >
           <Text style={{ fontSize: 18 ,marginTop:10,marginBottom:10}} > My Friend In chatMy Friend In chatMy Friend In chatM</Text>

         </View>
      <View style={{ flex:1,flexDirection: 'column',  alignItems: 'flex-start',height:150,width:"100%", borderRadius: 150 / 8 }} >
      </View>
      </View>




<View style={{  backgroundColor: "#e6e6e6",marginTop: '10%', justifyContent: "space-around",alignSelf: 'flex-end', flexDirection: 'row', height: "20%" }} >


        <TouchableOpacity onPress={this.cameraOn.bind(this)}>
      <Ionicons name = "md-camera" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/>
         </TouchableOpacity>
      <Ionicons name = "md-photos" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/>
      <Ionicons name = "md-mic" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/>
     <TextInput style={{ borderWidth:1,borderRadius: 150/2, backgroundColor: "#e6e6e6", height: 40, width: 180 }} type="Text" placeholder="Search" ></TextInput>
      <Ionicons name = "md-happy" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/>
</View> */}

      </View>










//Login Screen
//<Login/>





      //Chat Screen
    // <View style={styles.container}>

    //   {<View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
    //     <MyHeader />
    //   </View>}


    //   <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: '10%', height: "10%" }} >
    //     <TextInput style={{ borderRadius: 5, backgroundColor: "#e6e6e6", height: 40, width: 350 }} type="Text" placeholder="Search" ></TextInput>
    //   </View>


    //   <View style={{ marginLeft: '4%', justifyContent: "space-around", flexDirection: 'row', height: "10%" }} >
    //     <View style={{ flex: 1, flexDirection: 'row', }} >

    //     <Ionicons name = "md-add-circle" size = {80} color = "gray" style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />


    //       <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
    //     </View>

    //     <View style={{ flex: 1, flexDirection: 'row', }} >
    //       <Image source={require('./Img/BanerImg.jpg')}
    //         style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />

    //       <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
    //     </View>

    //     <View style={{ flex: 1, flexDirection: 'row', }} >
    //       <Image source={require('./Img/BanerImg.jpg')}
    //         style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
    //         <View style={styles.cont}></View>
    //       <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
    //     </View>

    //     <View style={{ flex: 1, flexDirection: 'row', }} >
    //       <Image source={require('./Img/BanerImg.jpg')}
    //         style={{ width: 70, height: 70, marginLeft: '3%', borderRadius: 70 / 2 }} />
    //         <View style={styles.cont}></View>
    //       <Text style={{ flex: 1, fontSize: 15, fontWeight: '300', position: 'absolute', marginTop: '80%', marginLeft: '15%' }} >Friend</Text>
    //     </View>

    //   </View>



    );
  }
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
    marginTop: '50%',
    marginLeft: '50%'
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
