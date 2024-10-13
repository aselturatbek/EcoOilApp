import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

interface Appointment {
    id: string;
    address: string;
    date: string;
    oilAmount: string;
}

const AppointmentsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [newAppointment, setNewAppointment] = useState({
        address: '',
        date: new Date(),
        oilAmount: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const addAppointment = () => {
        if (newAppointment.address && newAppointment.oilAmount && newAppointment.date) {
            setAppointments([
                ...appointments,
                { id: Math.random().toString(), ...newAppointment, date: newAppointment.date.toLocaleString() },
            ]);
            setNewAppointment({ address: '', date: new Date(), oilAmount: '' });
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FeatherIcon name="arrow-left" size={24} color="#004d40" />
                </TouchableOpacity>

                <Text style={styles.title}>Randevularım</Text>

                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentItem}>
                            <Text style={styles.appointmentAddress}>Adres: {item.address}</Text>
                            <Text style={styles.appointmentDate}>Tarih/Saat: {item.date}</Text>
                            <Text style={styles.appointmentOil}>Yağ Miktarı: {item.oilAmount}</Text>
                            <TouchableOpacity onPress={() => setAppointments(appointments.filter((a) => a.id !== item.id))}>
                                <FeatherIcon name="trash-2" size={20} color="#C62828" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Henüz randevu eklenmedi.</Text>
                    }
                />

                <View style={styles.formContainer}>
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

                    <TouchableOpacity style={styles.addButton} onPress={addAppointment}>
                        <Text style={styles.addButtonText}>Ekle</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    },
    appointmentItem: {
        backgroundColor: '#E6E6E6',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
    },
    appointmentAddress: {
        fontSize: 16,
        color: '#004d40',
        marginBottom: 5,
    },
    appointmentDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
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
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#004d40',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#004d40',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    datePickerButton: {
        width: '100%',
        backgroundColor: '#E6E6E6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    datePickerText: {
        color: '#004d40',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#004d40',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AppointmentsScreen;
