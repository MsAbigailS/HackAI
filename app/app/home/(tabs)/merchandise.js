import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import { Animated } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Select from "react-select";

// import FadeIn from 'react-native-fade-in-image';

export default function merchandise() {
  const router = useRouter();

  const item_page = () => router.push('merchandisePage/item1_page')

  const [value, setState] = useState('0');
  const [value2, setState2] = useState('0');
  const [value3, setState3] = useState('0');

  const [imageSelected, setImageSelect] = useState(false);
  const images = [
    { image1: require("../../images/mavHat.jpg") },
    { image2: require("../../images/mavShirt.jpg") },
    { image3: require("../../images/mavJersey.jpg") },
    { image4: require("../../images/mavShirt.jpg") },
    { image5: require("../../images/mavJersey.jpg") }
  ];

  const IMAGES = [
    {
      label: "hat",
      points: 20,
      count: 0
    },
    {
      label: "shirt",
      points: 50,
      count: 0
    },
    {
      label: "jersey",
      points: 100,
      count: 0
    },
  ]

  selectImage = () => {
    setImageSelect(!imageSelected);
  }

  const getTotalPoints = () => {
    if (value.length == 0) {
      return parseInt(IMAGES[1].count) * IMAGES[1].points + parseInt(IMAGES[2].count) * IMAGES[2].points;
    }
    else if (value2.length == 0) {
      return parseInt(IMAGES[0].count) * IMAGES[0].points + parseInt(IMAGES[2].count) * IMAGES[2].points;
    }
    else if (value3.length == 0) {
      return parseInt(IMAGES[0].count) * IMAGES[0].points + parseInt(IMAGES[1].count) * IMAGES[1].points;
    }
    else {
      return parseInt(IMAGES[0].count) * IMAGES[0].points + parseInt(IMAGES[1].count) * IMAGES[1].points +
        parseInt(IMAGES[2].count) * IMAGES[2].points;
    }
  }

  const updateCount = (num, value) => {
    IMAGES[num].count = value;
    return IMAGES[num].count;
  }

  const checkValidCheckout = () => {
    // need to check that the points total doesn't exceed the amount of points that user has
    alert("Congrats! Redeeming is Done")
    setState(0)
    setState2(0)
    setState3(0)
  }

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView>
      <View>
        <Text style={styles.header}>Merchandise</Text>
      </View>

      <View style={styles.listView}>
        {/* <FadeInView> */}
        <View>
          <Image style={styles.image} source={require("../../images/mavHat.jpg")} />
          <Text style={styles.points}>{IMAGES[0].points} points</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("../../images/mavShirt.jpg")} />
          <Text style={styles.points}>{IMAGES[1].points} points</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("../../images/mavJersey.jpg")} />
          <Text style={styles.points}>{IMAGES[2].points} points</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("../../images/mavShirt.jpg")} />
          <Text style={styles.points}>{IMAGES[1].points} points</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("../../images/mavJersey.jpg")} />
          <Text style={styles.points}>{IMAGES[2].points} points</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("../../images/mavJersey.jpg")} />
          <Text style={styles.points}>{IMAGES[2].points} points</Text>
        </View>
        
      </View>

      <View style={styles.checkout_container}>
        <View>
          <Text style={styles.checkoutHeader}>Checkout</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileInputContainer}>Hat: </Text>
          <TextInput style={styles.profileInput}
            onChangeText={newValue => setState(newValue)}
          >{updateCount(0, value)}</TextInput>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileInputContainer}>Shirt: </Text>
          <TextInput style={styles.profileInput}
            onChangeText={newValue => setState2(newValue)}
          >{updateCount(1, value2)}</TextInput>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileInputContainer}>Jersey: </Text>
          <TextInput style={styles.profileInput}
            onChangeText={newValue => setState3(newValue)}
          >{updateCount(2, value3)}</TextInput>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileInputContainer}>Total points: </Text>
          <Text style={styles.profileInput}>{getTotalPoints()}</Text>
        </View>

        <View style={styles.selectOption}>
          <SelectDropdown
              data={["delivery", "pick-up"]}
              defaultButtonText="Delivery Options"
              onSelect={(selectedItem) => {
                console.log(selectedItem)
              }}/>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={() => router.push("home/merchandise")}>Go Back</Text>
        </Pressable> */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={() => item_page()}>Redeem</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    //borderWidth: 2,
    borderBottomWidth: 3,
    borderRadius: 10
  },
  checkout_container:{
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: "flex"
    // padding: 10,
  },
  header: {
    fontSize: "50%",
    fontWeight: "bold",
    paddingLeft: "2%",
    paddingBottom: "2%",
    alignSelf: "center",
    marginTop: 25
  },
  image: {
    //backgroundColor: 'red',
    //width: (Dimensions.get('window').width / 3) - 15,
    //height: 300,
    width: 50,
    height: 50,
    marginTop: 10,
    resizeMode: "contain"
  },
  points: {
    alignSelf: "center",
    marginBottom: 10
  },
  inputContainer: {
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "12%"
  },
  textInput: {
    fontSize: 30,
    width: "100%",
    height: "45%",
    margin: 5,
    color: "black",
  },
  buttonContainer: {
    //alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    backgroundColor: '#407BFF',
    width: 100,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    marginTop: "5%",
    marginLeft: 10
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  profileInfo: {
    flexDirection: "row",
    marginTop: 10,
  },
  selectOption: {
    marginTop: 10,
    width: "auto"
  },
  profileInputContainer: {
    fontSize: "20%",
    // margin: 10,
    // padding: "2%",
    marginLeft: 10,
    borderRadius: 10,
    width: "20%"
  },
  profileInput: {
    fontSize: "21%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    width: "20%",
    height: "100%",
    paddingLeft: "1%",
    paddingRight: "1%",
  },
  checkoutHeader: {
    fontSize: "30%",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: "2%",
    paddingRight: "2%"
  },
});
