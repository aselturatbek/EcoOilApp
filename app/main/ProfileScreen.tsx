import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    Button,
    Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {useUser} from "@/app/auth/UserContext";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
    'modals/EditProfileScreen': undefined;
    'modals/AppointmentsScreen': undefined;
    'modals/AdressScreen': undefined;
    'auth/WelcomeScreen': undefined;
};

type NavigationPropType = StackNavigationProp<
    RootStackParamList,
    'modals/EditProfileScreen' | 'modals/AppointmentsScreen' | 'modals/AdressScreen' | 'auth/WelcomeScreen'
>;

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<NavigationPropType>();
    const [image, setImage] = useState<string | null>(null);
    const [points, setPoints] = useState<number>(100);

    const { user, setUser } = useUser();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
        navigation.navigate('auth/WelcomeScreen');
    };

    const [form, setForm] = useState({
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        username: user?.username,
        password: "",
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ImageBackground
                    source={require("../assets/images/bgdarkest.png")}
                    style={styles.banner}
                    imageStyle={styles.bannerImage}
                >
                    <View style={styles.profileContainer}>
                        {user?.profile_photo_url ? (
                            <Image
                                source={{ uri: user.profile_photo_url }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Feather name={"user"} size={110} color={"#fff"} />
                        )}
                        <TouchableOpacity
                            style={styles.editIcon}
                            onPress={() => navigation.navigate("modals/EditProfileScreen")}
                        >
                            <FeatherIcon name="edit-2" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.name, styles.montserratBold]}>{form.name}</Text>
                    <View style={styles.pointsContainer}>
                        <Image
                            source={require("../assets/images/final_clean_logo.png")}
                            style={styles.ecoOilLogo}
                        />
                        <Text style={[styles.pointsText, styles.montserratText]}>
                            {points} Puan
                        </Text>
                    </View>
                </ImageBackground>

                <View style={styles.buttonContainer}>
                    {renderButton("Profil Düzenle", "edit", () =>
                        navigation.navigate("modals/EditProfileScreen")
                    )}
                    {renderButton("Randevularım", "calendar", () =>
                        navigation.navigate("modals/AppointmentsScreen")
                    )}
                    {renderButton("Adreslerim", "map-pin", () =>
                        navigation.navigate("modals/AdressScreen")
                    )}
                    {renderButton("Uygulama Bilgisi", "info", () =>
                        Alert.alert("Uygulama Bilgisi")
                    )}
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <FeatherIcon name="log-out" size={18} color="#C62828" />
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    );
};

const renderButton = (text: string, icon: string, onPress: () => void) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <FeatherIcon name={icon} style={styles.icon} />
        <Text style={[styles.buttonText, styles.montserratText]}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollViewContent: {
        alignItems: "center",
        paddingVertical: 30,
    },
    banner: {
        width: width,
        height: 280,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    bannerImage: {
        resizeMode: "cover",
        opacity:0.7,
    },
    profileContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
    },
    editIcon: {
        position: "absolute",
        bottom: 5,
        right: -5,
        backgroundColor: "#26a69a",
        padding: 6,
        borderRadius: 20,
        elevation: 2,
    },
    name: {
        fontSize: 22,
        color: "#fff",
        marginTop: 18,
        fontFamily: "Montserrat-Bold",
    },
    pointsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    ecoOilLogo: {
        width: 36,
        height: 36,
        marginRight: 6,
    },
    pointsText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Montserrat-Regular",
    },
    buttonContainer: {
        width: width * 0.9,
        marginTop: 10,
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e0f2f1",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 12,
        color: "#004d40",
        fontFamily: "Montserrat-Regular",
    },
    icon: {
        color: "#004d40",
        fontSize: 20,
    },
    montserratText: {
        fontFamily: "Montserrat-Regular",
    },
    montserratBold: {
        fontFamily: "Montserrat-Bold",
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbe9e7', // Açık mercan ton
        paddingVertical: 14,
        borderRadius: 12,
        width: width * 0.9,
        alignSelf: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 3,
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        color: '#C62828',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
    },

});


export default ProfileScreen;
