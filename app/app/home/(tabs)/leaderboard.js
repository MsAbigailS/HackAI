import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from './secrets';

export default function Leaderboard () {

    const [loaded, setLoaded] = useState(false)
    const [leaderboard, setLeaderboard] = useState(null)
    const [currentRank, setCurrentRank] = useState(null)

    useEffect(() => {
        console.log("Hey hows i toging bob")
        fetch(`${API_URL}/getLeaderboard`, {
            method: 'GET'
        }).then((response) => response.json())
        .then((json) => {
            setLeaderboard(json)
            console.log(json)
        });
        print(leaderboard);
        const formData = new FormData();
        formData.append('player', 'DemoPlayer');
        fetch(`${API_URL}/getUserLeaderboard`, {
            body: formData,
            method: 'POST'
        }).then((response) => response.json())
        .then((json) => {
            setCurrentRank(json)
            console.log(json)
        });
        print(currentRank)
        setLoaded(true)  
    }, [])

    if (loaded == false) {
        return (
            <View>
                <Text>One Moment While we load your data</Text>
            </View>
        )
    }

    else {
        return (
            <View style="container">
                <Text></Text>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
})
