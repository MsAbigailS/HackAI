import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { CountDownText } from 'react-native-countdown-timer-text';
import { Alert} from 'react-native';
import waiting_page_hero_image from '../images/confirmation_page_image.jpeg'
import { API_URL } from '../home/(tabs)/secrets';

export default function waitingPage() {

    const router = useRouter();

    const homepage = () => router.push("home")

    const [bettingPrompt, setBettingPrompt] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/getCurrentBet`, {
            method: 'GET',
        }).then((response) => response.json())
        .then((json) => {
            setBettingPrompt(json.bet);
        })
        .catch((error) => {
            console.error(error);
        });
    });
    
    return (
        <View style={styles.container}>
            <View>
                <Image source = {waiting_page_hero_image} style={styles.hero_image}/>
            </View>
            <View style = {styles.title_container}>
                <Text style = {styles.title_text}>Congratulations!</Text>
                <Text style = {styles.subHeader}>You've successfully placed your bet.</Text>
            </View>
            
            <View style = {styles.result_wait_container}>
                <Text style = {styles.sub_title_text}>The results for:</Text>
                <Text style = {styles.bet_prompt}>{bettingPrompt}</Text>
                <Text style = {styles.sub_title_text2}>Will be released shortly!</Text>
            </View>
            
            <Pressable onPress = {homepage} style = {styles.btn_active}>
                <Text style = {styles.btn_text}>Home</Text>
            </Pressable>
            <Text>or</Text>
            <Pressable style = {styles.btn_active}>
                <Text style = {styles.btn_text}>Redeem Points</Text>
            </Pressable>
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
        fontSize: "18%",
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
    
   
  
  });