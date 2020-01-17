import React from 'react';
import { TextInput, Dimensions, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
// import * as Permissions from 'expo-permissions';
import MapView, {
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Amera extends React.Component {
  state = {
    marker_lat: LATITUDE,
    marker_long: LONGITUDE,

    modalVisible: false,
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  };

  async componentDidMount() {
    
    let location = await Location.getCurrentPositionAsync({});
    console.log('location****', location)
    this.setState({ location });

    Location.watchPositionAsync({timeInterval: 1000, distanceInterval: 0.1}, loc => {
      console.log('watching***', loc);
      this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude})
    })
  }

  

 

  

  
  render() {
    return (
      <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={{
              latitude: this.state.marker_lat,
              longitude: this.state.marker_long
            }}
          />

        </MapView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
