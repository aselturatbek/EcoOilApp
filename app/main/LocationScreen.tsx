import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {Heatmap, Marker} from 'react-native-maps';
import {Address} from "@/constants";
import Constants from "expo-constants";


const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

export default function LocationScreen() {

    /* ┏┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┳┓   */
    /* ┣ Bu değişken ↓ Tüm adresleri tutuyor ona göre ┫ ♥︎ */
    /* ┗┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┻┛   */
    const [allAddresses, setAllAddresses] = useState<Address[]>([]);

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user_addresses/`);
            const data = await response.json();
            setAllAddresses(data);
        } catch (error) {
            console.error('Adresler alınamadı.', error);
        }
    }

    useEffect(() => {
        fetchAddresses().then();
    })

    const heatmapData = [
        { latitude: 41.0082, longitude: 28.9784, weight: 0.8 },  // İstanbul
        { latitude: 39.9254, longitude: 32.8663, weight: 0.5 },  // Ankara
        { latitude: 38.4237, longitude: 27.1428, weight: 0.3 },  // İzmir
    ];


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 41.6354,  // Bartın'ın başlangıç noktası
                    longitude: 32.3370,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: 41.6354, longitude: 32.3370 }} // Bartın marker konumu
                    title="Atık Yağ Toplama Noktası"
                    description="Bu noktada atık yağlarınızı geri dönüştürebilirsiniz."
                />
                <Heatmap
                    points={heatmapData}
                    opacity={0.7}
                    radius={50}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
