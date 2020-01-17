import React from 'react';
import { TouchableOpacity, FlatList, Dimensions, Button, TouchableHighlight, StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MyHeader from "../Component/MyHeader"
import { getAllUsers, createRoom } from "../Config/firebase"
import { Ionicons } from '@expo/vector-icons'
import MyFooter from "../Component/MyFooter"
import firebase from "../Config/firebase"
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import Slider from "react-native-slider";





export default class Getusers extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usrdata: {},
      loading: true,
      communityActive: 0,
      value: 15,
      slider:false,
      warning:true
    }

  }


  async getUsers() {
    const users = await getAllUsers();

    this.setState({ users, loading: false })
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasLocationPermission: status === 'granted' });

    let location = await Location.getCurrentPositionAsync({});


    this.setState({ location });

    this.getUsers();
    this.username();
    this.updatelocation()
  }
  async username() {
    var db = firebase.firestore();
    const userid = firebase.auth().currentUser.uid
    await db.collection("users")
      .where('id', "==", userid)
      .get().then(snapshot => {

        snapshot.forEach(elem => {

          this.setState({
            usrdata: elem.data()
          })
        })

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  }



  updatelocation() {
    const { location } = this.state
    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(user.uid).update({
      status: "Online",
      location
    })
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }


  async startChat(friendId) {
    try {
      const room = await createRoom(friendId);

      this.props.navigation.push('Cht', {
        id: room.id,
        // name:this.state.usrdata.name
        friendId

      })
    }
    catch (e) {
      alert("error==>", e.message);
    }
  }

  async startCommunity(newname, newid, newisactive, newicon) {

    var db = firebase.firestore();

    await db.collection('users')

      .where('category', 'array-contains', { name: newname, Id: newid, isactive: newisactive, icon: newicon })
      .get()
      .then((querySnapshot) => {
        // alert("function chl raha hai")
        let newusers = [];
        const { distance } = this;
        // Iterate Through Query Data
        querySnapshot.docs.forEach((document) => {
          let data = document.data();
          if (data.id != this.state.usrdata.id) {
            const currentLocation = this.state.usrdata.location.coords;
            const otherLocation = data.location.coords;

            const distanceKM = distance(currentLocation.latitude, currentLocation.longitude, otherLocation.latitude, otherLocation.longitude, 'K');

            if (distanceKM <= Math.round(this.state.value))
              newusers.push(data);
          }
        });
        this.setState({ newusers, communityActive: newid,newname,newid,newisactive,newicon,slider:true,warning:false});

      })
      .catch((error) => {
        console.log(`Error getting documents: ${error}`);
      });


  }

  slider(value){
    this.setState({ value })
    const {newname,newid,newisactive,newicon}=this.state
    console.log("newname",newname)
    if (newname !== undefined){

      this.startCommunity(newname, newid, newisactive, newicon)
    }else{

      alert("PLease Select Community First")
    }

  }






  render() {
    const { users, usrdata, newusers, loading } = this.state;
    // console.log("current newusers =============>",this.state.newusers)
    if (!loading) {
      return (
        <View style={styles.container}>


          <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', height: "10%" }} >
              <MyHeader navigation={this.props.navigation} name={this.state.usrdata.name} status={this.state.usrdata.status} profilepic={this.state.usrdata.profilepic} />
            </View>

            <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: '1%', height: "10%" }} >
            </View>






            <FlatList
              data={usrdata.category}
              horizontal={true}
              extraData={this.state.communityActive}
              renderItem={({ item }) =>
                <TouchableOpacity style={{ marginTop: '10%', flexDirection: 'row', padding: 15 }} onPress={() => { this.startCommunity(item.name, item.Id, item.isactive, item.icon) }}   >

                  <View style={[(this.state.communityActive == item.Id ? { backgroundColor: '#02aeec' } : {}), { flex: 1, height: "40%", flexDirection: 'column', justifyContent: "flex-start", marginTop: -25 }]} >
                    <Image
                      style={{ width: 60., height: 60, marginLeft: '3%', borderRadius: 70 / 2, alignSelf: 'center' }}
                      source={{
                        uri: item.icon
                      }}
                    />

                    <Text style={{ fontSize: 12, fontWeight: '300', alignSelf: 'center' }} > {item.name}</Text>

                  </View>
                </TouchableOpacity>

              }

              keyExtractor={(item) => item.Id}
              numColumns={1}
            />

{this.state.slider &&<View>
   <Slider 
  maximumValue={50000}
  minimumValue={1}

  value={this.state.value}
  // onValueChange={value => this.setState({ value })}/
  onValueChange={this.slider.bind(this)}

/>
<Text>
  Users Distance: {Math.round(this.state.value)} Miles
</Text>
</View>
}

{this.state.warning && <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >Select The Community For Chating With Your Friend</Text> }
            <FlatList
              data={newusers}
              extraData={this.state.newusers}
              // onRefresh ={() => {this.state.value}}
              refreshing={true}
              renderItem={({ item }) =>
                <View>

                  <TouchableOpacity style={{ marginTop: '10%', justifyContent: "space-around", flexDirection: 'row', }} onPress={() => { this.startChat(item.id) }}   >
                    <Ionicons name="ios-contact" size={70} color="black" width="70" height="70" style={{ marginLeft: '3%', borderRadius: 70 / 2 }} />

                    <View style={styles.cont2}></View>

                    <View style={{ flex: 4, flexDirection: 'row', marginTop: '3%', marginLeft: '3%' }} >
                      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >

                        <Text style={{ fontSize: 22, fontWeight: '300' }} > {item.name}</Text>

                        <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >{item.email}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%' }} >{item.status}</Text>

                      </View>
                    </View>
                  </TouchableOpacity>


                </View>}

              keyExtractor={(item, index) => item + index}
              numColumns={1}


            />

            <MyFooter />

          </View>

        </View>
      );
    }
    else {
      return <View style={styles.container} >
        <Image size='80' style={{ width: 400, height: 400, margin: 16, justifyContent: 'space-between', alignItems: "center" }} source={require('../Img/Icons/Loading.gif')}>
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
  Loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
    width: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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





