//  LOGIN PAGE

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {

const router = useRouter();

const homepage = () => router.push("home")
const signuppage = () => router.push("signup")
const betting = () => router.push("betting")

  return (
    <View style={styles.container}>
      <Text onPress={homepage}>click me</Text>
      {/* <Text onPress={betting}>click me - betting</Text> */}
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