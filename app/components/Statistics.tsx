import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

const Statistics = () => {
    const [totalUserCount, setTotalUserCount] = useState<number>(0);

    const getUsersCount = async () => {
        try {
            const response = await fetch(`${API_URL}/api/totalUserCount`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setTotalUserCount(data.total_users);
        } catch (error) {
            console.error("Failed to fetch user count:", error);
        }
    };

    useEffect(() => {
        getUsersCount();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Geri Dönüşümler</Text>

            <View style={styles.statsContainer}>
                <View style={[styles.statBox, styles.box1]}>
                    <FontAwesome5 name="recycle" style={styles.statIcon} />
                    <Text style={styles.statText}>150</Text>
                    <Text style={styles.statLabel}>EcoOil Puan</Text>
                </View>
                <View style={[styles.statBox, styles.box2]}>
                    <FontAwesome5 name="calendar-check" style={styles.statIcon} />
                    <Text style={styles.statText}>150</Text>
                    <Text style={styles.statLabel}>Toplama Noktası</Text>
                </View>
                <View style={[styles.statBox, styles.box3]}>
                    <FontAwesome5 name="user" style={styles.statIcon} />
                    <Text style={styles.statText}>{totalUserCount}</Text>
                    <Text style={styles.statLabel}>Kullanıcı</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.045,
        marginTop: -10,
    },
    title: {
        fontFamily: "Montserrat-Bold",
        color: "#004d40",
        fontSize: 18,
        marginBottom: 14,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statBox: {
        width: (width - width * 0.12 - 20) / 3, // 3 kutu arası 10+10 margin

        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#004d40",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    box1: { backgroundColor: '#00897b' }, // 🔸 Orta ton
    box2: { backgroundColor: '#00695c' }, // 🔹 Daha doygun yeşil
    box3: { backgroundColor: '#004d40' }, // ✅ Ana renk


    statIcon: {
        fontSize: 28,
        color: "#fff",
        marginBottom: 5,
    },
    statText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "Montserrat-Bold",
    },
    statLabel: {
        fontSize: 12,
        color: "#fff",
        fontFamily: "Montserrat-Regular",
        textAlign: "center",
    },
});

export default Statistics;
