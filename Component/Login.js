import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Image, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { register, login, Facebooklogin } from "../Config/firebase"
import firebase from "../Config/firebase"
import { YellowBox } from 'react-native';
import _ from 'lodash'
import * as Permissions from 'expo-permissions';





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

    // })

    this.state = {
      email: '',
      password: '',
      name: '',
      login: true,
      Indicator: false,
    };
  }

  async signUp() {

    this.props.navigation.navigate('Registration')
  }

  async onLogin() {
    const { email, password } = this.state;

    await login(email, password).then(() => {

      this.setState({ Indicator: true })
      this.props.navigation.navigate('Getusers')
      const obj = {
        email: email,
        password: password
      }
      AsyncStorage.setItem('USER', JSON.stringify(obj), () => {
        //   AsyncStorage.getItem('USER', (error,result) =>{
        // this.props.navigation.navigate('Posts')
        //  });

      });
    }).catch(e => {
      //   alert(e.message);
      alert(e.message);

    })

  }

  async checkuser() {
    const userObj = await AsyncStorage.getItem('USER')
    if (userObj !== null) {
      this.setState({ Indicator: true })
      const parseUser = JSON.parse(userObj)

      const email = parseUser.email
      const password = parseUser.password
      await login(email, password).then(() => {

        this.props.navigation.navigate('Getusers')
        const obj = {
          email: email,
          password: password
        }
        AsyncStorage.setItem('USER', JSON.stringify(obj), () => {
          //   AsyncStorage.getItem('USER', (error,result) =>{
          // this.props.navigation.navigate('Posts')
          //  });

        });
      }).catch(e => {
        //   alert(e.message);
        alert(e.message);

      })

    } else {
      this.setState({ Indicator: false })

      this.props.navigation.navigate('Login')

    }


  }

  async componentDidMount() {
    this.checkuser()
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }




  render() {
    return (<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.container}>

        {this.state.login && <View style={styles.container}>

          <Image
            style={{ marginBottom: "5%", width: 150, height: 150 }}
            source={{ uri: 'https://images.talentsroot.com/jizlazMT4aQ/w:416/h:405/q:auto/https://www.talentsroot.com/wp-content/uploads/2019/07/fullsizeoutput_f8.jpeg' }}
          />
          {this.state.Indicator &&

            <ActivityIndicator size="large" color="#02aeec" />
          }
          <Text style={styles.titleText}>Login In eMixr</Text>


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

          <View style={{ flexDirection: "row", alignContent: "space-between" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onLogin.bind(this)}
            >
              <Text style={styles.buttonText}>  Login </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={this.signUp.bind(this)}
            >
              <Text style={styles.buttonText}> Register </Text>

            </TouchableOpacity>

          </View>

        </View>
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
    fontSize: 30,
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
    marginBottom: 10,
    marginTop: 20,
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
    borderRadius: 10,
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
    marginTop: 20
  },
});
