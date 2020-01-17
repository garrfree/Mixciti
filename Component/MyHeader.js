import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { AsyncStorage, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import firebase from "../Config/firebase"






export default class MyHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []

    }
  }

  signOut() {


    const { navigation } = this.props;


    let user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(user.uid).update({
      status: "Offline"
    })
    firebase.auth().signOut().then(async () => {
      alert('Signed Out');
      await AsyncStorage.removeItem('USER')
      navigation.navigate('Login');
      // removeItem
    },
      function (error) {
        console.error('Sign Out Error', error);
      });
    console.log('propppppppppppppppppp', this.props);

  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginTop: '6%', justifyContent: 'flex-start', height: "60%", width: "100%" }} >
        <Ionicons name="ios-contact" size={50} color="gray" width="50" height="50" />
        <View style={{ flex: 4, flexDirection: 'row', marginTop: '2%' }} >
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
            <Text style={{ fontSize: 25, fontWeight: '300' }} > {this.props.name}</Text>
            <Text style={{ fontSize: 15, fontWeight: '300', marginLeft: '3%', color: "#88c949" }} >{this.props.status}</Text>
          </View>
          <View style={{ flex: 5, flexDirection: 'row', marginTop: '3%', marginRight: '3%', justifyContent: 'flex-end' }} >

            <TouchableOpacity onPress={this.signOut.bind(this)}>
              <Ionicons name="md-power" size={25} color="gray" />

            </TouchableOpacity>
          </View>
        </View>

      </View>
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






