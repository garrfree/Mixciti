import React from 'react';
import { TouchableOpacity,FlatList, Dimensions, Button,KeyboardAvoidingView,TouchableHighlight, StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo';
import { Camera } from 'expo-camera';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import MyHeader from "../Component/MyHeader"

import * as Location from 'expo-location';
const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { Ionicons } from '@expo/vector-icons'
import firebase ,{ getAllUsers,createRoom,sendMessageToDb } from "../Config/firebase"
import MyFooter from "../Component/MyFooter"

export default class Cht extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      hasCameraPermission: null,
      list: [],
      type: Camera.Constants.Type.back,
      modalVisible: false,
      // hasCameraPermission: null,
      trager: false,
      toggle: false,
      triger: false,
      cht: true,
      usrdata:{},
      // toggle:false,
      list: [],
      // type: Camera.Constants.Type.back,
      modalVisible: false,
      users: [],
      text:'',
      messages:[],
      loading: true
      // location: {coords: { latitude: 24.9032804, longitude:67.0278093}}
    }

  }
  async username(){
    var db = firebase.firestore();
    const { navigation } = this.props
    const friendId = navigation.getParam('friendId');
    // const friendId = this.state.friendId
    await db.collection("users")
    .where('id', "==",friendId)
    .get().then(snapshot => {

       snapshot.forEach(elem => {
         
         this.setState({
            usrdata:elem.data()
          })
        })
        })
        .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
  }
  
  async getAllMessages(){
    // const roomId = this.props.match.params.id;
    const { navigation } = this.props
    const db = firebase.firestore();
    const roomId = navigation.getParam('id');
    // const name = navigation.getParam('name');
    // const friendId = navigation.getParam('friendId');
    db.collection("chatrooms").doc(roomId).collection("messages")
    .orderBy("timestamp",'asc')
    .onSnapshot (snapshot => {
      // console.log("Data", snapshot);
       const  messages = [];
      // console.log("snapshot==>",snapshot.data);
      snapshot.forEach(elem =>{
          console.log("elem==>",elem.data());
          // console.log("")
          messages.push({ data : elem.data(), id : elem.id})
          // console.log()
      })
      const {downButtonHandler} = this;
      this.setState({ messages, loading: false }, () => {
        setTimeout(() => {
          downButtonHandler();
        }, 1000)
      })
      

    })
    
    
    // console.log("ageyeee=====>",this.state.messages)
  }



