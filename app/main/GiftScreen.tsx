import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions, ImageBackground } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");

function GiftScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Banner alanını ImageBackground ile sarıyoruz */}
        <ImageBackground source={require('../assets/images/bgdarkest.png')} style={styles.banner} imageStyle={styles.headerImage}>
          <Text style={styles.title}>Geri Dönüştür, {"\n"}Ödüller Kazan!</Text>
          
        </ImageBackground>
      
        <View style={styles.searchSection}>
          <Text style={styles.subtitle}>What gifts do we have?</Text>
          <FeatherIcon name="search" style={styles.icon2} />
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            
            
          </View>
          <View style={styles.card}>
            
            
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            
            
          </View>
          <View style={styles.card}>
            
            
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
           
          </View>
          <View style={styles.card}>
            
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
    height: height * 0.25,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginTop: -30,
  },
  headerImage: {
    width: width * 1,
    height: height * 0.35,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginTop: -30,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop:100,
  },
  
  searchSection: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    elevation: 5, // For Android
    shadowColor: "#004d40", // For iOS
    shadowOffset: { width: 2, height: 2 }, // For iOS
    shadowOpacity: 0.7, // For iOS
    shadowRadius: 4, // For iOS
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    opacity:0.6,
    color: "rgba(0,77,64,1)",
  },
  icon2: {
    color: "rgba(0,77,64,1)",
    fontSize: 20,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#004d40",
    opacity:0.6,
    borderRadius: 20,
    width: width * 0.43,
    height: height * 0.19,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    backgroundColor: "rgba(0,77,64,1)",
    width: "100%",
    height: "70%",
    borderRadius: 20,
  },
  cardPoints: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "rgba(0,77,64,1)",
    marginTop: 10,
  },
  icon3: {
    color: "rgba(0,77,64,1)",
    fontSize: 30,
  },
  icon4: {
    color: "rgba(0,77,64,1)",
    fontSize: 30,
  },
});

export default GiftScreen;
