import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { CountDownText } from 'react-native-countdown-timer-text';
import { Component } from 'react';
import CountDown from 'react-native-countdown-component';
// import { API_URL } from './secrets'
// import ProgressBar from 'react-progress-bar-timer';
import mavericksTeamImage from '../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../images/miami_heat_team_logo.png';
import bettingImage from '../images/betting_image.svg';
import betting_top_image_1 from '../images/mavs_betting_image_1.jpg';
import betting_top_image_2 from '../images/mavs_betting_image_2.jpg';
import betting_top_image_3 from '../images/mavs_betting_image_3.jpg';
import { Alert} from 'react-native';
import { Animated } from 'react-native'
import basketball_gif from '../images/basketball_spin.gif';
// import { Carousel } from 'react-native-auto-carousel'
// import { Dimensions } from 'react-native

export default function Betting() {

    const router = useRouter();
    // const bet_placed = () => router.push("betPlaced/bet_placed")
    // const bet_skipped = () => router.push("betSkipped/bet_skipped")
    const redeemPoints = () => router.push("merchandise")
    const returnHome = () => router.push("home")


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

    const teamNames = [ "Dallas Mavericks",
                        "Miami Heat"]

    const matchDates = ["7 Apr 2023",
                        "2 Apr 2023"]

    const matchTimes = ["5:00 PM",
                        "6:30 PM"]

    // const userPoints = 500
    const [userPoints, setUserPoints] = useState(0)

    const [bettingPrompt, setBettingPrompt] = useState('There is no active bet currently!')


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


    // const placeBet = async () => {
    //     setPlaceBetStatus(!placeBetStatus)
    // }

    const skipBet = () => {
        setSkipBetStatus(!skipBetStatus)
        bet_skipped()
    }

    return (
        <View style={styles.container}>
            {/* Hero Image */}
            {/* <Carousel/> */}
            <View>
                <ImageLoader source = {basketball_gif} style={styles.hero_image}/>
            </View>

            <View style = {styles.timer_container}>
            </View>

            <View>
                <Text style = {styles.headerYes}>You skipped the bet!</Text>
                {/* <Text></Text> */}
            </View>

            <View style={styles.prompt_container}>
                <Text style = {styles.promptText}>The next bet will appear at the start of the next quarter!</Text>
                {/* <Text style = {styles.prompt}>{bettingPrompt}</Text> */}
            </View>

            


            <View style = {styles.betting_buttons_container}>
                <Pressable
                    onPress = {redeemPoints}
                    style = {styles.btn_active}>
                    <Text style = {styles.betting_button_text}>Redeem Points</Text>
                </Pressable>
            </View>

            <Text>OR</Text>
                <Pressable
                    onPress = {returnHome}
                    style = {styles.btn_active2}>
                    <Text style = {styles.betting_button_text}>Return Home</Text>
            </Pressable>
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
    promptText:{
        fontSize: "30%",
        alignItems: "center"
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
        fontSize: "18%",
        // borderWidth: 2,
        width: "100%",
        alignItems: "center",
        textAlign: "center"
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
    headerYes: {
        fontSize: "40%",
        fontWeight: "bold"
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
    btn_active2: {
        backgroundColor: "#0053BC",
        marginTop: 42,
        height: "8%",
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
        width: 300,
        height: 300,
        marginTop: 62
    },
    betting_button_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: "25%"
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