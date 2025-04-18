import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");

const bgImage = require("../assets/images/bgdark.png");
const bgImage2 = require("../assets/images/bgdarkest.png");
const bgImage3 = require("../assets/images/bgfiligran.png");
const recycleIllustration = require("../assets/images/carousel_1.png");

// Carousel verileri
const carouselData = [
  {
    id: "1",
    text: "Geri dönüştür, dünyayı koru!",
    buttonText: "Geri Dönüştür",
    bgImage: bgImage,
    showButton: true,
  },
  {
    id: "2",
    text: "Bugün geri dönüşüme katıl!",
    buttonText: "Hemen Katıl",
    bgImage: bgImage2,
    showButton: false,
  },
  {
    id: "3",
    text: "Çevreye katkıda bulun!",
    buttonText: "Katkı Sağla",
    bgImage: bgImage3,
    showButton: false,
  },
  {
    id: "4",
    text: "Doğayı korumak bizim elimizde!",
    buttonText: "Katkı Sağla",
    bgImage: bgImage,
    showButton: false,
  },
];

const Header = () => {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.page}>
        <ImageBackground source={item.bgImage} style={styles.rect} imageStyle={styles.bgImage}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.text}</Text>
              {item.showButton && (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={recycleIllustration}
                style={styles.image}
                imageStyle={styles.imageStyle}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.scrollArea}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        snapToInterval={width * 0.8 + 14} // Her bir öğenin genişliği + margin
        snapToAlignment="center" // Öğeleri ortala
        decelerationRate="fast"
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
      />
      <View style={styles.pagination}>
        {carouselData.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[styles.paginationDot, { opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    width: "100%",
    height: height * 0.32,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  scrollArea_contentContainerStyle: {
    height: height * 0.30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: (width * 0.1) / 2, // Öğelerin kenarlardan boşluk almasını sağlar
  },
  bgImage: {
    borderRadius: 25,
    height: height * 0.32,
  },
  page: {
    width: width * 0.8,
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5, // Öğeler arası boşluk
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  rect: {
    width: width * 0.8,
    height: height * 0.23,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
    fontSize: width * 0.05,
    textAlign: "left",
    marginBottom: 10,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer: {
    width: 120,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    resizeMode: "contain",
  },
  button: {
    width: width * 0.35,
    height: 33,
    backgroundColor: "#004d40",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: width * 0.035,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  paginationDot: {
    width: 15,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#004d40",
    marginHorizontal: 3,
    marginTop: -40,
    marginBottom:-20,
  },
});

export default Header;