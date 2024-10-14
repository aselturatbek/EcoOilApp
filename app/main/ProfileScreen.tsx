import React, { useState } from "react";
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

// Navigasyon parametrelerini tanımlama
type RootStackParamList = {
  'modals/EditProfileScreen': undefined;
  'modals/AppointmentsScreen': undefined; // Düzeltildi
  'modals/AdressScreen': undefined;
};

type NavigationPropType = StackNavigationProp<
    RootStackParamList,
    'modals/EditProfileScreen' | 'modals/AppointmentsScreen' | 'modals/AdressScreen'
>;

const { width, height } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationPropType>();
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "Asel Turatbek",
    phone: "+123 456 7890",
    email: "recyclehero@example.com",
    username: "recyclehero",
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
          >
            <Image
                source={{ uri: image || require("../assets/images/bglight.png") }}
                style={styles.profileImage}
            />
            <Text style={[styles.name, styles.montserratBold]}>
              {form.name}
            </Text>
          </ImageBackground>

          <View style={styles.buttonContainer}>
            {renderButton("Profil Düzenle", "edit", () =>
                navigation.navigate("modals/EditProfileScreen")
            )}
            {renderButton("Randevularım", "calendar", () =>
                navigation.navigate("modals/AppointmentsScreen") // Doğru rota kullanıldı
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
              onPress={() => Alert.alert("Çıkış Yapıldı")}
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
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  banner: {
    width: width,
    height: height * 0.4,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    color: "#fff",
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
