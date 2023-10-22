import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "skyblue",
    },

    city: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    cityName: {
        // color: "white",
        fontSize: 50,
        fontWeight: "bold",
    },

    weather: {
        flex: 4,
    },

    day: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    temperature: {
        marginTop: 20,
        fontSize: 150,
        fontWeight: "bold",
    },
    description: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: -40,
    },
});

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>Seoul</Text>
            </View>
            <View style={styles.weather}>
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
            </View>
        </View>
    );
}
