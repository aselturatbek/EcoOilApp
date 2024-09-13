import React from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions, ImageBackground, Image } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Profile Picture and Background */}
        <ImageBackground source={require('../assets/images/bgdarkest.png')} style={styles.banner} imageStyle={styles.headerImage}>
          <Image source={require('../assets/images/bglight.png')} style={styles.profileImage} />
          <Text style={styles.name}>Asel Turatbek</Text>
          <Text style={styles.bio}>An environmentalist committed to protecting nature through recycling efforts.</Text>
        </ImageBackground>

        {/* About Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Me</Text>
          <Text style={styles.infoText}>
            I am dedicated to raising awareness about recycling and reducing environmental impact through volunteer work. With experience in mobile app development, I also work on projects aimed at protecting the environment.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.infoTitle}>Contact Info</Text>
          <View style={styles.contactRow}>
            <FeatherIcon name="mail" style={styles.icon} />
            <Text style={styles.contactText}>recyclehero@example.com</Text>
          </View>
          <View style={styles.contactRow}>
            <FeatherIcon name="phone" style={styles.icon} />
            <Text style={styles.contactText}>+123 456 7890</Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialCommunityIconsIcon name="linkedin" style={styles.icon} />
            <Text style={styles.contactText}>linkedin.com/in/recyclehero</Text>
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}

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
    width: width * 1,
    height: height * 0.4,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginTop:-20,
  },
  headerImage: {
    borderRadius: 30,
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
    fontFamily: "Montserrat-Bold",
    fontSize: 26,
    color: "white",
  },
  bio: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "white",
    opacity: 0.8,
    textAlign: "center",
    marginHorizontal: 20,
  },
  infoSection: {
    width: width * 0.9,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#004d40",
    marginBottom: 10,
  },
  infoText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#004d40",
    opacity: 0.8,
  },
  contactSection: {
    width: width * 0.9,
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#004d40",
    marginLeft: 10,
  },
  icon: {
    color: "#004d40",
    fontSize: 20,
  },
});

export default ProfileScreen;
