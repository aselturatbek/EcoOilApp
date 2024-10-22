import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get("window");
const bgBlog = require('../assets/images/bgblog1.png');

const BlogComponent = () => {
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollAreaContent} 
      showsVerticalScrollIndicator={false}  // Dikey kaydırma göstergesini gizler
      scrollEventThrottle={10}  // Daha akıcı bir kaydırma deneyimi sağlar
    >
      <ImageBackground style={styles.scrollArea} source={bgBlog} imageStyle={styles.bgblog}>
        <View style={styles.rect10}>
          <Text style={styles.context1}>Geri Dönüştür ve Ödüller Kazan!</Text>
        </View>
        <View style={styles.rect8}>
          <View style={styles.rect11}></View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollAreaContent: {
    flexGrow: 1,  // İçeriğin tam yükseklikte olmasını sağlar
    justifyContent: 'center',  // İçeriği ortalamak için
  },
  scrollArea: {
    height: height * 0.2,
    backgroundColor: "rgba(168,236,95,1)",
    borderRadius: 21,
    marginTop: 10,
    alignSelf: "center",
  },
  bgblog: {
    borderRadius: 21,
    transform: [{ scaleX: -1 }], // Yatay çevir
  },
  rect10: {
    width: '100%',
    height: '100%',
    backgroundColor: "transparent",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  context1: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: width * 0.065, // Responsive font size
    textAlign: 'center',
  },
  rect8: {
    width: '100%',
    height: '50%',
    backgroundColor: "#004d40",
    borderRadius: 15,
    marginTop: 10,
  },
  rect11: {
    width: '100%',
    height: '100%',
    backgroundColor: "#004d40",
    borderRadius: 15,
  },
});

export default BlogComponent;
