import React from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const bgImage = require('../assets/images/bgdark.png');
const bgImage2 = require('../assets/images/bgdarkest.png');
const bgImage3 = require('../assets/images/bgfiligran.png');
const recycleIllustration = require('../assets/images/carousel_1.png');

const Header = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.scrollArea}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={width * 0.9}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
      >
        {/* Carousel Item 1 */}
        <View style={[styles.page]}>
          <ParallaxPage
            index={0}
            translateX={translateX}
            text="Geri dönüştür, dünyayı koru!"
            buttonText="Geri Dönüştür"
            bgImage={bgImage} // First image as background
            showButton={true} // Show button only on the first page
          />
        </View>

        {/* Carousel Item 2 */}
        <View style={[styles.page]}>
          <ParallaxPage
            index={1}
            translateX={translateX}
            text="Bugün geri dönüşüme katıl!"
            buttonText="Hemen Katıl"
            bgImage={bgImage2} // Second image as background
            showButton={false} // No button for other pages
          />
        </View>

        {/* Carousel Item 3 */}
        <View style={[styles.page]}>
          <ParallaxPage
            index={2}
            translateX={translateX}
            text="Çevreye katkıda bulun!"
            buttonText="Katkı Sağla"
            bgImage={bgImage3} // Third image as background
            showButton={false} // No button for other pages
          />
        </View>

        {/* Carousel Item 4 */}
        <View style={[styles.page]}>
          <ParallaxPage
            index={3}
            translateX={translateX}
            text="Çevreye katkıda bulun!"
            buttonText="Katkı Sağla"
            bgImage={bgImage} // Fourth image as background
            showButton={false} // No button for other pages
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

// Parallax effect for each page
interface ParallaxPageProps {
  index: number;
  translateX: Animated.SharedValue<number>;
  text: string;
  buttonText: string;
  bgImage: any; // Background image for each page
  showButton: boolean; // Control button visibility
}

const ParallaxPage: React.FC<ParallaxPageProps> = ({ index, translateX, text, buttonText, bgImage, showButton }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width * 0.9, index * width * 0.9, (index + 1) * width * 0.9],
      [0.9, 1, 0.9]
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <ImageBackground
        source={bgImage} // Dynamic bgImage for each card
        style={styles.rect}
        imageStyle={styles.bgImage}
      >
        <ImageBackground
          source={recycleIllustration}
          style={styles.rect}
          imageStyle={styles.image}
        />
        <Text style={styles.loremIpsum2}>{text}</Text>

        {/* Show button only on the first carousel page */}
        {showButton && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    width: '100%',
    height: height * 0.25,
    backgroundColor: "transparent",
    marginTop: 9,
    alignSelf: "center",
    overflow: "hidden",
  },
  scrollArea_contentContainerStyle: {
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: "center",
    
  },
  bgImage: {
    borderRadius: 21,
    opacity: 1,
    height: 180,
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  loremIpsum2: {
    width: 150,
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
    fontSize: width * 0.05,
    marginTop: -280,
    marginRight: 130,
    textAlign: "left",
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  button: {
    width:130,
    height:30,
    backgroundColor: "#004d40",
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    position:'absolute',
    alignSelf: 'flex-start', // Aligned button to the left under the text
    marginLeft: -139, // Added some margin to position button nicely
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: width * 0.03,
  },
  rect: {
    width: width * 0.8, // Adjusted to fit background and content
    height: height * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 140,
    height: 140,
    marginLeft: 170,
    marginTop: -100,
    position: 'absolute',
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  card: {
    width: width * 0.8,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginLeft:35,
    elevation: 5,
    shadowColor: "#004d40",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  page: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
