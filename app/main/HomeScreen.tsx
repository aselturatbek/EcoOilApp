import React, { useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    Dimensions, Alert, BackHandler, 
    SafeAreaView
} from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
//components
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import AppointmentComponent from "../components/AppointmentComponent";
import BlogComponent from "../components/BlogComponent";

const { width } = Dimensions.get("window");

function Index(props: any) {

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

    return (
        <MenuProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView 
                  style={styles.container}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={10}
                  contentContainerStyle={styles.scrollViewContent}  // İçerik konteynırını stilledik
                >
                    <TopHeader />
                    <Header />
                    <Statistics />
                    <AppointmentComponent />
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
        backgroundColor:'white'
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Index;
