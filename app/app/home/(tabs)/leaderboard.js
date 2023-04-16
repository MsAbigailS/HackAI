import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from './secrets';
import heroImage from '../../images/trophy_gif.gif'

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
            <View style={styles.container}>
                <Image source = {heroImage} style={styles.heroImage}/>
                <View style = {styles.header_contain}>
                    <Text style = {styles.header}>Leaderboard</Text>
                </View>
            <FlatList
                data={leaderboard}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.name}>{item[0]}</Text>
                    <Text style={styles.score}>{item[1]}</Text>
                </View>
                )}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header:{
    fontSize: "50%",
    fontWeight: "bold",
    // borderWidth:2,
  },
  header_contain: {
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 2
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
    color: '#555',
  },
  heroImage: {
    height: "50%",
    width: "85%",
    marginLeft: 30
  }
});

