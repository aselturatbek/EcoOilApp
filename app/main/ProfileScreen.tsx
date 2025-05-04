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

                <Button
                    title="Çıkış Yap"
                    color="#C62828"
                    onPress={() => handleLogout()}
                />

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
        paddingVertical: 20,
    },
    banner: {
        width: width * 1.1, // Genişliği küçülttük
        height: 300, // Yüksekliği ayarladık
        borderBottomLeftRadius: 60, // Yuvarlak kenar ekledik
        borderBottomRightRadius: 60, // Yuvarlak kenar ekledik
        overflow: "hidden", // Taşma olmaması için
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
        marginTop: -19,
    },
    bannerImage: {
        resizeMode: "cover", // Görüntüyü düzgün yerleştirmek için
    },
    profileContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: "#fff",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 11,
        backgroundColor: "#026a59",
        padding: 5,
        borderRadius: 20,
    },
    name: {
        fontSize: 24,
        color: "#fff",
        marginTop: 20,
    },
    pointsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    pointsText: {
        marginLeft: 1,
        fontSize: 16,
        color: "#fff",
    },
    ecoOilLogo: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    buttonContainer: {
        width: width * 0.9,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6E6E6",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 10,
        color: "#004d40",
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
});

export default ProfileScreen;
