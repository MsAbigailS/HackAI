import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../../images/miami_heat_team_logo.png';

export default function Home() {

    const router = useRouter();

    const teamNames = [ "Dallas Mavericks",
                        "Miami Heat"]

    const matchDates = ["7 Apr 2023",
                        "2 Apr 2023"]

    const matchTimes = ["5:00 PM",
                        "6:30 PM"]

    

    return (
        <View style={styles.homepageContainer}>
            <View style={styles.team_container}>
                <Image source = {mavericksTeamImage} style={styles.team_logo}></Image>
                <Text style={styles.team_name}>{teamNames[0]}</Text>
            </View>
            <View style={styles.team_container}>
                <Image source = {miamiHeatImage} style={styles.team_logo}></Image>
                <Text style={styles.team_name}>{teamNames[1]}</Text>
            </View>
            
            <View style={styles.add_team_container}>
                <Pressable>
                    <Text>Add Team +</Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    homepageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    team_container: {
      borderWidth: 2,
      width: "95%",
      height: "10%",
      flexDirection: "row",
      padding: 10,
    //   borderRadius: 5,
    //   shadowRadius: 2,
    //   shadowColor: "#282529",
    //   shadowOffset: "5",
    //   shadowOpacity: "5",
    //   shadowOffsetTop: 10,
      backgroundColor: "white"
      
    },
    team_logo: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderRadius: 50 
    },
    team_name: {
        borderWidth: 2,
        width: "85%",
        fontSize: "20%"
    },
    add_team_container: {
        // backgroundColor: "blue",
        borderWidth: 1
    },
   
  
  });