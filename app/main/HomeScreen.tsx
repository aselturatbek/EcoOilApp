import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    Alert,
    BackHandler,
    SafeAreaView,
    RefreshControl
} from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
//components
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import AppointmentComponent from "../components/AppointmentComponent";
import BlogComponent from "../components/BlogComponent";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';


function Index(props: any) {
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Uyarı!", "Uygulamadan çıkmak istediğinize emin misiniz?", [
                {
                    text: "Hayır",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Evet", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    return (
        <MenuProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={10}
                    contentContainerStyle={styles.scrollViewContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <TopHeader />
                    <Header />
                    <Statistics />
                    <AppointmentComponent  refreshing={refreshing}/>
                    <BlogComponent />
                </ScrollView>
            </SafeAreaView>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.03,
        backgroundColor: 'white'
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Index;
