import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image } from 'react-native';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';

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
                <Text>{teamNames[0]}</Text>
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
      height: "5%",
      flexDirection: "row"
    },
    team_logo: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderRadius: 50 
    },
   
  
  });