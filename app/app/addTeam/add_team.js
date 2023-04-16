import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import hero_image from '../images/add_team_hero_image.jpg'

export default function AddTeam() {

    const router = useRouter();
    const homepage = () => router.push("home")
    const [select, setSelected] = useState('')
    const teamList = [
        {'id': 1, 'name': 'Boston Celtics'},
        {'id': 2, 'name': 'Brooklyn Nets'},
        {'id': 3, 'name': 'New York Knicks'}
    ]

    onLoad = async () => {
        // await wait(20);
        // alert("AHHHH")
        // homepage();
    }

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <View style={styles.container}>
            <Image source = {hero_image} style = {styles.hero_image}/>

            <Pressable onPress = {homepage}>
                <Text>
                    home
                </Text>
            </Pressable>
            <SearchableDropdown
                onTextChange = {(text) => setAnswer('yes')}
                onItemSelect = {(item) => {
                    setSelected(item['name'])
                    // alert(select)
                }}
                resetValue = {false}
                items = {teamList}
                textInputStyle = {{
                    borderWidth: 2,
                    width: 325,
                    marginTop: 10,
                }}
                itemStyle={{
                    borderWidth: 2
                }}
                itemsContainerStyle={{
                    maxHeight: 200
                }}
                defaultIndex={0}
                chip={true}
                textInputProps = {
                    placeholder = "search teams"
                }
                // selectedItems={select}
            />
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
    hero_image: {
        height: "35%",
    }
  });