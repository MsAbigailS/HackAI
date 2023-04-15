import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import CountDown from 'react-native-countdown-component';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../../images/miami_heat_team_logo.png';
import bettingImage from '../../images/betting_image.svg';
import betting_top_image_1 from '../../images/mavs_betting_image_1.jpg';
import betting_top_image_2 from '../../images/mavs_betting_image_2.jpg';
import betting_top_image_3 from '../../images/mavs_betting_image_3.jpg';
import { Alert} from 'react-native';

export default function Betting() {

    const router = useRouter();

    const teamNames = [ "Dallas Mavericks",
                        "Miami Heat"]

    const matchDates = ["7 Apr 2023",
                        "2 Apr 2023"]

    const matchTimes = ["5:00 PM",
                        "6:30 PM"]

    const userPoints = 500

    var active_btn = {
        backgroundColor: "orange"
    }

    const [betValue, setBetValue] = useState(0)

    const [active, setActive] = useState(false);

    const validateBettingAmount = () => {
        if(betValue > userPoints){
            setBetValue(0);
            Alert.alert('Oops!', 'Betting amount is larger than available points! Please use a smaller betting amount and try again.');
        }
    }

    const handleClick = () => {
        setActive(!active);
    }

    return (
        <View style={styles.container}>
            {/* Hero Image */}
            <View>
                <Image source = {betting_top_image_1} style={styles.hero_image}/>
            </View>

            <View style={styles.prompt_container}>
                <Text style = {styles.prompt}>Will Dwight Powell make the shot?</Text>
            </View>
            <View style = {styles.timer_container}>
                <CountDown
                    until = {100}
                    timeToShow={['M', 'S']}
                />
            </View>

            <Text>Make Your Bet!</Text>

            <View style = {styles.betting_amt_container}>
                <TextInput 
                    style={styles.user_input}
                    keyboardType='number-pad'
                    placeholder='0'
                    placeholderTextColor='#757575'
                    onChangeText={(betValue) => {setBetValue(betValue)}}
                    onSubmitEditing={(betValue) => validateBettingAmount(betValue)}
                    value={betValue}
                    returnKeyType='done'>
                </TextInput>
                <Text>
                    /
                </Text>
                <Text style={styles.user_points_avail}>
                    {userPoints} available points
                </Text>
            </View>


            <View style = {styles.betting_buttons_container}>
                <Pressable
                    onPress = {handleClick}
                    style = {active ? styles.btn_active : styles.btn_inactive}>
                    <Text>Yes</Text>
                </Pressable>
                <Pressable
                    onPress = {handleClick}
                    style = {active ? styles.btn_active : styles.btn_inactive}>
                    <Text>No</Text>
                </Pressable>
            </View>
            <View style = {styles.not_placing_bet_container}>
                <Text>Skip Bet</Text>
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
      alignItems: "center",
    },
    prompt_container: {
        borderWidth: 2,
        borderColor: "red",
        width: "95%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center"
    },
    prompt: {
        borderWidth: 2,
        borderColor: "blue",
        fontSize: "30%"
    },
    timer_container: {
        borderWidth: 1,
        width: "50%"
    },
    not_placing_bet_container: {
        borderWidth: 1,
        borderColor: "orange",
        width: "75%",
        height: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5",
        marginTop: 10
    },
    betting_buttons_container: {
        width: "95%",
        borderWidth: 2,
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
        borderWidth: 1,
        width: "45%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    btn_inactive: {
        backgroundColor: "#d0d9dd",
        margin: 5,
        borderWidth: 1,
        width: "45%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    betting_amt_container:{
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    user_input: {
        borderWidth: 2,
        width: "25%",
        height: 30,
    },
    user_points_avail: {
        borderWidth: 1,
        borderColor: "purple"
    },
    hero_image:{
        width: 800,
        height: 300,
        borderWidth: 3,
        borderColor: "red"
    }
   
  
  });