//   messageRead(){
// const { navigation } = this.props
//     let user = firebase.auth().currentUser;  
//     const db = firebase.firestore();
//     const roomId = navigation.getParam('id');
//     db.collection("chatrooms").doc(roomId).collection("messages").doc().where("userId", '==', user.uid).update({
//       Isread:"Yes"      
//     })
//   }


  async componentDidMount() {
    this.username()
    this.getAllMessages()
    // this.messageRead()
    // this.getUsers();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this._getLocationAsync();
    //this.downButtonHandler;
  }

  upButtonHandler = () => {
    //OnCLick of Up button we scrolled the list to top
    this.ListView_Ref.scrollToOffset({ offset: 0,  animated: true });
  };
 
  downButtonHandler = () => {
    //OnCLick of down button we scrolled the list to bottom
    this.ListView_Ref.scrollToEnd({ animated: true });
  };
  sendMessage(){
    const { navigation } = this.props
    const roomId = navigation.getParam('id');
    // const roomId = this.props.match.params.id;
    sendMessageToDb(roomId,this.state.text);
    //alert("YOUR MESSAGE HAS BEEN SEND!");
    this.setState({ text  :"" });
  }
  _handleMapRegionChange = mapRegion => {
    // console.log(mapRegion);
    this.setState({ mapRegion });
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

async capture() {
    const photo = await this.camera.takePictureAsync();
    // console.log('photo *********', photo);
    // this.setState({photo: photo.uri})
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    let storageRef = firebase.storage().ref().child(`userimages/${Math.random()}`)
    storageRef.put(blob)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((snapUrl) => {
                // let today = new Date()
                let created = Date.now()
                const db = firebase.firestore();
                // let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                const sender = firebase.auth().currentUser.uid;
                const { navigation } = this.props
                const roomId = navigation.getParam('id');
                const obj = {
                    timestamp:created,
                    snapUrl,
                    userId: sender,
                    type:'image'
                }
                return db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
            })
            this.setState({
              toggle: false,
              cht: true
            })
            // alert("your photo hass been send")
        })

}
async _pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
    })
    const response = await fetch(result.uri);
    const blob = await response.blob();
    let storageRef = firebase.storage().ref().child(`userimages/${Math.random()}`)
    storageRef.put(blob)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((snapUrl) => {
                // let today = new Date()
                let created = Date.now()
                const db = firebase.firestore();
                // let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                const sender = firebase.auth().currentUser.uid;
                const { navigation } = this.props
                const roomId = navigation.getParam('id');
                const obj = {
                    timestamp:created,
                    snapUrl,
                    userId: sender,
                    type:'image'
                }
                return db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
            })
            // this.setState({
            //   toggle: false,
            //   cht: true
            // })
            alert("your photo hass been send")
        })
}

  cameraOn() {
    this.setState({
      toggle: true,
      cht: false
    })
  }

  imageOn() {
    this.setState({
      triger: true
    })
  }
  locationOn() {
    this.setState({
      trager: true,
      cht: false
    })
  }
  locationOf() {
    this.setState({
      trager: false,
      cht: true
    })
  }



  render() {
    console.log("MSG LENGTH=====>",this.state.messages.length)
    
    // console.log("ageyeeaae=====>",this.state.name)  
    const { hasCameraPermission, image, trager, cht, users,messages,loading } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }


    
    //  return (     <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
    //  <Text style={styles.titleText}>Welcome In Messenger</Text>
    // </KeyboardAvoidingView>
    if(!loading) {
    return ( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <View style={styles.container}>
          {this.state.cht && <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
        <Ionicons name = "md-arrow-round-back" size = {34} color = "#000041" style = {{marginLeft:10,marginTop:35}}  onPress={()=>{ this.props.navigation.goBack(); }}/>
            <MyHeader  name={this.state.usrdata.name} profilepic={this.state.usrdata.profilepic}/>
          </View>
          <FlatList  
                  
                  data={messages}
                  // data={messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp))}
                 // data={messages.data.sort((a, b) => a.data.message.localeCompare(b.data.message))}
                  renderItem={({ item }) =>
                  <View> 
                       
                 
                <View style={{flex: 1, marginRight: 20,marginLeft: 20, marginTop: 15,  flexDirection: 'row' }} >
                  
                  {item.data.userId === firebase.auth().currentUser.uid ? 
                  item.data.type === 'image'?
                  <View>
                    <Image style={{flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  
                  
                  <View
                  style={{width:"auto", alignSelf:"flex-end",color: 'white',backgroundColor: "#0084d5",  flexDirection: 'column',  borderRadius: 150 / 8 }} >
                  
                  <Text style={styles.Me} >{item.data.message} </Text>
                  </View>
                  : 
                  item.data.type === 'image'?
                  <View style={{flex:6,marginLeft:"50%",width:"auto",alignSelf:"flex-end", flexDirection: 'column',  borderRadius: 150 / 8 }} >

                    <Image style={{alignSelf:"flex-end",borderRadius: 25,flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  <View
                  style={{flex:6,marginLeft:"50%",width:"auto",alignSelf:"flex-end", backgroundColor: "darkgrey",  flexDirection: 'column',  borderRadius: 150 / 8 }} >
                    <Text style={styles.paragraph} >{item.data.message} </Text>
                  </View>
                  }
                  {/* <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', height: "auto", width: "100%", borderRadius: 150 / 8 }} >
                  </View> */}
                </View>
                 </View>}
                  keyExtractor={(item,index) => index.toString()}
                  numColumns = {1}
                  ref={(ref) => {
                    this.ListView_Ref = ref;
                  }}
                  />
    
                       {/* <FlatList  
                  
                  data={messages}
                  
                  renderItem={({ item }) =>
                  <View> 
                       
                 
                <View style={{flex: 1, marginLeft: 20, marginTop: 25, justifyContent: "space-around", flexDirection: 'row' }} >
                  
                  {item.data.userId === firebase.auth().currentUser.uid ? 
                  item.data.type === 'image'?
                  <View>
                    <Image style={{flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  <View
                  style={{flex: 6,  color: 'white',backgroundColor: "#0084d5",  flexDirection: 'column',  borderRadius: 150 / 8 }} >
                  <Text style={{color:'white',margin: 24, fontSize: 15,fontWeight: 'normal',textAlign: 'right',color: '#34495e',marginTop:15}} >{item.data.message} </Text>
                  </View>
                  : 
                  item.data.type === 'image'?
                  <View>
                    <Image style={{flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  <View
                  style={{ flex: 1, backgroundColor: "darkgrey", flex: 6, flexDirection: 'column',  borderRadius: 150 / 8 }} >
                    <Text style={styles.paragraph} >{item.data.message} </Text>
                  </View>
                  }
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', height: "auto", width: "100%", borderRadius: 150 / 8 }} >
                  </View>
                </View>
                 </View>}
                  keyExtractor={(item,index) => index.toString()}
                  numColumns = {1}
                  />   */}
         {/* <KeyboardAvoidingView  behavior="padding"    enabled>   */}
    <View style={{ justifyContent: "space-around", flexDirection: 'row', height: "8%",alignSelf:"flex-end",width:"100%" }} >

    {/* <View style={{  backgroundColor: "#e6e6e6", justifyContent: "space-around", flexDirection: 'row', height: "8%",alignSelf:"flex-end",width:"100%" }} > */}
    {/* <TouchableOpacity onPress={this.cameraOn.bind(this)}>
              <Ionicons name="md-camera" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
            </TouchableOpacity> */}


           {/* <TouchableOpacity onPress={this._pickImage.bind(this)}>
           <Ionicons name="md-photos" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
           </TouchableOpacity>    */}

   
    {/* <TouchableOpacity onPress={this.locationOn.bind(this)}>
             <Ionicons name="md-mic" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
   </TouchableOpacity> */}
   
    <TextInput style={{ borderWidth: .5, borderRadius: 150 / 30, backgroundColor: "#e6e6e6", height: 50, width: 380,marginLeft:10 }} 
    value={this.state.text}
    type="Text"         
    onChangeText={text => this.setState({ text })}
    placeholder="Write your Text..." ></TextInput>

   <TouchableOpacity onPress={this.sendMessage.bind(this)}>
    <Ionicons name = "md-send" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/> 
    </TouchableOpacity> 
    </View>
{/* </KeyboardAvoidingView>  */}
     </View>
    }
              {/* mapp */}
              {trager && <View style={styles.container}>
              <View style={styles.paragraph}>
              <Button
            
                  title="Go back"
                  onPress={this.locationOf.bind(this)}
                />
              <Text>
                Pan, zoom, and tap on the map!
              </Text>
              </View>
              
              {
                this.state.locationResult === null ?
                <Text>Finding your current location...</Text> :
                this.state.hasLocationPermissions === false ?
                  <Text>Location permissions are not granted.</Text> :
                  this.state.mapRegion === null ?
                  <Text>Map region doesn't exist.</Text> :
                  <MapView
                    style={{ alignSelf: 'stretch', height: 500 }}
                    region={this.state.mapRegion}
                    onRegionChange={this._handleMapRegionChange}
                  >
                      <MapView.Marker
            coordinate={this.state.mapRegion}
            title="My Marker"
            description="Some description"
          />
                  
                 </MapView>
                  
              }
              
              <Text>
                Location: {this.state.locationResult}
              </Text>
            </View>
      }
      
      
      
              
      
              {/* Camera Open */}
              {this.state.toggle &&  <View style={{ flex: 1 }}>
                  <Camera
                    ref={ref => {
                      this.camera = ref;
                    }}
                    style={{ flex: 1 }}
                    type={this.state.type}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 0.4,
                          marginTop: "3%",
                          alignSelf: 'flex-start',
                          //  alignItems: 'center',
                        }}>
                        <TouchableOpacity
      
                          onPress={() => {
                            this.setState({
                              toggle: false,
                              cht:true
                            });
                          }}>
                          <Text style={{ fontSize: 18, color: 'white' }}> Go Back </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={{
                          flex: 0.2,
                          alignSelf: 'flex-end',
                          //  alignItems: '',
                        }}
                        onPress={() => {
                          this.setState({
                            type:
                              this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                          });
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                      </TouchableOpacity>
      
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          marginRight: '16%'
                        }}
                        onPress={() => this.capture()}>
                        <Image
                          source={{ uri: 'http://expertizo.pk/cowmandii/img/logo.png' }}
                          style={{ width: 100, height: 100 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </Camera>
                </View>}  
                
                <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.upButtonHandler}
        style={styles.upButton}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_up.png',
          }}
          style={styles.upButtonImage}
        />
      </TouchableOpacity>
        
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.downButtonHandler}
        style={styles.downButton}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png',
          }}
          style={styles.downButtonImage}

        />
      </TouchableOpacity>   
      
              {/* ok chat  */}
            
             
              
                {/* <FlatList  
                  
                  data={messages}
                  
                  renderItem={({ item }) =>
                  <View> 
                       
                 
                <View style={{flex: 1, marginLeft: 20, marginTop: 25, justifyContent: "space-around", flexDirection: 'row' }} >
                  
                  {item.data.userId === firebase.auth().currentUser.uid ? 
                  item.data.type === 'image'?
                  <View>
                    <Image style={{flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  <View
                  style={{flex: 6,  color: 'white',backgroundColor: "#0084d5",  flexDirection: 'column',  borderRadius: 150 / 8 }} >
                  <Text style={{color:'white',margin: 24, fontSize: 15,fontWeight: 'normal',textAlign: 'right',color: '#34495e',marginTop:15}} >{item.data.message} </Text>
                  </View>
                  : 
                  item.data.type === 'image'?
                  <View>
                    <Image style={{flex:6,height:100,width:100, flexDirection: 'column'}} source={{uri:item.data.snapUrl}} ></Image>
                  </View>
                  :
                  <View
                  style={{ flex: 1, backgroundColor: "darkgrey", flex: 6, flexDirection: 'column',  borderRadius: 150 / 8 }} >
                    <Text style={styles.paragraph} >{item.data.message} </Text>
                  </View>
                  }
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', height: "auto", width: "100%", borderRadius: 150 / 8 }} >
                  </View>
                </View>
                 </View>}
                  keyExtractor={(item,index) => index.toString()}
                  numColumns = {1}
                  />  
          
    <View style={{  backgroundColor: "#e6e6e6", justifyContent: "space-around", flexDirection: 'row', height: "8%",alignSelf:"flex-end",width:"100%" }} >
    <TouchableOpacity onPress={this.cameraOn.bind(this)}>
              <Ionicons name="md-camera" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
            </TouchableOpacity>


           <TouchableOpacity onPress={this._pickImage.bind(this)}>
           <Ionicons name="md-photos" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
           </TouchableOpacity>   

   
    <TouchableOpacity onPress={this.locationOn.bind(this)}>
             <Ionicons name="md-mic" size={30} color="gray" style={{ marginLeft: 10, marginTop: 10 }} />
   </TouchableOpacity>
   
    <TextInput style={{ borderWidth: 1, borderRadius: 150 / 2, backgroundColor: "#e6e6e6", height: 40, width: 180 }} 
    value={this.state.text}
    type="Text"         
    onChangeText={text => this.setState({ text })}
    placeholder="Search" ></TextInput>

   <TouchableOpacity onPress={this.sendMessage.bind(this)}>
    <Ionicons name = "md-send" size = {30} color = "gray" style = {{marginLeft:10,marginTop:10}}/> 
    </TouchableOpacity> 
    </View> */}
              
         
              
            </View>
            </KeyboardAvoidingView>
    );
  }
  else {
    return <View style={styles.container} >
      <Image size='80' style={{ width: 400, height: 400, margin: 16 }}  source = {require('../Img/Icons/Loading.gif') }>
      </Image>
         </View> 
  }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70,
  },
  upButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  downButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    top: 70,
  },
  downButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  paragraph: {
    margin: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
    marginTop:15,
    alignSelf:"flex-end",
  },


  Me: {
    color:'white',
    margin: 12, 
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
    marginTop:15,
    alignSelf:"flex-end",
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
  paragraph: {
    margin: 24,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
    marginTop:20
  },


  Icons: {
    width: "50%",
    height: "25%"
  },
  cont: {
    width: "1%",
    height: "2%",
    backgroundColor: "rgba(32, 193, 11, 0.96)",
    borderRadius: 100,
    flex: 1,
    position: 'absolute',
    marginTop: '55%',
    marginLeft: '55%'
  },



});





