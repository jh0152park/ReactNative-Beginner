import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "teal" }}></View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "orange",
                    flexDirection: "row",
                }}
            >
                <View style={{ flex: 1, backgroundColor: "blue" }}></View>
                <View style={{ flex: 1, backgroundColor: "black" }}></View>
            </View>
            <View style={{ flex: 1, backgroundColor: "pink" }}></View>
        </View>
    );
}
