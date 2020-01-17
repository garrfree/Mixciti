// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';

// const YOUR_PUSH_TOKEN = '';

// export default class Pushnotification extends React.Component {
//   state = {
//     notification: {},
//   };

//   registerForPushNotificationsAsync = async () => {
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(
//         Permissions.NOTIFICATIONS
//       );
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Permissions.askAsync(
//           Permissions.NOTIFICATIONS
//         );
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       let token = await Notifications.getExpoPushTokenAsync();
//       console.log(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
//   };

//   componentDidMount() {
//     this.registerForPushNotificationsAsync();

//     // Handle notifications that are received or selected while the app
//     // is open. If the app was closed and then opened by tapping the
//     // notification (rather than just tapping the app icon to open it),
//     // this function will fire on the next tick after the app starts
//     // with the notification data.
//     this._notificationSubscription = Notifications.addListener(
//       this._handleNotification
//     );
//   }

//   _handleNotification = notification => {
//     this.setState({ notification: notification });
//   };

//   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//   sendPushNotification = async () => {
//     const message = {
//       to: YOUR_PUSH_TOKEN,
//       sound: 'default',
//       title: 'Original Title',
//       body: 'And here is the body!',
//       data: { data: 'goes here' },
//     };
//     const response = await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//     const data = response._bodyInit;
//     console.log(`Status & Response ID-> ${data}`);
//   };

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}>
//         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//           <Text>Origin: {this.state.notification.origin}</Text>
//           <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
//         </View>
//         <Button
//           title={'Press to Send Notification'}
//           onPress={() => this.sendPushNotification()}
//         />
//       </View>
//     );
//   }
// }

// /*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

//     curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
//       "ids": ["YOUR RECEIPTID STRING HERE"]
//       }'

//     */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { Constants, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const PUSH_ENDPOINT = 'https://exponent-push-server.herokuapp.com/tokens';

export default class Pushnotification extends Component {
  state = {
    receivedNotification: null,
    lastNotificationId: null,
  }
  
  componentWillMount() {
    this.registerForPushNotificationsAsync();
    
    Notifications.addListener((receivedNotification) => {
      this.setState({
        receivedNotification,
        lastNotificationId: receivedNotification.notificationId,
      });
    });
  }
  
  registerForPushNotificationsAsync = async () => {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExponentPushTokenAsync();
  
    // POST the token to our backend so we can use it to send pushes from there
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
      }),
    });
  };
  
  onPressDismissAllNotifications = () => {
    Notifications.dismissAllNotificationsAsync();
    this.setState({
      lastNotificationId: null,
    });
  };
  
  onPressDismissOneNotification = () => {
    Notifications.dismissNotificationAsync(this.state.lastNotificationId);
    this.setState({
      lastNotificationId: null,
    });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          receivedNotification: {JSON.stringify(this.state.receivedNotification)}
        </Text>
        {Platform.OS === 'android' && this.renderAndroid()}
      </View>
    );
  }
  
  renderAndroid = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={this.onPressDismissAllNotifications}>
          <Text style={styles.paragraph}>
            Dismiss All Notifications
          </Text>
        </TouchableOpacity>
        {this.state.lastNotificationId && <TouchableOpacity
          onPress={this.onPressDismissOneNotification}>
          <Text style={styles.paragraph}>
            Dismiss Notification {this.state.lastNotificationId}
          </Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});


