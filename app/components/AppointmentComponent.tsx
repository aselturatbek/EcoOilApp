import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { Appointment } from "@/constants";
import { useUser } from "@/app/auth/UserContext";
import Constants from "expo-constants";

type RootStackParamList = {
    Home: undefined;
    'modals/AppointmentsScreen': undefined;
    // Other screens
};

type NavigationPropType = StackNavigationProp<RootStackParamList, 'modals/AppointmentsScreen'>;

const { width, height } = Dimensions.get("window");
const doctorImage = require('../assets/images/bgdark.png');

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

const AppointmentComponent = ({ refreshing }: { refreshing: boolean }) => {
    const navigation = useNavigation<NavigationPropType>();
    const { user } = useUser();
    const [lastAppointment, setLastAppointment] = useState<Appointment>();

    const [isUserHaveAppointment, setIsUserHaveAppointment] = useState(false);

    useEffect(() => {
        if (refreshing) {
            fetchLastAppointment();
            if (lastAppointment?.id) {
                setIsUserHaveAppointment(true);
            }
            else {
                setIsUserHaveAppointment(false);
            }
        }
    }, [refreshing]);

    useEffect(() => {
        fetchLastAppointment();
    }, [lastAppointment]);

    const fetchLastAppointment = async () => {
        try {
            const response = await fetch(`${API_URL}/api/userLatestAppointment/${user?.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data) {
                setLastAppointment(data);
                if (lastAppointment?.id) {
                    setIsUserHaveAppointment(true);
                }
            } else {
                console.warn('No appointment data found');
            }
        } catch (error) {
            setIsUserHaveAppointment(false);
            console.error('Failed to fetch the last appointment:', error);
        }
    }

    return (
        <View>
            {isUserHaveAppointment ? (
                <View style={styles.container}>
                    <View>
                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 16,
                            color: '#333',
                            marginBottom: 20,
                        }}>Yaklaşan Randevu</Text>
                    </View>
                    <View style={styles.header}>
                        <Image source={doctorImage} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{lastAppointment?.address?.address_name}</Text>
                            <Text style={styles.subtitle}>{lastAppointment?.address?.address_line_1}</Text>
                        </View>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText1}>{lastAppointment?.amount}</Text>
                            <FontAwesome name="tint" size={20} color="#FFD700" />
                        </View>
                    </View>

                    {/* Derecelendirme ve Saat Bilgisi */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.timeContainer}>
                            <FontAwesome name="calendar-o" size={16} color="#777" />
                            <Text style={styles.timeText}>{
                                lastAppointment?.date ? new Date(lastAppointment.date).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }) : ''
                            }</Text>
                        </View>
                    </View>

                    {/* Randevu Butonu */}
                    <View style={styles.timeContainer}>
                        <FontAwesome name="clock-o" size={16} color="#777" />
                        <Text style={styles.timeText}>{
                            lastAppointment?.date ? new Date(lastAppointment.date).toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            }) : ''
                        }</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('modals/AppointmentsScreen')}>
                        <Text style={styles.buttonText}>Talep Oluştur</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 16,
                            color: '#333',
                        }}>Henüz Randevunuz Yok</Text>

                        <Text style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 14,
                            color: '#777',
                            textAlign: 'center',
                            marginVertical: 10,
                        }}>Atık yağlarınızı teslim etmek için 'Talep Oluştur' butonuna basarak hemen yeni bir randevu oluşturabilirsiniz.</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <TouchableOpacity style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: '#004d40',
                            paddingVertical: 12,
                            borderRadius: 12,
                            width: 250,
                        }} onPress={() => navigation.navigate('modals/AppointmentsScreen')}>
                            <Text style={{
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 16,
                                color: '#fff',
                            }}>Talep Oluştur</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 10,
        marginHorizontal: width * 0.045,
        padding: 15,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
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
