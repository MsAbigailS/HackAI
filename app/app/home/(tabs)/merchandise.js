import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions, TextInput } from 'react-native';
import picture from "../../images/login_picture.png";
import googleIcon from "../../images/google_logo_picture.png";
import { useRouter } from "expo-router";
import { Animated } from 'react-native';
import React, { useState, useEffect, Component} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
// import FadeIn from 'react-native-fade-in-image';

export default function Login() {
  const router = useRouter();

  const teams = [
    {
    item: "Maverick",
    id: "MAV",
    },
    {
    item: "Miami Heat",
    id: "MH",
    },
  ]

  const team = [
    "Maverick",
    "Miami Heat",
  ]
  const maverick = () => router.push("maverickMerch");
  const maimi = () => router.push("home/signup");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merchandise</Text>
      <Text style={{ fontSize: 20, paddingLeft: 10}}>Select Team(s)</Text>
      <SelectDropdown
              data={team}
              onSelect={(selectedItem) => {
                selectedItem == "Maverick" ? maverick() : maimi();
              }}
            />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
  },
  selectContainer: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  header: {
    fontSize: "30%",
    fontWeight: "bold",
    paddingLeft: "2%",
    paddingBottom: "2%",
  },
});

