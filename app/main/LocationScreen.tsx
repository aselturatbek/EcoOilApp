import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Heatmap, Marker } from 'react-native-maps';
import { Address } from '@/constants';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

export default function LocationScreen() {
    const [allAddresses, setAllAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/addresses/`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setAllAddresses(data);
            } else {
                console.error('Invalid address data format received.');
            }
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [allAddresses]);

    // Filter out addresses with invalid coordinates (null, undefined, or zero lat/long)
    const validAddresses = allAddresses.filter(
        (address) =>
            typeof address.latitude === 'number' &&
            typeof address.longitude === 'number' &&
            address.latitude !== 0 &&
            address.longitude !== 0
    );

    const heatmapData = validAddresses.map((address) => ({
        latitude: address.latitude,
        longitude: address.longitude,
        weight: 1, // Weight for each address
    }));

    const initialRegion = validAddresses.length > 0
        ? {
            latitude: 41.6354, // Default value for Bartın
            longitude: 32.3370,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        : {};

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading map data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion}>
                <Marker
                    coordinate={{ latitude: 41.6354, longitude: 32.3370 }} // Bartın marker
                    title="Atık Yağ Toplama Noktası"
                    description="Bu noktada atık yağlarınızı geri dönüştürebilirsiniz."
                />
                {/* Render Heatmap only if there are valid points */}
                {heatmapData.length > 0 && (
                    <Heatmap points={heatmapData} opacity={0.7} radius={50} />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
