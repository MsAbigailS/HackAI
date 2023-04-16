import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions, TextInput } from 'react-native';
import picture from "./images/login_picture.png";
import googleIcon from "./images/google_logo_picture.png";
import { useRouter } from "expo-router";
import { Animated } from 'react-native';
import React, { useState, useEffect, Component} from 'react';
// import FadeIn from 'react-native-fade-in-image';

export default function Login() {
  const router = useRouter();
  
  const pics = [

  ]

  class ImageLoader extends Component{
    state = {
      opacity: new Animated.Value(0),
    }

    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }

    render() {
      return(
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0,1],
                    outputRange: [0.85, 1],
                  })
                }
              ]
            },
            this.props.style,
          ]
          }
        />
      )
    }
  }

  return (
    <View styles={styles.container}>
    {/* <Text styles={styles.header}>Merchandise</Text> */}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
   <View style={{flex:1, backgroundColor:"green"}}>
    <Text>hello world 1.........</Text>
    <Text>hello world 1.........</Text>
    <Text>hello world 1.........</Text>
    <Text>hello world 1.........</Text>
    </View>
      <View style={{flex:1, backgroundColor:"yellow"}}>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    <Text>hello world 2.........</Text>
    </View>
  </View>
    {/* <View style={styles.listView}>
      {/* <FadeInView> */}
      {/* <ImageLoader style={styles.image} source={require("./images/mavHat.jpg")} />
      <ImageLoader style={styles.image} source={require("./images/mavShirt.jpg")} />
      <ImageLoader style={styles.image} source={require("./images/mavJersey.jpg")} />

      <StatusBar style="auto" /> */}
      {/* </FadeInView> */}
    {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: "center"
  },
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    // padding: 10,
  },
  header: {
    fontSize: "50%",
    fontWeight: "bold",
    paddingLeft: "2%",
    paddingBottom: "2%",    
  },
  image: {
    //backgroundColor: 'red',
    //width: (Dimensions.get('window').width / 3) - 15,
    //height: 300,
    width: 200,
    height:200,
    marginTop: 100,
  },
  inputContainer:{
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "12%"
  },
  textInput: {
    fontSize: 30,
    // backgroundColor: "#ffffff",
    width: "100%",
    height: "45%",
    margin: 5,
    // borderWidth: 1,
    // borderColor: 'brown',
    color: "black",
  },
  buttonContainer: {
    // borderWidth: 2,
    // borderColor: "purple",
    width: "100%",
    height: "6%",
    marginTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  quickText: {
    // borderWidth: 2,
    // borderColor: "red",
    paddingTop: 10,
    width: "100%",
    textAlign: "center",
    fontSize: "20%",
  },
  button: {
    backgroundColor: '#407BFF',
    width: "100%",
    paddingLeft: "5%",
    height: "100%",
    fontSize: 100,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "white",
  },
  googleButton: {
    width: "60%",
    borderRadius: 10,
    height: "100%",
    // justifyContent: "center",
    padding: 10,
    // borderWidth: 1 
  },
  googleText: {
    fontSize: "15%",
    color: "#898989",
  },
});

