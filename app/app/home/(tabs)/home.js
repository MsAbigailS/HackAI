import { useRouter } from 'expo-router';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../../images/miami_heat_team_logo.png';
import profile_picture from '../../images/profile_picture.png'
import heroImage from '../../images/basketball_hero_image.jpg'
import bearImage from '../../images/memphis_grizzlies_team_logo.png'
import { API_URL } from './secrets';
import { Animated } from 'react-native'

export default function Home() {

    const router = useRouter();
    const addTeam = () => router.push("addTeam/add_team")
    const merch = () => router.push("merchandise")

    const teamNames = [ "Dallas Mavericks",
                        "Miami Heat",
                        "Memphis Grizzlies"
                    ]

    const matchDates = ["7 Apr 2023",
                        "2 Apr 2023",
                        "16 Apr"    
                    ]

    const matchTimes = ["5:00 PM",
                        "6:30 PM",
                        "2:00 PM"
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

    const [userPoints, setUserPoints] = useState(0);
    const [userName, setUserName] = useState("John Doe");

    useEffect(() => {
        const formData = new FormData();
        formData.append('player', 'DemoPlayer');
        fetch(API_URL + '/getCurrentPoints', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            setUserPoints(parseInt(data));
        }).catch((error) => {
            console.error('Error:', error);
        });
    });

    return (
        <View style={styles.homepageContainer}>
            <View style={styles.overlay_images}>
                <ImageLoader source = {heroImage} style={styles.hero_image}/>
                <ImageLoader source = {profile_picture} style={styles.profile_picture}/>
            </View>

            <View style={styles.hello_prompt}>
                <View style={styles.hello_title}>
                    <Text style={styles.header1}>Welcome back,</Text>
                </View>
                <View style = {styles.hello_username}>
                    <Text style={styles.header2}>{userName}</Text>
                </View>
                <View style = {styles.hello_userpoints}>
                    <Text style={styles.header3}>{userPoints} Points</Text>
                </View>
                
                
            </View>
            
            <View>
                
            </View>
            <Text style={styles.subhead}>Your favorite team</Text>
            <View style={styles.team_container}>
                <View style={styles.team_container_top}>
                    <Image source = {mavericksTeamImage} style={styles.team_logo}></Image>
                    <View style={styles.score_container}>
                        <Text style={styles.team_name}>{teamNames[0]}</Text>
                        <Text style={styles.score_text_container}>117-138 vs. Spurs Apr 9</Text>
                    </View>
                    <Pressable onPress = {merch} style={styles.button}>
                        <Text style={styles.buttonText}>Redeem</Text>
                        <Text style={styles.buttonText}> Points</Text>
                    </Pressable>
                </View>
            </View>

            <Text style={styles.subhead2}>Your additional teams</Text>
            <View style={styles.team_container}>
                <View style={styles.team_container_top}>
                    <Image source = {miamiHeatImage} style={styles.team_logo}></Image>
                    <View style={styles.score_container}>
                        <Text style={styles.team_name}>{teamNames[1]}</Text>
                        <Text style={styles.score_text_container}>vs. Bucks Apr 14, 4:30 PM CDT</Text>
                    </View>
                    <View style={styles.two_button_container}>
                        <Pressable onPress={merch} style={styles.button3}>
                            <Text style={styles.buttonText}>Redeem</Text>
                            <Text style={styles.buttonText}> Points</Text>
                        </Pressable>
                        <Pressable style={styles.button2}>
                            <Text style={styles.buttonText2}>Purchase Tickets</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.team_container}>
                <View style={styles.team_container_top}>
                    <Image source = {bearImage} style={styles.team_logo}></Image>
                    <View style={styles.score_container}>
                        <Text style={styles.team_name}>{teamNames[2]}</Text>
                        <Text style={styles.score_text_container}>vs. Los Angeles Lakers {matchDates[2]}, {matchTimes[2]} CDT</Text>
                    </View>
                    <View style={styles.two_button_container}>
                        <Pressable onPress={merch} style={styles.button3}>
                            <Text style={styles.buttonText}>Redeem</Text>
                            <Text style={styles.buttonText}> Points</Text>
                        </Pressable>
                        <Pressable style={styles.button2}>
                            <Text style={styles.buttonText2}>Purchase Tickets</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            
            <View style={styles.add_team_container}>
                <Pressable onPress = {addTeam} style = {styles.add_button}>
                    <Text>Add Team +</Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    homepageContainer: {
      flex: 1,
      backgroundColor: '#fffff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    two_button_container: {
        // borderWidth: 3,
        // borderColor: "orange"
    },
    header1: {
        // borderWidth: 2,
        fontSize: "25%",
        paddingTop: 15
    },
    header2: {
        fontSize: "45%"
    },
    subhead: {
        fontSize: "20%",
        // borderTopWidth: 2,
        width: "100%",
        paddingLeft: 5,
        marginTop: 10
    },
    subhead2: {
        fontSize: "20%",
        // borderWidth: 2,
        width: "100%",
        paddingLeft: 5,
        marginTop: 50,
        // borderTopWidth: 2
    },
    buttonText2:{
        color: "#407BFF",
        fontWeight: "bold"
    },
    buttonText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    header3: {
        fontSize: "25%",
        paddingTop: 5
    },
    hello_title: {
        // borderWidth: 1,
        alignItems: "center",
        width: "100%",
        // height: "20%",
    },
    hello_username: {
        // borderWidth: 1,
        alignItems: "center",
        width: "100%"
    },
    hello_userpoints: {
        borderBottomWidth: 1,
        paddingBottom: 15,
        alignItems: "center",
        width: "100%"
    },
    team_container: {
      borderWidth: 2,
      width: "95%",
      height: "10%",
    //   flexDirection: "row",
      padding: 10,
      marginTop: 10,
      borderRadius: 7,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      
    },
    score_text_container:{
        paddingLeft: 17
    },
    team_container_top:{
        flexDirection: "row",
        alignItems: "center"
    },
    score_container: {
        // borderWidth: 2,
        width: "61%"
    },
    team_container2: {
        borderWidth: 2,
        width: "95%",
        height: "10%",
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        borderRadius: 7,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        
      },
    team_logo: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderRadius: 50 
    },
    team_name: {
        // borderWidth: 2,
        marginLeft: 15,
        // width: "53%",
        fontSize: "30%"
    },
    add_team_container: {
        // backgroundColor: "blue",
        // borderWidth: 1,
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    profile_picture: {
        position: "absolute",
        borderRadius: 100,
        borderWidth: 3,
        height: 175,
        width: 175,
        top: 50,
        left: 160
    },
    overlay_images:{
        position: "relative",
        top: 0,
        left: 0,
        borderWidth: 2,
        height: "30%"
    },
    hero_image:{
        // position: "absolute",
        position: "relative",
        width: 500,
        height: "100%",
        // borderWidth: 2,
        // borderColor: "red"
    },
    hello_prompt: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "100%"
    },
    button: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "28%",
        marginLeft: 0,
        marginRight: 6,
        borderRadius: 3,
        height: "98%",
        // backgroundColor: "#0053bc",
        // color: "white",
        backgroundColor: "#407BFF"
    },
    button2: {
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        height: "30%",
        marginTop: 6,
        // color: "blue"
        
    },
    button3: {
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        height: "65%",
        marginTop: 2,
        backgroundColor: "#407BFF",
    },
    add_button: {
        width: "25%",
        // height: "15%",
        borderWidth: 2,
        borderRadius: 4,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    }
   
  
  });