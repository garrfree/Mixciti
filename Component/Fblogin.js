// import React from 'react';
// import { TextInput, Dimensions, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
// import * as Facebook from 'expo-facebook';
// import { Facebooklogin } from '../Config/firebase';

// export default class Facebooklogin extends React.Component {

//   async loginWithFacebook() {
//     const {
//       type,
//       token,
//       expires,
//       permissions,
//       declinedPermissions,
//     } = await Facebook.logInWithReadPermissionsAsync('363732821079138', {
//       permissions: ['public_profile'],
//     })


//     if (type === 'success') {
//       // Get the user's name using Facebook's Graph API
//       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//       const res = await response.json();
//       console.log('res==>', res)
//       try {
//         const user = await login(token);
//         console.log('user ===>', user);
//       } catch (e) {
//         console.log('e ===>', e)
//       }
//       Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//     } else {
//       // type === 'cancel'
//     }
//     console.log('result ===>', result);
//   }

//   render() {
//     return (
//       <View style={{backgroundColor: 'orange', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Login Page</Text>

//         {/* <Button title="Sign in" onPress={() => {this.props.navigation.navigate('Home')}}/> */}

//         <Button title="Facebook Login" onPress={() => {this.loginWithFacebook()}}/>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });