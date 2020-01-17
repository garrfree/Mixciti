import React from 'react';
import { Text, View, TouchableOpacity, Button, Image,StatusBar,StyleSheet } from 'react-native';
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {
    constructor(props){
          super(props)
          this.qno = 0
          this.score = 0
      
        }
        render() {
            return (<Text> dfdf</Text>
          //   <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
          //   <View style={styles.container}>
       
          //   <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>
       
          //   <View style={styles.oval} >
          //     <Text style={styles.welcome}>
          //       {this.state.question}
          //     </Text>
          //  </View>
          //     <View>
          //     { options }
          //     </View>
          //     <View style={{flexDirection:"row"}}>
          //   {/*   <Button
          //       onPress={() => this.prev()}
          //       title="Prev"
          //       color="#841584"
          //     />
          //     <View style={{margin:15}} />*/}
       
          //     <TouchableOpacity onPress={() => this.next()} >
          //       <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
          //         <Icon name="md-arrow-round-forward" size={30} color="white" />
          //       </View>
          //     </TouchableOpacity >
       
          //     </View>
          //     </View>
          //   </View>
          //   </ScrollView>
          );
          }
        }
        const styles = StyleSheet.create({
 
            oval: {
            width: width * 90/100,
            borderRadius: 20,
            backgroundColor: 'green'
            },
            container: {
              flex: 1,
              alignItems: 'center'
            },
            welcome: {
              fontSize: 20,
              margin: 15,
              color: "white"
            },
            instructions: {
              textAlign: 'center',
              color: '#333333',
              marginBottom: 5,
            },
          });