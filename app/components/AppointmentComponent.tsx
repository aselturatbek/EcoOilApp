import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  'modals/AppointmentsScreen': undefined;
  // Other screens
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'modals/AppointmentsScreen'>;

const { width, height } = Dimensions.get("window");
const doctorImage = require('../assets/images/bgdark.png'); // Doktorun resmi
const heartIcon = require('../assets/images/bgdark.png'); // Kalp simgesi

const AppointmentComponent = () => {
  const navigation = useNavigation<NavigationPropType>(); 
  return (
    <View style={styles.container}>
      {/* Üst Kısım (Doktor Bilgileri ve Kalp Simgesi) */}
      <View style={styles.header}>
        <Image source={doctorImage} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Adres Başlığı</Text>
          <Text style={styles.subtitle}>Adres Detayı</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText1}>5.5</Text>
          <FontAwesome name="tint" size={20} color="#FFD700" />
        </View>
      </View>

      {/* Derecelendirme ve Saat Bilgisi */}
      <View style={styles.detailsContainer}>
      <View style={styles.timeContainer}>
          <FontAwesome name="calendar-o" size={16} color="#777" />
          <Text style={styles.timeText}>12.09.2024</Text>
        </View>
        
        
      </View>

      {/* Randevu Butonu */}
      <View style={styles.timeContainer}>
          <FontAwesome name="clock-o" size={16} color="#777" />
          <Text style={styles.timeText}>10:30 - 17:30</Text>
        </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('modals/AppointmentsScreen')}>
        <Text style={styles.buttonText}>Talep Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:10,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#888',
  },
  heartIcon: {
    marginLeft: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    marginRight: 5,
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#004d40',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
  },
});

export default AppointmentComponent;
