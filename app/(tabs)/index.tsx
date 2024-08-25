import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { FontAwesome5 } from '@expo/vector-icons';

import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

const { width, height } = Dimensions.get("window");

const recycleIllustration = require('../assets/images/recycleillus.png');
const bgImage = require('../assets/images/bgheader.jpg');
const profileImage = require('../assets/images/bgheader.jpg'); // Replace with your profile image

function Index(props: any) {
  return (
    <MenuProvider>
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <FeatherIcon name="user" style={styles.icon}></FeatherIcon>
          <Text style={styles.loremIpsum}>
            <Text style={styles.WelcomeText}>Welcome,</Text>
            {"\n"}Asel Turatbek!
          </Text>
          {/*pop up menu */}
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
                <MenuOption onSelect={() => alert('Logout')} text="Logout" />
              </MenuOptions>
            </Menu>
          </View>
        </View>

        {/*header section*/}
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
              >
              </ImageBackground>
            </View>
          </ScrollView>
        </ImageBackground>
        {/*statistics section*/ }
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

        <View style={styles.rect7}>
          <View style={styles.icon3Row}>
            <EntypoIcon name="location" style={styles.icon3}></EntypoIcon>
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
    </MenuProvider>
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
    marginTop: 3
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
    transform: [{ scaleX: -1 }], // Yatay çevirme (flip horizontal)
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
    // Gölge stili
    elevation: 5, // Android için
    shadowColor: "#000", // iOS için
    shadowOffset: { width: 0, height: 2 }, // iOS için
    shadowOpacity: 0.3, // iOS için
    shadowRadius: 4, // iOS için
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
    backgroundColor: '#6fdb64', // Green
  },
  box2: {
    backgroundColor: '#6fdb64', // Yellow
  },
  box3: {
    backgroundColor: '#6fdb64', // Light Red
  },
  statIcon: {
    fontSize: 20,
    color: 'green',
    marginBottom: 5,
  },
  statText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.09,
    color: 'beige',
  },
  statLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.029,
    color: 'beige',
    marginTop: 5,
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
    height: height * 0.12,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  icon3: {
    color: "#6fdb64",
    fontSize: 40,
    height: 44,
    width: 40
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
    alignItems: 'center'
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
    alignItems: 'center'
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
  menuOptions: {
    padding: 0.5,
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    right: 0, // Sağ tarafa yerleştirir
    elevation: 5, // Gölge efekti Android için
    shadowColor: "#000", // Gölge efekti iOS için
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 200, // Increase width for better visibility
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontFamily: 'Montserrat-Bold',
    color: '#121212',
    fontSize: 16,
  },
});

export default Index;
