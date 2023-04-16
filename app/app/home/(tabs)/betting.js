import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { CountDownText } from 'react-native-countdown-timer-text';
import { Component } from 'react';
import CountDown from 'react-native-countdown-component';
// import ProgressBar from 'react-progress-bar-timer';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../../images/miami_heat_team_logo.png';
import bettingImage from '../../images/betting_image.svg';
import betting_top_image_1 from '../../images/mavs_betting_image_1.jpg';
import betting_top_image_2 from '../../images/mavs_betting_image_2.jpg';
import betting_top_image_3 from '../../images/mavs_betting_image_3.jpg';
import { Alert} from 'react-native';

export default function Betting() {

    const router = useRouter();
    // const bet_placed = () => router.push("betPlaced/bet_placed")
    const bet_skipped = () => router.push("betSkipped/bet_skipped")

    bet_placed = () => {
        if(active !== false || active2 !== false){
            if(betValue > 0){
                router.push("betPlaced/bet_placed")
            } else {
                Alert.alert('Bets must be greater than 0 points', 'Please enter a number greater than 0 for your bid')
            }
        } else {
            Alert.alert('You haven\'t placed a bet!', 'Select \'Yes\' or \'No\'')
        }
    }
    

    const teamNames = [ "Dallas Mavericks",
                        "Miami Heat"]

    const matchDates = ["7 Apr 2023",
                        "2 Apr 2023"]

    const matchTimes = ["5:00 PM",
                        "6:30 PM"]

    // const userPoints = 500
    const [userPoints, setUserPoints] = useState(500)

    const bettingPrompt = "Will Dwight Powell make the shot xoxo?"


    const [betValue, setBetValue] = useState(0)

    const [active, setActive] = useState(true);
    const [active2, setActive2] = useState(false);

    const validateBettingAmount = () => {
        if(betValue > userPoints){
            setBetValue(0);
            Alert.alert('Oops!', 'Betting amount is larger than available points! Please use a smaller betting amount and try again.');
        }
    }
    

    const maxTime_seconds = 120
    var remaining_time_seconds = 45
    const [status, setStatus] = useState(0.75);
    const [placeBetStatus, setPlaceBetStatus] = useState(false)
    const [skipBetStatus, setSkipBetStatus] = useState(false)

    const handleClick = () => {
        setActive(!active);
        setActive2(false)
    }

    const otherClick = () => {
        setActive2(!active2);
        setActive(false)
    }

    const placeBet = () => {
        setPlaceBetStatus(!placeBetStatus)
    }

    const skipBet = () => {
        setSkipBetStatus(!skipBetStatus)
        bet_skipped()
    }


    return (
        <View style={styles.container}>
            {/* Hero Image */}
            <View>
                <Image source = {betting_top_image_2} style={styles.hero_image}/>
            </View>

            <View style = {styles.timer_container}>
                <ProgressBarExample duration={30000} tickRate={60} />
            </View>

            <View style={styles.prompt_container}>
                <Text style = {styles.prompt}>{bettingPrompt}</Text>
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
                    returnKeyType='done'
                    textAlign={'center'}
                    fontSize={'50'}>
                </TextInput>
                <Text style={styles.user_points_avail}>
                    of {userPoints} available points
                </Text>
            </View>


            <View style = {styles.betting_buttons_container}>
                <Pressable
                    onPress = {handleClick}
                    style = {active ? styles.btn_active : styles.btn_inactive}>
                    <Text style = {active ? styles.betting_button_text : styles.betting_button_text_false}>Yes</Text>
                </Pressable>
                <Pressable
                    onPress = {otherClick}
                    style = {active2 ? styles.btn_active : styles.btn_inactive}>
                    <Text style = {active2 ? styles.betting_button_text : styles.betting_button_text_false}>No</Text>
                </Pressable>
            </View>

            <Pressable
                    onPress = {bet_placed}
                    style = {placeBetStatus ? styles.place_bet_button_inactive : styles.place_bet_button_active}>
                    <Text style={styles.place_bet_text}>Place Bet</Text>
            </Pressable>

            <Text>or</Text>

            <View style = {styles.not_placing_bet_container}>
                <Pressable
                        onPress = {bet_skipped}
                        style = {skipBetStatus ? styles.skip_bet_button_active : styles.skip_bet_button_inactive}>
                        <Text style={styles.place_bet_text}>Skip Bet</Text>
                </Pressable>
            </View>
        </View>
    )

}

class ProgressBarExample extends Component {
  state = {
    progress: 1,
  };

  componentDidMount() {
    const { duration = 10000, tickRate = 1000 } = this.props;
    const intervalDuration = tickRate;
    this.interval = setInterval(() => {
      this.setState((state) => ({
        progress: state.progress - (tickRate / duration),
      }));
    }, intervalDuration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { progress } = this.state;
    const { color, style } = this.props;
    return (
      <View>
        <ProgressBar progress={progress} color={color} style={style} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
      alignContent: "center",
    },
    prompt_container: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "rgba(2, 0, 15, 0.10)",
        width: "95%",
        height: "13%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: 11,

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
        width: "90%",
        height: 20,
        // alignItems: "center", // DO NOT USE IT GO CRAZY
        justifyContent: "center",
        paddingLeft: 12,
        paddingTop: 5
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
        height: "50%",
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