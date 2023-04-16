import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import React, { useState, useEffect, Component} from 'react';
// import FadeIn from 'react-native-fade-in-image';

export default function Login() {
  const router = useRouter();

  const signedUp = () => router.push("home/home")
  

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='First Name' placeholderTextColor="grey"></TextInput>
        <TextInput style={styles.textInput} placeholder='Last Name' placeholderTextColor="grey"></TextInput>
        <TextInput style={styles.textInput} placeholder='Username' placeholderTextColor="grey"></TextInput>
        <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="grey" secureTextEntry={true}></TextInput>
      </View>
      <View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={signedUp}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    // padding: 10,
  },
  header: {
    fontSize: "50%",
    fontWeight: "bold",
    paddingLeft: "2%",
    paddingBottom: "2%"
  },
  inputContainer:{
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "12%",
    alignItems: 'center',
  },
  textInput: {
    fontSize: 15,
    width: "50%",
    height: "45%",
    margin: 5,
    color: "black",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: '#407BFF',
    width: "25%",
    height: "15%",
    paddingLeft: "3%",
    paddingRight: "3%",
    borderRadius: 15,
    justifyContent: "center",
    marginTop: "20%"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  }
});

