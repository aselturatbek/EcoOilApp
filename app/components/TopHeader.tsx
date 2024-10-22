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

const TopHeader = (props: any) => {
    const navigation = useNavigation<NavigationPropType>();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
        navigation.navigate('auth/WelcomeScreen');
    };

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {user?.profile_photo_url ? (
                    <Image source={{ uri: user?.profile_photo_url }} style={styles.profileImage} />
                ) : (
                    <Image source={profileImage} style={styles.profileImage} />
                )}
                <View style={{ display: "flex", flexDirection: "column", marginLeft: 8, paddingTop: 10 }}>
                    <Text style={styles.WelcomeText}>Hoşgeldin,</Text>
                    <Text style={styles.usernameText}>{user?.username}</Text>
                </View>
            </View>

            <View style={{ position: 'relative' }}>
                <Menu>
                    <MenuTrigger>
                        <FeatherIcon
                            name="more-horizontal"
                            style={styles.icon2}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                        <View style={styles.profileSection}>
                        {user?.profile_photo_url ? (
                              <Image source={{ uri: user?.profile_photo_url }} style={styles.profileImage} />
                          ) : (
                              <Image source={profileImage} style={styles.profileImage} />
                          )}
                            <Text style={styles.username}>{user?.username}</Text>
                        </View>
                        <MenuOption onSelect={() => alert('Instagram')}>
                            <Text style={styles.menuText}>Ayarlar</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert('LinkedIn')}>
                            <Text style={styles.menuText}>EcoOil</Text>
                        </MenuOption>
                        <MenuOption onSelect={handleLogout}>
                            <Text style={styles.logoutText}>Çıkış Yap</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        marginLeft:10,
        
    },
    WelcomeText: {
        fontFamily: 'Montserrat-Regular',
        color: "#004d40",
        fontSize: 20, // fixed font size
    },
    usernameText: {
        fontFamily: 'Montserrat-Bold',
        color: "#004d40",
        fontSize: 20, // fixed font size
        marginTop: 10,
    },
    icon2: {
        color: "#004d40",
        fontSize: 30,
        marginLeft: 'auto',
        marginTop: 10,
    },
    menuOptions: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 5,
        width: 160,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
    profileSection: {
        alignItems: 'flex-start',
        marginBottom: 10,
        marginLeft:8
    },
    menuText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#333',
        paddingVertical: 5,
    },
    logoutText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#ff4d4d',
        paddingVertical: 5,
    },
    username: {
        fontFamily: 'Montserrat-Bold',
        color: '#004d40',
        fontSize: 20,
    },
});

export default TopHeader;
