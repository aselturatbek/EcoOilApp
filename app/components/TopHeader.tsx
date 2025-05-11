import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useUser } from "@/app/auth/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const profileImage = require('../assets/images/bgdark.png');

type RootStackParamList = {
    Home: undefined;
    'auth/WelcomeScreen': undefined;
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'auth/WelcomeScreen'>;

const TopHeader = () => {
    const navigation = useNavigation<NavigationPropType>();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
        navigation.navigate('auth/WelcomeScreen');
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSection}>
                <Image
                    source={user?.profile_photo_url ? { uri: user.profile_photo_url } : profileImage}
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>Hoşgeldin,</Text>
                    <Text style={styles.usernameText} numberOfLines={1} ellipsizeMode="tail">
                        {user?.username}
                    </Text>
                </View>
            </View>

            <Menu>
                <MenuTrigger>
                    <FeatherIcon name="more-horizontal" style={styles.icon} />
                </MenuTrigger>
                <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                    <View style={styles.profileSection}>
                        <Image
                            source={user?.profile_photo_url ? { uri: user.profile_photo_url } : profileImage}
                            style={styles.dropdownImage}
                        />
                        <Text style={styles.menuUsername}>{user?.username}</Text>
                    </View>
                    <MenuOption onSelect={() => alert('Ayarlar')}>
                        <Text style={styles.menuText}>Ayarlar</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => alert('EcoOil')}>
                        <Text style={styles.menuText}>EcoOil</Text>
                    </MenuOption>
                    <MenuOption onSelect={handleLogout}>
                        <Text style={styles.logoutText}>Çıkış Yap</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.06, // diğer componentlerle birebir hizalı
        paddingTop: 20,
        paddingBottom: 10,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flexShrink: 1,
    },
    welcomeText: {
        fontFamily: "Montserrat-Regular",
        color: "#004d40",
        fontSize: 18,
    },
    usernameText: {
        fontFamily: "Montserrat-Bold",
        color: "#004d40",
        fontSize: 20,
        marginTop: 2,
    },
    icon: {
        fontSize: 28,
        color: "#004d40",
    },
    menuOptions: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        width: 180,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    dropdownImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    menuUsername: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: "#004d40",
        flexShrink: 1,
    },
    menuText: {
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        color: '#333',
        paddingVertical: 6,
    },
    logoutText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
        color: "#ff4d4d",
        paddingVertical: 6,
    },
});

export default TopHeader;
