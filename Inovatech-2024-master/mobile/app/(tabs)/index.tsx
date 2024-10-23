import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { FAB, Modal } from "react-native-paper";
import theme from "../../assets/theme";

export default function Index() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const [visible, setVisible] = useState(false)
    const mapRef = useRef<MapView>(null);

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status === "granted";
    };

    const getUserLocation = async () => {
        return await Location.getCurrentPositionAsync({});
    };

    const fetchLocation = async () => {
        try {
            const hasPermission = await requestLocationPermission();

            if (!hasPermission) {
                setLocationPermissionDenied(true);
                return;
            }

            const userLocation = await getUserLocation();
            setLocation(userLocation);
            setLocationPermissionDenied(false);
        } finally {
            setLoading(false);
        }
    };

    const centerUserLocation = () => {
        if (location && mapRef.current) {
            mapRef.current.animateCamera({
                center: location.coords,
            });
        }
    };

    useEffect(() => {
        fetchLocation();
        Location.watchPositionAsync(
            {
                accuracy: Location.LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (res) => {
                setLocation(res);

                mapRef.current?.animateCamera({
                    center: res.coords,
                });
            });
    }, []);

    return (
        <View style={styles.container}>
            {locationPermissionDenied ? (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        Precisamos da sua permissão para acessar a localização.
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={fetchLocation}>
                        <Text style={styles.buttonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {location ? (
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002,
                            }}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsMyLocationButton={false}
                            showsCompass={false}
                        />
                    ) : (
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: -3.10719,
                                longitude: -60.0261,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002
                            }} />
                    )}
                    <FAB
                        icon="crosshairs-gps"
                        style={styles.fab}
                        onPress={centerUserLocation}
                        color="white"
                    />
                    <FAB
                        icon="alert"
                        style={styles.fab2}
                        onPress={() => Alert.alert('Teste')
                        }
                        color="white"
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    centerButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fab: {
        backgroundColor: "#1C90FF",
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab2: {
        backgroundColor: theme.colors.alert,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 60,
    },
});
