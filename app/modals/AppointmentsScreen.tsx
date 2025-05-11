import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    Modal, SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {Address, Appointment, Transaction} from "@/constants";
import Constants from 'expo-constants';
import { useUser } from "@/app/auth/UserContext";
import {flex} from "nativewind/dist/postcss/to-react-native/properties/flex";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

const AppointmentsScreen: React.FC = () => {
    const { user } = useUser();

    const navigation = useNavigation();
    const [newAppointment, setNewAppointment] = useState({
        address_id: '',
        date: new Date(),
        oilAmount: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState<'current' | 'past'>('current');

    const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

    const [userAddresses, setUserAddresses] = useState<Address[]>([]);

    const [allTransaction, setAllTransaction] = useState<Transaction[]>([]);

    const fetchAppointments = async () => {
        const response = await fetch(`${API_URL}/api/userAppointments/${user?.id}`);
        const data = await response.json();
        // filter if appointment is in transactions
        setUserAppointments(data);
    }

    const fetchAddresses = async () => {
        const response = await fetch(`${API_URL}/api/user_addresses/${user?.id}`);
        const data = await response.json();
        setUserAddresses(data);
    }

    useEffect(() => {
        if (userAddresses.length > 0 && !newAppointment.address_id) {
            setNewAppointment({ ...newAppointment, address_id: userAddresses[0].id });
        }
    }, [userAddresses]);

    useEffect(() => {
        fetchAddresses();
        fetchAppointments();
    }, []);

    const handleAddAppointment = async () => {
        const response = await fetch(`${API_URL}/api/add_appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_id: user?.id,
                collector_id: null,
                address_id: newAppointment.address_id,
                date: newAppointment.date,
                amount: newAppointment.oilAmount,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setUserAppointments([...userAppointments, data]);
            setNewAppointment({ address_id: '', date: new Date(), oilAmount: '' });
            setShowModal(false);
            fetchAppointments();
            Alert.alert('Randevu Eklendi');
        } else {
            Alert.alert('Randevu eklenirken bir hata oluştu.');
        }
    }

    const handleDeleteAppointment = async (id: number) => {
        const response = await fetch(`${API_URL}/api/appointments/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setUserAppointments(userAppointments.filter((a) => a.id !== id));
            Alert.alert('Randevu Silindi');
        } else {
            Alert.alert('Randevu silinirken bir hata oluştu.');
        }
    }

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setNewAppointment({ ...newAppointment, date: selectedDate });
        }
    };

    const fetchTransactions = async () => {
        const response = await fetch(`${API_URL}/api/transactions/${user?.id}`);
        const data = await response.json();
        setAllTransaction(data);
    }

    const handleAddTransaction = async (customer_id : number, appointment_id : number, address_id : number, amount : number) => {
        const response = await fetch(`${API_URL}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                user_id: customer_id,
                address_id: address_id,
                appointment_id: appointment_id,
                points: amount,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            Alert.alert('İşlem Eklendi');
        } else {
            Alert.alert('İşlem eklenirken bir hata oluştu.');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FeatherIcon name="arrow-left" size={24} color="#004d40" />
                </TouchableOpacity>

                <Text style={styles.title}>Randevularım</Text>

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

                {userAppointments.map((appointment, index) => (
                    <View style={styles.appointmentItem} key={index}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.appointmentInfoContainer}>
                                <FontAwesome5 name="map-marker-alt" size={16} color="#004d40" style={styles.icon} />
                                <Text style={styles.appointmentAddress}>
                                    Adres: {appointment?.address?.address_name}
                                </Text>
                            </View>
                            <View style={styles.appointmentInfoContainer}>
                                <Text style={styles.appointmentDate}>Tarih/Saat: {appointment.date}</Text>
                            </View>
                            <View style={styles.appointmentInfoContainer}>
                                <Text style={styles.appointmentOil}>Yağ Miktarı: {appointment.amount} Litre</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            {user?.role !== 'user' ? (
                                <TouchableOpacity
                                    style={{marginRight: 16}}
                                    onPress={() => {
                                        handleAddTransaction(appointment.customer_id, appointment.id, appointment.address_id, appointment.amount);
                                    }}>
                                    <FeatherIcon name="check" size={20} color="#059669" />
                                </TouchableOpacity>
                            ) : null }
                            <TouchableOpacity
                                onPress={() => Alert.alert(
                                    'Uyarı',
                                    `Bu randevuyu silmek istediğinize emin misiniz?`,
                                    [
                                        {
                                            text: 'İptal',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Sil',
                                            onPress: async () => {
                                                await handleDeleteAppointment(appointment.id)
                                            }
                                        },
                                    ],
                                )}>
                                <FeatherIcon name="trash-2" size={20} color="#C62828" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {
                    user?.role === 'user' ? (
                        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
                            <FeatherIcon name="plus" size={20} color="#004d40" style={styles.addButtonIcon} />
                            <Text style={styles.addButtonText}>Yeni Randevu Ekle</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.emptyText}>Toplayıcılar randevu oluşturamaz!</Text>
                    )
                }

                <Modal visible={showModal} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Yeni Randevu Ekle</Text>

                            <Text style={styles.label}>Adres</Text>
                            <Picker
                                style={styles.input}
                                selectedValue={newAppointment.address_id}
                                onValueChange={(itemValue) => setNewAppointment({ ...newAppointment, address_id: itemValue })}
                            >
                                {userAddresses.map((address, index) => (
                                    <Picker.Item key={index} label={address.address_name} value={address.id} />
                                ))}
                            </Picker>


                            <Text style={styles.label}>Tarih / Saat</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(!showDatePicker)}
                                style={styles.datePickerButton}>
                                <MaterialCommunityIcons name="calendar" size={20} color="#004d40" style={styles.datePickerIcon} />
                                <Text style={styles.datePickerText}>
                                    {newAppointment.date.toLocaleString()}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <View style={{
                                    width: '100%',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                    padding: 10,
                                    marginBottom: 20,
                                    backgroundColor: '#f9f9f9',
                                }}>
                                    <DateTimePicker
                                        value={newAppointment.date}
                                        mode="datetime"
                                        display="compact"
                                        onChange={onDateChange}
                                        minimumDate={new Date()}
                                    />
                                </View>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        flexGrow: 1,
    },
    backButton: {
        alignSelf: 'flex-start',
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
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#004d40',
        borderBottomColor: '#004d40',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        flex: 1,
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
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
