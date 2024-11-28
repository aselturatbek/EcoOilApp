import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const Statistics = () => {
  return (
    <View>
      <Text style={styles.loremIpsum2}>
        Geri Dönüşümler
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, styles.box1]}>
          <FontAwesome5 name="recycle" style={styles.statIcon} />
          <Text style={styles.statText}>150</Text>
          <Text style={styles.statLabel}>EcoOil Puan</Text>
        </View>
        <View style={[styles.statBox, styles.box2]}>
          <FontAwesome5 name="calendar-check" style={styles.statIcon} />
          <Text style={styles.statText}>150</Text>
          <Text style={styles.statLabel}>Toplama Noktası</Text>
        </View>
        <View style={[styles.statBox, styles.box3]}>
          <FontAwesome5 name="user" style={styles.statIcon} />
          <Text style={styles.statText}>150</Text>
          <Text style={styles.statLabel}>Kullanıcı</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loremIpsum2: {
    fontFamily: "Montserrat-Bold",
    color: "#004d40",
    fontSize: 18, // Sabit font boyutu
    marginTop: 10,
    marginLeft:10
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: 10,
  },
  statBox: {
    width: '30%',
    height: height * 0.12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#004d40',
    elevation: 5, // Android için gölge
    shadowColor: '#000', // iOS için gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  box1: {
    backgroundColor: '#004d40',
    opacity: 0.6,
  },
  box2: {
    backgroundColor: '#004d40',
    opacity: 0.7,
  },
  box3: {
    backgroundColor: '#004d40',
    opacity: 0.8,
  },
  statIcon: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 5,
  },
  statText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});

export default Statistics;
