import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

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
        marginTop: 50,
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
        fontSize: 100,
        fontWeight: "bold",
    },
    description: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: -20,
        color: "tomato",
    },
    loading: {
        fontSize: 20,
        marginBottom: 10,
    },
    subDescription: {
        fontSize: 20,
        fontWeight: "bold",
    },
    icon: {
        marginTop: 50,
        fontSize: 120,
        color: "tomato",
    },
});

const WEATHER_ICON = {
    Thunderstorm: "lightnings",
    Drizzle: "day-rain",
    Rain: "rains",
    Snow: "snows",
    Atmosphere: "cloudy-gusts",
    Clear: "day-sunny",
    Clouds: "cloudy",
};

const API_KEY = "476871574759c85c661f9c6f56a5e0b7";

export default function App() {
    const [city, setCity] = useState("Loading...");
    const [forecast, setForecast] = useState([]);

    async function getPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return false;
        return true;
    }

    async function getLocation() {
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });

        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );

        setCity(location[0].city);
        getWeather(latitude, longitude);
    }

    async function getWeather(latitude, longitude) {
        let weathers = [];
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        const json = await res.json();
        let cnt = 0;

        if (json.list && forecast.length === 0) {
            weathers.push({
                temp: json.list[0].main.temp,
                weather: json.list[0].weather[0].main,
                description: json.list[0].weather[0].description,
                date: json.list[0].dt_txt,
            });

            for (var weather of json.list.slice(1)) {
                if (
                    !weather.dt_txt
                        .split(" ")[0]
                        .includes(weathers.at(-1).date.split(" ")[0]) &&
                    weather.dt_txt.split(" ")[1] === "00:00:00"
                ) {
                    weathers.push({
                        temp: weather.main.temp,
                        weather: weather.weather[0].main,
                        description: weather.weather[0].description,
                        date: weather.dt_txt,
                    });
                }
            }

            setForecast(weathers);
        }
    }

    useEffect(() => {
        if (getPermission()) {
            getLocation();
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.weather}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                {forecast.length !== 0 ? (
                    forecast.map((weather, index) => (
                        <View key={index} style={styles.day}>
                            <Text style={styles.temperature}>
                                {parseFloat(weather.temp).toFixed(1)}°C
                            </Text>
                            <Text style={styles.description}>
                                {weather.weather}
                            </Text>
                            <Text style={styles.subDescription}>
                                {weather.description}
                            </Text>
                            <Text style={styles.subDescription}>
                                {weather.date.split(" ")[0]}
                            </Text>
                            <Fontisto
                                style={styles.icon}
                                name={WEATHER_ICON[weather.weather]}
                                size={24}
                            />
                        </View>
                    ))
                ) : (
                    <View style={styles.day}>
                        <Text style={styles.loading}>Loading</Text>
                        <ActivityIndicator size="large" />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
