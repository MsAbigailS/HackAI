import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert} from 'react-native';
import basketball_gif from '../images/basketball_spin.gif';

export default function BetPlaced() {

    const router = useRouter();
    const homepage = () => router.push("betSkipped/bet_skipped_return")


    onLoad = async () => {
        await wait(3000);
        // alert("AHHHH")
        homepage();
    }

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Bet Skipped!</Text>
            <View style={styles.animation_container}>
                <Image source = {basketball_gif} style = {styles.hero_image}/>
            </View>
        </View>
    )

}

async function wait(milleseconds) {
    await new Promise(resolve => setTimeout(resolve, milleseconds));
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
        // height: "100%",
        justifyContent: "center"
    },
    hero_image: {
        height: 500,
        width: 500,
        // borderWidth: 2
    },
    title: {
        fontSize: 50,
        paddingTop: 150,
        // borderWidth: 2
    }
  });