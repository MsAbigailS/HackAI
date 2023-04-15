import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Stars from 'react-native-stars';
// import mavPicture from "../hackAI/images/dallas_mavericks_team_logo.png";

export default function App() {

  const teamNames = ["Dallas Mavericks",
                      "Miami Heat"]

  const matchDates = ["7 Apr 2023",
                      "2 Apr 2023"]

  const matchTimes = ["5:00PM",
                      "6:30PM"]

  const favTeam = true;

  const val = 0

  return (
    <View style={styles.container}>
      ufihwaeiufhuaiwhfueiwahfiu
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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