import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height: DISPLAY_HEIGHT, width: DISPLAY_WIDTH } =
    Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
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
        // flex: 4,
        // backgroundColor: "green",
    },

    day: {
        // flex: 1,
        width: DISPLAY_WIDTH,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    temperature: {
        // marginTop: 50,
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
            <ScrollView
                contentContainerStyle={styles.weather}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temperature}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
            </ScrollView>
        </View>
    );
}
