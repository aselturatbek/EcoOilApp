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

const ITEM_WIDTH = width - width * 0.12; // %6 padding each side
const ITEM_HEIGHT = height * 0.22;

const Header = () => {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }: { item: any }) => {
    return (
        <View style={styles.page}>
          <ImageBackground
              source={item.bgImage}
              style={styles.rect}
              imageStyle={styles.bgImage}
          >
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
      <View style={styles.container}>
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
            snapToInterval={ITEM_WIDTH + 12}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
        />
        <View style={styles.pagination}>
          {carouselData.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [(index - 1) * width, index * width, (index + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
          })}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.035,
    marginTop: -10,
  },
  carouselContent: {
    paddingBottom: 10,
  },
  page: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 18,
    marginHorizontal: 7,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  rect: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    resizeMode: "cover",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.045,
    color: "#fff",
    marginBottom: 8,
  },
  imageContainer: {
    width: 130,
    height:130,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#004d40",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.035,
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#004d40",
    marginHorizontal: 4,
  },
});

export default Header;
