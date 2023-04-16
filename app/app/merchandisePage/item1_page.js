import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
// import { CountDownText } from 'react-native-countdown-timer-text';
import { Alert} from 'react-native';
import waiting_page_hero_image from '../images/confirmation_page_image.jpeg'
import prodImage from "../images/mavHat.jpg"

export default function waitingPage() {

    const router = useRouter();

    const homepage = () => router.push("home")
    const redeemed = () => router.push("merchandisePage/successful_redeem")
    const cart = () => router.push("merchandisePage/put_in_cart")

    async function purchase() {

        // Buying An Item POST /buyItem has a form: player = player itemAmount = itemAmount
        const formData = new FormData();
        formData.append('player', 'DemoPlayer');
        formData.append('itemAmount', 20);
        const response = await fetch('http://localhost:3000/buyItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        }).then(response => response.text())
        .then(data => { console.log(data); })
        .catch((error) => {
            console.error('Error:', error);
        });



        redeemed();
    }

    return (
        <View style={styles.container}>
            <View style={{alignSelf: "left"}}>
            <Pressable style = {styles.button3} onPress = {() => router.push("home/merchandise")}>
                <Text>Back</Text>
            </Pressable>
            </View>
            <Text>Dallas Mavericks New Era 2022 Fairway Golf Tee Green Snapback</Text>
            <Image style = {styles.productImage} source = {prodImage}/>
            <Text style={styles.pointText}>20 Points Required</Text>
            <View>
                <Text style={styles.buttonTopic}>Size</Text>
                    <SelectDropdown style={styles.selectOption}
                        data={["XS", "S", "M", "L", "XL"]}
                        defaultButtonText="M"
                        onSelect={(selectedItem) => {
                            console.log(selectedItem)
                        }}/>
                <Text style={styles.buttonTopic}>Color</Text>
                    <SelectDropdown style={styles.selectOption}
                        data={["Green", "Blue", "Grey"]}
                        defaultButtonText="Green"
                        onSelect={(selectedItem) => {
                            console.log(selectedItem)
                        }}/>
            </View>

            <View>
                <Pressable onPress = {cart} style={styles.button}>
                    <Text>ADD TO CART</Text>
                </Pressable>
                <Pressable onPress = {purchase} style={styles.button}>
                    <Text>REDEEM NOW</Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
      alignContent: "center",
    },
    backButtonContainer: {
        width: "20%",
        marginTop: 20,
        backgroundColor: "#D3D3D3"
    },
    backButton:{
        color: "black",
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#D3D3D3"
    },
    pointText: {
        fontSize: 25
    },
    buttonTopic: {
        fontSize: 20
    },
    button:{
        borderWidth:1,
        borderColor: "blue",
        width: 250,
        marginTop: 20,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    button2:{
        borderWidth:1,
        borderColor: "blue",
        width: 50,
        marginTop: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    button3:{
        borderWidth:1,
        borderColor: "blue",
        width: 55,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 10,
        paddingLeft: "2%",
        paddingRight: "2%",
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    productImage: {
        borderWidth: 1,
        marginTop: 20,
        height: 250,
        width: 250,
        resizeMode: "contain"
        // padding: 50
    },
    btn_text: {
        color: "white",
        fontSize: "22%",
        fontWeight: "bold"
    },
    title_container: {
        borderBottomWidth: 1,
        marginBottom: 12,
        height: "9%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    sub_title_text: {
        fontSize: "20%",
        fontWeight: "bold"
    },
    sub_title_text2: {
        fontSize: "20%",
        // fontWeight: "semi bold"
    },
    title_text: {
        fontSize: "40%",
        fontWeight: "bold"
    },
    subHeader: {
        fontSize: "20%"
    },
    result_wait_container: {
        // borderWidth: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    prompt_container: {
        // borderWidth: 2,
        borderRadius: 5,
        borderColor: "rgba(2, 0, 15, 0.10)",
        width: "95%",
        height: "13%",
        justifyContent: "center",
        alignItems: "center",
        // alignContent: "center",
        marginTop: 11,
    },
    bet_prompt: {
        width: "90%",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "rgba(2, 0, 15, 0.10)",
        fontSize: "30%",
        padding: 10
    },
    prompt: {
        // borderWidth: 2,
        borderColor: "blue",
        fontSize: "30%",
        // borderWidth: 2,
        width: "100%",
        alignItems: "center"
    },
    timer_container: {
        // borderWidth: 1,
        width: "90%",
        height: 52,
        // alignItems: "center", // DO NOT USE IT GO CRAZY
        justifyContent: "center",
        paddingLeft: 12,
        paddingTop: 20
    },
    not_placing_bet_container: {
        // borderWidth: 1,
        borderColor: "orange",
        width: "100%",
        height: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5",
        marginTop: 10
    },
    betting_buttons_container: {
        width: "95%",
        height: "15%",
        // borderWidth: 2,
        alignItems: "center",
        borderColor: "purple",
        flexDirection: "row",
        color: "white",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    btn_active: {
        backgroundColor: "#0053BC",
        margin: 5,
        height: "5%",
        color: "white",
        // borderWidth: 1,
        borderRadius: 5,
        width: "45%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    btn_inactive: {
        backgroundColor: "rgba(0, 82, 189, 0.10)",
        margin: 5,
        // borderWidth: 1,
        borderRadius: 5,
        height: "50%",
        width: "45%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    betting_amt_container:{
        width: "95%",
        // flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "9%",
        // borderWidth: 1,
        borderColor: "orange"
    },
    user_input: {
        // borderWidth: 1,
        width: "75%",
        height: "80%",
        borderColor: "blue"
    },
    user_points_avail: {
        // borderWidth: 1,
        borderColor: "purple"
    },
    hero_image:{
        width: 800,
        height: 300,
    },
    betting_button_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: "45%"
    },
    betting_button_text_false: {
        color: "#b8b8b8",
        fontWeight: "bold",
        fontSize: "45%"
    },
    progress_bar: {
        height: "50%",
        width: "95%",
        // borderWidth: 1,
        borderColor: "grey",
        borderRadius: 3
    },
    time_text_container: {
        alignItems: "center"
    },
    place_bet_button_active: {
        // borderWidth: 1,
        width: "90%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0053BC",
        borderRadius: 7,
        marginBottom: 8
    },
    place_bet_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    skip_bet_button_active: {
        // borderWidth: 1,
        width: "90%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#002b5c",
        borderRadius: 7,
        // marginTop: 5
    },
    place_bet_button_inactive: {
        // borderWidth: 1,
        width: "90%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#002b5c",
        borderRadius: 7,
        marginBottom: 8
    },
    skip_bet_button_inactive: {
        // borderWidth: 1,
        width: "90%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0053BC",
        borderRadius: 7,
        // marginTop: 5
    },
    selectOption: {
      //marginTop: 10,
      width: "auto"
    },
  });