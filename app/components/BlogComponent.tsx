import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");
const bgBlog = require('../assets/images/bgblog1.png');

const BlogComponent = () => {
  return (
      <View style={styles.wrapper}>
        <ImageBackground
            style={styles.blogBox}
            source={bgBlog}
            imageStyle={styles.bgImage}
        >
          <View style={styles.textBox}>
            <Text style={styles.text}>Geri Dönüştür ve Ödüller Kazan!</Text>
          </View>
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: width * 0.045,
    marginTop: -10,
    marginBottom: 0,
  },
  blogBox: {
    width: '100%',
    height: height * 0.14, // küçültülmüş yükseklik
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    borderRadius: 18,
    resizeMode: 'cover',
    transform: [{ scaleX: -1 }],
  },
  textBox: {
    backgroundColor: 'rgba(0, 77, 64, 0.3)',
    width: '100%',
    height: height * 0.14, // küçültülmüş yükseklik
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.048, // biraz küçültüldü
    color: '#fff',
    textAlign: 'center',

  },
});

export default BlogComponent;
