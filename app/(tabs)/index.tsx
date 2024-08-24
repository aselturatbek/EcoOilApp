//HOME SCREEN
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";


function Index(props: any) {
  return (
    //top of the page,username and menu
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <FeatherIcon name="user" style={styles.icon}></FeatherIcon>
        <Text style={styles.loremIpsum}>
          <Text style={styles.WelcomeText}>Welcome,</Text>
          {"\n"}Asel Turatbek!</Text>
        <FeatherIcon
          name="more-horizontal"
          style={styles.icon2}
        ></FeatherIcon>
      </View> 
      {/* header*/}
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.loremIpsum2ColumnRow}>
            <View style={styles.loremIpsum2Column}>
              <Text style={styles.loremIpsum2}>
                Atik Yaglari {"\n"}Geri Donustur!
              </Text>
              <TouchableOpacity style={styles.button}></TouchableOpacity>
            </View>
            <View style={styles.rect}></View>
          </View>
        </ScrollView>
      </View>
      {/* statistics*/}
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
      {/* toplama noktalari*/}
      <View style={styles.rect7}>
        <Text style={styles.loremIpsum8}></Text>
        <View style={styles.icon3Row}>
          <EntypoIcon name="location" style={styles.icon3}></EntypoIcon>
          <Text style={styles.loremIpsum7}>Toplama Noktalarina Goz At!</Text>
        </View>
      </View>

      {/* blog,bilgilendirme postlari*/}
      <View style={styles.ecoOilStackColumnRow}>
        <View style={styles.ecoOilStackColumn}>
          <View style={styles.ecoOilStack}>
            <Text style={styles.ecoOil}></Text>
            <View style={styles.rect10}>
              <Text style={styles.randevularim}>
                Geri Donustur, Odul Kazan!
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
    flex: 1
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 35,
    marginTop: 3
  },
  loremIpsum: {
    fontFamily:'Montserrat-Bold',
    color: "#121212",
    fontSize:15,
    marginLeft: 15,
    marginTop: 5
  },
  WelcomeText: {
    fontFamily:'Montserrat-Regular',
    color: "#121212",
    fontSize:15,
    marginLeft: 15,
    marginTop: 5
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginLeft: 139,
    marginTop:10,
  },
  iconRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 44,
    marginLeft: 23,
    marginRight: 22
  },
  scrollArea: {
    width: 330,
    height: 169,
    backgroundColor: "rgba(168,236,95,1)",
    borderRadius: 21,
    marginTop: 9,
    alignSelf: "center"
  },
  scrollArea_contentContainerStyle: {
    width: 330,
    height: 169
  },
  loremIpsum2: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: 20
  },
  button: {
    width: 132,
    height: 28,
    backgroundColor: "rgba(248,231,28,1)",
    borderRadius: 25,
    overflow: "visible",
    shadowColor: "rgba(248,231,28,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 75,
    shadowOpacity: 0.37,
    shadowRadius: 25,
    marginTop: 20
  },
  loremIpsum2Column: {
    width: 159
  },
  rect: {
    width: 114,
    height: 94,
    backgroundColor: "#E6E6E6",
    borderRadius: 37,
    marginLeft: 18
  },
  loremIpsum2ColumnRow: {
    height: 108,
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 11,
    marginRight: 28
  },
  rect2: {
    width: 99,
    height: 101,
    backgroundColor: "#E6E6E6",
    borderRadius: 21
  },
  loremIpsum3: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: 40,
    marginTop: 26,
    marginLeft: 15
  },
  rect5: {
    width: 99,
    height: 101,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginLeft: 16
  },
  loremIpsum4: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: 40,
    marginTop: 26,
    marginLeft: 15
  },
  rect6: {
    width: 99,
    height: 101,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginLeft: 16
  },
  loremIpsum5: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: 40,
    marginTop: 26,
    marginLeft: 16
  },
  rect2Row: {
    height: 101,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 23,
    marginRight: 23
  },
  rect7: {
    width: 330,
    height: 54,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 23
  },
  loremIpsum8: {
    fontFamily: "Montserrat-Regular",
    color: "#121212",
    marginLeft: 1,
    marginTop: 54
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 44,
    width: 40
  },
  loremIpsum7: {
    fontFamily: "Montserrat-Regular",
    color: "#121212",
    marginLeft: 8,
    marginTop: 14
  },
  icon3Row: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 82,
    marginLeft: 19,
    marginTop: 5
  },
  loremIpsum6: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    fontSize: 20,
    marginTop: -62,
    marginLeft: 92
  },
  loremIpsum9: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    marginTop: 79,
    marginLeft: 26
  },
  ecoOil: {
    top: 0,
    left: 55,
    position: "absolute",
    fontFamily: "Montserrat-Regular",
    color: "#121212",
    fontSize: 40
  },
  rect10: {
    top: 0,
    left: 0,
    width: 199,
    height: 59,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderRadius: 21
  },
  randevularim: {
    fontFamily: "Montserrat-Bold",
    color: "#121212",
    marginTop: 14,
    marginLeft: 9
  },
  ecoOilStack: {
    width: 199,
    height: 59
  },
  rect8: {
    width: 199,
    height: 135,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginTop: 10
  },
  rect11: {
    width: 199,
    height: 68,
    backgroundColor: "rgba(186,248,119,1)",
    borderRadius: 21
  },
  ecoOilStackColumn: {
    width: 199
  },
  rect9: {
    width: 123,
    height: 204,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginLeft: 8
  },
  rect12: {
    width: 123,
    height: 59,
    backgroundColor: "rgba(184,233,134,1)",
    borderRadius: 21
  },
  ecoOilStackColumnRow: {
    height: 204,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 23,
    marginRight: 22
  }
});

export default Index;
