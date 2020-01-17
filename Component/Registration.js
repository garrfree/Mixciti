import React, { Component } from 'react';
import { ActivityIndicator, Image, Alert, Button, Text, TouchableOpacity, TextInput, FlatList, TouchableHighlight, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { register, login, Facebooklogin } from "../Config/firebase"
import * as Facebook from 'expo-facebook';
import { Ionicons } from '@expo/vector-icons'
import firebase from "../Config/firebase"
var db = firebase.firestore();
import { YellowBox } from 'react-native';
import _ from 'lodash'
import * as Permissions from 'expo-permissions';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as Location from 'expo-location';


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {

  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      data: [],
      status: "Offline",
      name: '',
      hasLocationPermission: null,
      toggle: false,
      login: true,
      communityLoaded: false,
      selectedItems: '',
      children: [],
      new: [],
      Indicator: false,


    };

    this.communityKeys = [];

  }




  onSelectedItemsChange = (selectedItems1) => {
    console.log("selectedItems=>", selectedItems1);

    this.communityKeys = selectedItems1;

    var a = selectedItems1.toString()

    // const data = this.state.message.filter(x => x.id == selectedItems1)[0];

    this.search(a, selectedItems1)
    this.setState({ community: selectedItems1 });
    // console.log("aaaaaaaaaaaaaaaaaaa",a)


  };


  search(nameKey, myArray) {
    ["1", "2"]
    console.log('abc ===>', nameKey);
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].Id === nameKey) {

        this.state.new.push(myArray[i]);
        this.setState({
          new: this.state.new
        })
      }

    }
  }




  async getAllCommuntiy() {
    // const { navigation } = this.props
    const db = firebase.firestore();
    //const roomId = navigation.getParam('id');

    await db.collection("Community").get().then(snapshot => {
      const messages = [];
      console.log("snapshot==>", snapshot.data);
      snapshot.forEach(elem => {
        messages.push({ name: elem.data().name, Id: elem.data().Id, isactive: elem.data().isactive, icon: elem.data().icon })
      })
      console.log("Cate", messages);

      this.setState({ messages, communityLoaded: true })
    })

  }

  // getAllCommuntiy() {
  //   // alert("email.id==>")
  //   // alert("hello world")

  //   return new Promise((resolve, reject) => {
  //     db.collection("Community").get().then(snapshot => {
  //           const Communtiy = [];
  //            snapshot.forEach(elem => {
  //               // console.log("email.id==>", elem.data())
  //               if (elem.data().description)
  //               Communtiy.push({ description: elem.data().description,Id: elem.data().Id})
  //           })
  //           // console.log("Communtiy==>", Communtiy.description);
  //           resolve("Registerd Successfully!")
  //           // console.log("Communtiy==>", Communtiy)
  //           this.setState({
  //             children:[Communtiy]
  //           })



  //       })
  //   })
  // }
  async signUp() {
    const { email, password, name, location, status } = this.state;
    // console.log("community=====>",community)
    const { communityKeys } = this;
    if (communityKeys.length <= 6) {
      const category = this.state.messages.filter(x => communityKeys.indexOf(x.Id) != -1);

      await register(email, password, name, category, location, status).then(() => {
        alert("Registration Sucessful")
        this.setState({ Indicator: true })
        this.props.navigation.navigate('Login')
      }).catch(e => {
        //   alert(e.message);
        alert(e.message);
      })
    } else {
      alert("Please select atleast 1 Community");
    }

  }



  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ hasLocationPermission: status === 'granted' });

    let location = await Location.getCurrentPositionAsync({});
    console.log('location****', location)

    this.setState({ location });

    Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
      console.log('watching***', loc);
      this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
    })
    this.getAllCommuntiy()
  }



  render() {
    const { selectedItems, children } = this.state;
    console.log("new=====>", this.state.new)
    return (<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

      <View style={styles.container}>

        {this.state.login && <View style={styles.container}>
          <Ionicons name="md-arrow-round-back" size={34} color="#000041" style={{ marginLeft: 10 }} onPress={() => { this.props.navigation.navigate('Login') }} />
          <Image
            style={{ marginBottom: "5%", width: 100, height: 100 }}
            source={{ uri: 'https://images.talentsroot.com/jizlazMT4aQ/w:416/h:405/q:auto/https://www.talentsroot.com/wp-content/uploads/2019/07/fullsizeoutput_f8.jpeg' }}
          />

          <Text style={styles.titleText}>Login In Emixr</Text>


          <TextInput
            value={this.state.name}
            keyboardType='default'
            onChangeText={(name) => this.setState({ name })}
            placeholder='Enter Your Name'
            placeholderTextColor='grey'
            style={styles.input}
          />

          <TextInput
            value={this.state.email}
            keyboardType='email-address'
            onChangeText={(email) => this.setState({ email })}
            placeholder='Enter Your Email Address'
            placeholderTextColor='grey'
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Enter Your Password'}
            secureTextEntry={true}
            placeholderTextColor='grey'
            style={styles.input}
          />
          <Text>Choose Your Community</Text>
          <SectionedMultiSelect
            items={this.state.messages}

            loading={!this.state.communityLoaded}
            uniqueKey="Id"
            displayKey="name"

            selectText="Choose Your Community..."
            showDropDowns={false}
            readOnlyHeadings={false}
            onSelectedItemsChange={this.onSelectedItemsChange}

            selectedItems={this.state.community}
          />

          <View style={{ flexDirection: "row", alignContent: "space-between" }}>



            <TouchableOpacity
              style={styles.button}
              onPress={this.signUp.bind(this)}

            >
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>


        </View>
        }

        <View>
        </View>
        <View>
        </View>

        {this.state.Indicator &&

          <ActivityIndicator size="large" color="#02aeec" />
        }


      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  titleText: {
    //fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',


  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1c7ac0',
    width: 150,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00c6ff',
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 10,
    marginLeft: 5,


  },

  buttonFB: {
    alignItems: 'center',
    backgroundColor: '#0078ff',
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00c6ff',
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 20
  },


  buttonText: {
    // fontFamily: 'Baskerville',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    // fontWeight:'bold'
  },
  input: {
    color: 'black',
    width: 300,
    //fontFamily: 'Poppins',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#02adee',
    marginVertical: 10,
    marginTop: 10
  },
});
