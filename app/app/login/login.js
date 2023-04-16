import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions, TextInput } from 'react-native';
import picture from "../images/login_picture.png";
import googleIcon from "../images/google_logo_picture.png";
import { useRouter } from "expo-router";
import { Animated } from 'react-native';
import React, { useState, useEffect, Component} from 'react';
// import FadeIn from 'react-native-fade-in-image';

export default function Login() {
  const router = useRouter();

  const login = () => router.push("home")
  const signUp = () => router.push("signup/signup")
  

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
    <View style={styles.container}>
      {/* <FadeInView> */}

      <ImageLoader style={styles.image} source={picture} />

      <Text style={styles.header}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Username' placeholderTextColor="grey"></TextInput>
        <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="grey" secureTextEntry={true}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={login} >Login</Text>
        </Pressable>
      </View>
      <Text style={styles.quickText}>OR</Text>
      <View style={styles.googleContainer}>
        <View style = {styles.smallIconContainer}>
          <Image style={styles.smallIcon} source={googleIcon}/>
        </View>
        <Pressable style={styles.googleButton}>
          <Text style={styles.googleText}>Login with Google</Text>
        </Pressable>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Don't have an account?</Text>
        <Pressable style={styles.signUpButton}>
          <Text style={styles.signUpText} onPress={signUp}>Sign up</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
      {/* </FadeInView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    // padding: 10,
  },
  signUpContainer: {
    // borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: "5%"

  },
  signUpButton: {
    // borderWidth: 2,
    // backgroundColor: "grey",
    borderRadius: 5,
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "blue"
  },
  googleContainer: {
    height: "4%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "green",
    flexDirection: "row",
  },
  smallIconContainer: {
    // backgroundColor: "purple",
    width: "30%",
    marginLeft: "5%",
    paddingLeft: "20%",
    paddingRight: "10%"
    // alignItems: "right",
    // textAlign: "right"
  },
  smallIcon: {
    // borderWidth: 2,
    width: 30,
    height: 30,
  },
  header: {
    fontSize: "50%",
    fontWeight: "bold",
    paddingLeft: "2%",
    paddingBottom: "2%"
  },
  image: {
    height: "45%",
    width: "100%",
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
