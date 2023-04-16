import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert} from 'react-native';
import checkmark_gif from '../images/check-mark-verified.gif';

export default function BetPlaced() {

    const router = useRouter();
    const waitingPage = () => router.push("betPlaced/waitingPage")


    onLoad = async () => {
        await wait(2000);
        // alert("AHHHH")
        waitingPage();
    }

    useEffect(() => {
        onLoad();

    }, [])
    
    async function wait(milleseconds) {
        await new Promise(resolve => setTimeout(resolve, milleseconds));
    }
    return (
        <View style={styles.container}>
            <View style={styles.animation_container}>
                <Image source = {checkmark_gif}/>
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
      color: "black",
    //   borderWidth: 2,
      borderColor: "red"
    },
    animation_container: {
        // borderWidth: 2,
        height: "100%",
        justifyContent: "center"
    }
  });