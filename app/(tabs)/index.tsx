import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native'; // For navigation


const { width, height } = Dimensions.get("window");

const recycleIllustration = require('../assets/images/recycleillus.png');
const bgImage = require('../assets/images/bgheader.jpg');


function Index() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <FeatherIcon name="user" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.loremIpsum}>
          <Text style={styles.WelcomeText}>Welcome,</Text>
          {"\n"}Asel Turatbek!
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
          <FeatherIcon name="more-horizontal" style={styles.icon2} />
        </TouchableOpacity>
      </View>
      
      {/* Burger Menu */}
      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => console.log('Menu Item 1')}>
            <Text>Menu Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Menu Item 2')}>
            <Text>Menu Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Menu Item 3')}>
            <Text>Menu Item 3</Text>
          </TouchableOpacity>
        </View>
      )}

      <ImageBackground style={styles.scrollArea} source={bgImage} imageStyle={styles.bgImage}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.loremIpsum2ColumnRow}>
            <View style={styles.loremIpsum2Column}>
              <Text style={styles.loremIpsum2}>
                Geri Donustur {"\n"}Geri Donustur{"\n"}Geri Donustur
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Geri Dönüştür</Text>
              </TouchableOpacity>
            </View>
            <ImageBackground
              source={recycleIllustration}
              style={styles.rect}
              imageStyle={styles.image}
            />
          </View>
        </ScrollView>
      </ImageBackground>

      <View style={styles.rect2Row}>
        <View style={styles.rect2}>
          <Text style={styles.loremIpsum3}>150</Text>
        </View>
        <View style={styles.rect5}>
          <Text style={styles.loremIpsum4}>150</Text>
        </View>
        <View style={styles.rect6}>
          <Text style={styles.loremIpsum5}>150</Text>
        </View>
      </View>

      <View style={styles.rect7}>
        <View style={styles.icon3Row}>
          <EntypoIcon name="location" style={styles.icon3} />
          <Text style={styles.loremIpsum7}>Toplama Noktalarına Göz At!</Text>
        </View>
      </View>

      <View style={styles.ecoOilStackColumnRow}>
        <View style={styles.ecoOilStackColumn}>
          <View style={styles.ecoOilStack}>
            <View style={styles.rect10}>
              <Text style={styles.randevularim}>
                Geri Dönüştür, Ödül Kazan!
              </Text>
            </View>
          </View>
          <View style={styles.rect8}>
            <View style={styles.rect11}></View>
          </View>
        </View>
        <View style={styles.rect9}>
          <View style={styles.rect12}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% padding on all sides
  },
  icon: {
    color: "#6fdb64",
    fontSize: 35,
    marginTop: 3,
  },
  loremIpsum: {
    marginLeft: 15,
    marginTop: 5,
    fontFamily: 'Montserrat-Bold',
  },
  WelcomeText: {
    fontFamily: 'Montserrat-Regular',
    color: "#121212",
    fontSize: 15, // fixed font size
  },
  icon2: {
    color: "#6fdb64",
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
  },
  scrollArea: {
    width: '100%',
    height: height * 0.2,
    backgroundColor: "rgba(168,236,95,1)",
    borderRadius: 21,
    marginTop: 9,
    alignSelf: "center",
  },
  scrollArea_contentContainerStyle: {
    height: height * 0.2,
    alignItems: 'center',
  },
  bgImage: {
    borderRadius: 21,
    transform: [{ scaleX: -1 }], // Horizontal flip
  },
  loremIpsum2: {
    fontFamily: "Montserrat-Bold",
    color: "black",
    fontSize: width * 0.05, // Responsive font size
  },
  loremIpsum2Column: {
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    height: height * 0.04,
    backgroundColor: "#F6E96B",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    // Shadow style
    elevation: 5, // For Android
    shadowColor: "#000", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    color: "green",
    fontSize: width * 0.035, // Responsive font size
  },
  rect: {
    width: width * 0.45,
    height: height * 0.15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loremIpsum2ColumnRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  rect2: {
    width: '30%',
    height: height * 0.12,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loremIpsum3: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: width * 0.08, // Responsive font size
  },
  rect5: {
    width: '30%',
    height: height * 0.12,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2.5%',
  },
  loremIpsum4: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: width * 0.08, // Responsive font size
  },
  rect6: {
    width: '30%',
    height: height * 0.12,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2.5%',
  },
  loremIpsum5: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: width * 0.08, // Responsive font size
  },
  rect2Row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 22,
  },
  rect7: {
    width: '100%',
    height: height * 0.07,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  icon3: {
    color: "#6fdb64",
    fontSize: 40,
    height: 44,
    width: 40,
  },
  loremIpsum7: {
    fontFamily: "Montserrat-Regular",
    color: "#121212",
    fontSize: width * 0.045, // Responsive font size
    marginLeft: 8,
  },
  icon3Row: {
    flexDirection: "row",
    alignItems: 'center',
  },
  ecoOilStackColumnRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ecoOilStackColumn: {
    flex: 1,
  },
  ecoOilStack: {
    flexDirection: "row",
    alignItems: 'center',
  },
  rect10: {
    width: '100%',
    height: height * 0.12,
    backgroundColor: "#A8EC5F",
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randevularim: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: width * 0.05, // Responsive font size
  },
  rect8: {
    width: '100%',
    height: height * 0.12,
    backgroundColor: "#A8EC5F",
    borderRadius: 21,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect11: {
    width: '100%',
    height: '100%',
  },
  rect9: {
    width: '48%',
    height: height * 0.26,
    backgroundColor: "#A8EC5F",
    borderRadius: 21,
  },
  rect12: {
    width: '100%',
    height: '100%',
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Index;
