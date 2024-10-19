import React, {useEffect, useState} from "react";
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions, Alert, BackHandler, SafeAreaView
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { FontAwesome5 } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { StackNavigationProp } from "@react-navigation/stack";
import {User} from "@/constants";
import {useUser} from "@/app/auth/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {set} from "yaml/dist/schema/yaml-1.1/set";

const { width, height } = Dimensions.get("window");

const recycleIllustration = require('../assets/images/earth_3d.png');
const bgImage = require('../assets/images/bgdark.png');
const profileImage = require('../assets/images/bgheader.jpg');
const bgBlog = require('../assets/images/bgblog1.png');

type RootStackParamList = {
    Home: undefined;
    'auth/WelcomeScreen': undefined;
    // Other screens
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'Home'>;
function Index(props: any) {
    const navigation = useNavigation<NavigationPropType>(); // Get the navigation prop

    const { user, setUser } = useUser();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
        navigation.navigate('auth/WelcomeScreen');
    };

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
                <ScrollView style={styles.container}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            {user?.profile_photo_url ? (
                                <Image source={{ uri: user?.profile_photo_url }} style={styles.profileImage} />
                            ) : (
                                <FeatherIcon name="user" style={styles.icon}></FeatherIcon>
                            )}
                            <View style={{display: "flex", flexDirection: "row", marginLeft: 8}}>
                                <Text style={{marginRight: 4, fontSize: 16}}>Welcome,</Text>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>{user?.username}</Text>
                            </View>
                        </View>
                        {/* Pop-up menu */}
                        <View style={{ position: 'relative' }}>
                            <Menu>
                                <MenuTrigger>
                                    <FeatherIcon
                                        name="more-horizontal"
                                        style={styles.icon2}
                                    ></FeatherIcon>
                                </MenuTrigger>
                                <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                                    <View style={styles.profileSection}>
                                        <Image source={profileImage} style={styles.profileImage} />
                                        <Text style={styles.username}>ecooiltubitak</Text>
                                    </View>
                                    <MenuOption onSelect={() => alert('Instagram')} text="Instagram" />
                                    <MenuOption onSelect={() => alert('LinkedIn')} text="LinkedIn" />
                                    <MenuOption onSelect={() => {
                                        handleLogout();
                                        navigation.navigate('auth/WelcomeScreen');
                                    }} text="Logout" />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>

                    {/* Header section */}
                    <ImageBackground style={styles.scrollArea} source={bgImage} imageStyle={styles.bgImage}>
                        <View style={styles.scrollArea_contentContainerStyle}>
                            <View style={styles.loremIpsum2ColumnRow}>
                                <View style={styles.loremIpsum2Column}>
                                    <Text style={styles.loremIpsum2}>
                                        Do your part,{"\n"}recycle{"\n"}today!
                                    </Text>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Recycle</Text>
                                    </TouchableOpacity>
                                </View>
                                <ImageBackground
                                    source={recycleIllustration}
                                    style={styles.rect}
                                    imageStyle={styles.image}
                                >
                                </ImageBackground>
                            </View>
                        </View>
                    </ImageBackground>

                    <View>
                        <Text style={styles.loremIpsum2}>
                            Top Recyclers
                        </Text>
                    </View>

                    {/* Statistics section */}
                    <View style={styles.statsContainer}>
                        <View style={[styles.statBox, styles.box1]}>
                            <FontAwesome5 name="recycle" style={styles.statIcon} />
                            <Text style={styles.statText}>150</Text>
                            <Text style={styles.statLabel}>Total Items</Text>
                        </View>
                        <View style={[styles.statBox, styles.box2]}>
                            <FontAwesome5 name="calendar-check" style={styles.statIcon} />
                            <Text style={styles.statText}>150</Text>
                            <Text style={styles.statLabel}>Appointments</Text>
                        </View>
                        <View style={[styles.statBox, styles.box3]}>
                            <FontAwesome5 name="trophy" style={styles.statIcon} />
                            <Text style={styles.statText}>150</Text>
                            <Text style={styles.statLabel}>Rewards</Text>
                        </View>
                    </View>

                    {/* belirsiz section */}
                    <View style={styles.recentlyRecycledContainer}>
                        <Text style={styles.recentlyRecycledTitle}>Upcoming Recycles</Text>
                        <View style={styles.recentlyRecycledItems}>
                            <Text style={styles.recentlyRecycledItem}>Plastic Bottles - 10kg</Text>
                            <Text style={styles.recentlyRecycledItem}>Paper - 5kg</Text>
                            <Text style={styles.recentlyRecycledItem}>Glass - 3kg</Text>
                        </View>
                    </View>


                    {/* Blog section */}
                    <ImageBackground style={styles.scrollArea} source={bgBlog} imageStyle={styles.bgblog}>
                        <View style={styles.blogCard1}>
                            <View style={styles.blogCard2}>
                                <View style={styles.blogCard3}>
                                    <View style={styles.rect10}>
                                        <Text style={styles.context1}>
                                            Recycle and Earn Rewards!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.rect8}>
                                    <View style={styles.rect11}></View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </SafeAreaView>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05, // 5% padding on all sides
    },
    icon: {
        color: "#004d40",
        fontSize: 35,
        marginTop: 3,
        marginHorizontal:-19,
    },
    loremIpsum: {
        marginRight: 90,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
    },
    WelcomeText: {
        fontFamily: 'Montserrat-Regular',
        color: "#121212",
        fontSize: 15, // fixed font size
    },
    icon2: {
        color: "#004d40",
        fontSize: 30,
        marginLeft: 'auto',
        marginTop: 10,
    },
    iconRow: {
        height: 44,
        flexDirection: "row",
        marginTop: 44,
        marginLeft: 23,
        marginRight: 22,
        justifyContent: "space-between", // Items spaced evenly
    },
    scrollArea: {
        width: '100%',
        height: height * 0.2,
        backgroundColor: "rgba(168,236,95,1)",
        borderRadius: 21,
        marginTop: 9,
        alignSelf: "center"
    },
    scrollArea_contentContainerStyle: {
        height: height * 0.2,
        alignItems: 'center',
    },
    bgImage: {
        borderRadius: 21,
        transform: [{ scaleX: -1 }], // Flip horizontally
    },
    loremIpsum2: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: width * 0.05, // Responsive font size
        marginTop:20,
        elevation: 5, // For Android
        shadowColor: "#004d40", // For iOS
        shadowOffset: { width: 2, height: 2 }, // For iOS
        shadowOpacity: 0.7, // For iOS
        shadowRadius: 4, // For iOS
    },
    loremIpsum2Column: {
        justifyContent: 'center',
    },
    button: {
        width: '120%',
        height: height * 0.04,
        backgroundColor: "#004d40",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        // Shadow style
        elevation: 5, // For Android
        shadowColor: "#000", // For iOS
        shadowOffset: { width: 0, height: 2 }, // For iOS
        shadowOpacity: 0.3, // For iOS
        shadowRadius: 4, // For iOS
    },
    buttonText: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: width * 0.035, // Responsive font size
    },
    rect: {
        width: width * 0.45,
        height: height * 0.15,
        marginLeft:60,
        marginTop:20,

    },
    image: {
        width: '80%',
        height: '100%',
    },
    loremIpsum2ColumnRow: {
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: '100%',
    },
    rect2: {
        width: '30%',
        height: height * 0.12,
        backgroundColor: "#E6E6E6",
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 22,
    },
    statBox: {
        width: '30%',
        height: height * 0.12,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E6E6E5',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    box1: {
        backgroundColor: '#004d40',
        opacity:0.6,
    },
    box2: {
        backgroundColor: '#004d40',
        opacity:0.7,
    },
    box3: {
        backgroundColor: '#004d40',
        opacity:0.8,
    },
    statIcon: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 5,
    },
    statText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    },
    statLabel: {
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Montserrat-Regular',
    },
    recentlyRecycledContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#004d40',
        opacity:0.6,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    recentlyRecycledTitle: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    recentlyRecycledItems: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    recentlyRecycledItem: {
        fontFamily: 'Montserrat-Regular',
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },
    bgblog: {
        borderRadius: 21,
        transform: [{ scaleX: -1 }], // Flip horizontally
    },
    blogCard1: {
        width: '100%',
        height: height * 0.4,
        marginTop: 20,
    },
    blogCard2: {
        width: '100%',
        height: '100%',
    },
    blogCard3: {
        width: '100%',
        height: '50%',
    },
    rect10: {
        width: '100%',
        height: '100%',
        backgroundColor: "transparent",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    context1: {
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: width * 0.065, // Responsive font size
        textAlign: 'center',
    },
    rect8: {
        width: '100%',
        height: '50%',
        backgroundColor: "#004d40",
        borderRadius: 15,
        marginTop: 10,
    },
    rect11: {
        width: '100%',
        height: '100%',
        backgroundColor: "#004d40",
        borderRadius: 15,
    },

    menuOptions: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        width: 150,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        fontFamily: 'Montserrat-Bold',
        color: '#333',
        fontSize: 14,
    }
});

export default Index;
