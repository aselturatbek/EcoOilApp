import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    Alert,
    BackHandler,
    Platform,
    View,
    StatusBar,
    RefreshControl, SafeAreaView,
} from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import Constants from "expo-constants";

// Components
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import AppointmentComponent from "../components/AppointmentComponent";
import BlogComponent from "../components/BlogComponent";

const { width } = Dimensions.get("window");
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "http://localhost:8000";

const Index = () => {
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Uyarı!", "Uygulamadan çıkmak istediğinize emin misiniz?", [
                { text: "Hayır", onPress: () => null, style: "cancel" },
                { text: "Evet", onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <MenuProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <TopHeader />
                    <View style={styles.section}>
                        <Header />
                    </View>
                    <View style={styles.section}>
                        <Statistics />
                    </View>
                    <View style={styles.section}>
                        <AppointmentComponent refreshing={refreshing} />
                    </View>
                    <View style={styles.section}>
                        <BlogComponent />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0,
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100, // Eskiden 30'dı, kaydırmayı daha rahat hale getirir
    },
    section: {
        marginTop: 20,
    },
});


export default Index;
