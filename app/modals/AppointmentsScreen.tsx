import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {Appointment} from "@/constants";
import Constants from 'expo-constants';
import {useUser} from "@/app/auth/UserContext";


const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

interface _Appointment {
    id: string;
    address: string;
    date: string;
    oilAmount: string;
    isPast: boolean;
}

const AppointmentsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<_Appointment[]>([]);
    const [newAppointment, setNewAppointment] = useState({
        address: '',
        date: new Date(),
        oilAmount: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false); // Modal görünürlüğü
    const [tab, setTab] = useState<'current' | 'past'>('current'); // Sekmeler

    const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

    const { user } = useUser();

    const fetchAppointments = async () => {
        const response = await fetch(`${API_URL}/api/user_appointments/${user?.id}`);
        const data = await response.json();

        setUserAppointments(data);
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleAddAppointment = async () => {
        const response = await fetch(`${API_URL}/api/add_appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user?.id,
                address: newAppointment.address,
                date: newAppointment.date,
                amount: newAppointment.oilAmount,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setUserAppointments([...userAppointments, data]);
            setNewAppointment({ address: '', date: new Date(), oilAmount: '' });
            setShowModal(false);
            Alert.alert('Randevu Eklendi');
        } else {
            Alert.alert('Randevu eklenirken bir hata oluştu.');
        }
    }

    const addAppointment = () => {
        const now = new Date();
        if (newAppointment.address && newAppointment.oilAmount && newAppointment.date) {
            setAppointments([
                ...appointments,
                {
                    id: Math.random().toString(),
                    ...newAppointment,
                    date: newAppointment.date.toLocaleString(),
                    isPast: newAppointment.date < now,
                },
            ]);
            setNewAppointment({ address: '', date: new Date(), oilAmount: '' });
            setShowModal(false); // Modal'ı kapatma
            Alert.alert('Randevu Eklendi');
        } else {
            Alert.alert('Lütfen tüm alanları doldurun.');
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setNewAppointment({ ...newAppointment, date: selectedDate });
        }
    };

    const currentAppointments = appointments.filter((a) => !a.isPast);
    const pastAppointments = appointments.filter((a) => a.isPast);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FeatherIcon name="arrow-left" size={24} color="#004d40" />
                </TouchableOpacity>

                <Text style={styles.title}>Randevularım</Text>

                {/* Sekme Geçişleri */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, tab === 'current' && styles.activeTab]}
                        onPress={() => setTab('current')}>
                        <Text style={[styles.tabText, tab === 'current' && styles.activeTabText]}>
                            Mevcut Randevular
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, tab === 'past' && styles.activeTab]}
                        onPress={() => setTab('past')}>
                        <Text style={[styles.tabText, tab === 'past' && styles.activeTabText]}>
                            Geçmiş Randevular
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ width: '100%', flexGrow: 0 }}
                    data={tab === 'current' ? currentAppointments : pastAppointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentItem}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.appointmentInfoContainer}>
                                    <FontAwesome5 name="map-marker-alt" size={16} color="#004d40" style={styles.icon} />
                                    <Text style={styles.appointmentAddress}>Adres: {item.address}</Text>
                                </View>
                                <View style={styles.appointmentInfoContainer}>

                                    <Text style={styles.appointmentDate}>Tarih/Saat: {item.date}</Text>
                                </View>
                                <View style={styles.appointmentInfoContainer}>

                                    <Text style={styles.appointmentOil}>Yağ Miktarı: {item.oilAmount}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setAppointments(appointments.filter((a) => a.id !== item.id))}>
                                <FeatherIcon name="trash-2" size={20} color="#C62828" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {tab === 'current' ? 'Henüz randevu yok.' : 'Geçmiş randevu yok.'}
                        </Text>
                    }
                />
                {userAppointments.map((appointment, index) => (
                    <View style={styles.appointmentItem} key={index}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.appointmentInfoContainer}>
                                <FontAwesome5 name="map-marker-alt" size={16} color="#004d40" style={styles.icon} />
                                <Text style={styles.appointmentAddress}>Adres: {appointment.address}</Text>
                            </View>
                            <View style={styles.appointmentInfoContainer}>
                                <Text style={styles.appointmentDate}>Tarih/Saat: {appointment.date}</Text>
                            </View>
                            <View style={styles.appointmentInfoContainer}>
                                <Text style={styles.appointmentOil}>Yağ Miktarı: {appointment.amount} Litre</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setUserAppointments(userAppointments.filter((a) => a.id !== appointment.id))}>
                            <FeatherIcon name="trash-2" size={20} color="#C62828" />
                        </TouchableOpacity>
                    </View>
                ))
                }

                {/* Yeni Randevu Ekleme Butonu */}
                <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
                    <FeatherIcon name="plus" size={20} color="#004d40" style={styles.addButtonIcon} />
                    <Text style={styles.addButtonText}>Yeni Randevu Ekle</Text>
                </TouchableOpacity>

                {/* Modal */}
                <Modal visible={showModal} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Yeni Randevu Ekle</Text>

                            <Text style={styles.label}>Adres</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Adres"
                                value={newAppointment.address}
                                onChangeText={(text) =>
                                    setNewAppointment({ ...newAppointment, address: text })
                                }
                            />

                            <Text style={styles.label}>Tarih/Saat</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                style={styles.datePickerButton}>
                                <MaterialCommunityIcons name="calendar" size={20} color="#004d40" style={styles.datePickerIcon} />
                                <Text style={styles.datePickerText}>
                                    {newAppointment.date.toLocaleString()}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={newAppointment.date}
                                    mode="datetime"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}

                            <Text style={styles.label}>Yağ Miktarı (Litre)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Yağ Miktarı (Litre)"
                                keyboardType="numeric"
                                value={newAppointment.oilAmount}
                                onChangeText={(text) =>
                                    setNewAppointment({ ...newAppointment, oilAmount: text })
                                }
                            />

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalAddButton} onPress={handleAddAppointment}>
                                    <Text style={styles.modalButtonText}>Ekle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalCancelButton}
                                    onPress={() => setShowModal(false)}>
                                    <Text style={styles.modalButtonText}>İptal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Daha soft bir arka plan rengi
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        flexGrow: 1, // İçeriğin esnek büyümesini sağlamak
    },
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#004d40',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Montserrat-regular',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#E8F5E9', // Sekme arka plan rengini açtık
        borderRadius: 10,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12, // Düğme yüksekliğini artırdık
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2, // Sekme altı çizgisi
        borderBottomColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#004d40', // Aktif sekme rengi
        borderBottomColor: '#004d40', // Aktif sekme altı çizgisi rengi
    },
    tabText: {
        fontSize: 16,
        color: '#333', // Daha koyu bir metin rengi
        fontFamily: 'Montserrat-regular',
    },
    activeTabText: {
        color: '#fff',
        fontFamily: 'Montserrat-regular',
    },
    tabIcon: {
        marginRight: 5,
    },
    appointmentItem: {
        backgroundColor: '#E6E6E6',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
        flexDirection: 'row', // Randevu bilgilerini yan yana yerleştirme
        justifyContent: 'space-between', // Boşluğu eşit dağıtma
        alignItems: 'center',
        shadowColor: '#000', // Gölge ekleyerek belirgin bir görünüm
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android için gölge efekti
    },
    appointmentInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginRight: 8,
    },
    appointmentAddress: {
        fontSize: 16,
        color: '#004d40',
        flex: 1, // Alanı dolduracak şekilde ayarlama
    },
    appointmentDate: {
        fontSize: 14,
        color: '#555',
    },
    appointmentOil: {
        fontSize: 14,
        color: '#555',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginVertical: 20,
        fontFamily: 'Montserrat-regular',
    },
    addButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#004d40',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-regular',
        marginLeft: 10,
    },
    addButtonIcon: {
        marginRight: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Arka planda yarı saydam bir katman
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#004d40',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#004d40',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
    },
    datePickerText: {
        color: '#004d40',
        marginLeft: 10,
    },
    datePickerIcon: {
        marginRight: 8,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalAddButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    modalCancelButton: {
        backgroundColor: '#C62828',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AppointmentsScreen;
