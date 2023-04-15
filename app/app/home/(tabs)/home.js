import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {

    const router = useRouter();

    const firstName = "John";
    const lastName = "Doe";
    const medName = "Ritalin";
    const medLongName = "Methylphenidate";
    const days = "Tomorrow";
    const time = "9:00";
    const timeSection = "AM"; 

    const report = () => router.push("home/drugInfo/info")
    const prescriptionPage = () => router.push("home/prescriptions")

    

    return (
        <View>
            <Text>
                fiueroajfioewa
                </Text>
        </View>
    )

}