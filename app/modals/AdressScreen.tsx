import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Dimensions, SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Address {
    id: string;
    title: string;
    details: string;
}

const { width, height } = Dimensions.get('window');

const AdressScreen: React.FC = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addressTitle, setAddressTitle] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    const saveAddress = () => {
        if (addressTitle && addressDetails) {
            const newAddress = {
                id: Math.random().toString(),
                title: addressTitle,
                details: addressDetails,
            };
            setAddresses([...addresses, newAddress]);
            setAddressTitle('');
            setAddressDetails('');
            setModalVisible(false);
            Alert.alert('Başarılı!', 'Adres başarıyla kaydedildi.');
        } else {
            Alert.alert('Hata!', 'Lütfen tüm alanları doldurun.');
        }
    };

    const editAddress = () => {
        if (selectedAddress && addressTitle && addressDetails) {
            setAddresses(addresses.map(addr =>
                addr.id === selectedAddress.id
                    ? { ...addr, title: addressTitle, details: addressDetails }
                    : addr
            ));
            setSelectedAddress(null);
            setAddressTitle('');
            setAddressDetails('');
            setEditModalVisible(false);
            Alert.alert('Başarılı!', 'Adres başarıyla güncellendi.');
        } else {
            Alert.alert('Hata!', 'Lütfen tüm alanları doldurun.');
        }
    };

    const deleteAddress = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
        Alert.alert('Başarılı!', 'Adres başarıyla silindi.');
    };

    const openEditModal = (address: Address) => {
        setSelectedAddress(address);
        setAddressTitle(address.title);
        setAddressDetails(address.details);
        setEditModalVisible(true);
    };

    const renderAddressItem = ({ item }: { item: Address }) => (
        <View style={styles.addressItem}>
            <Ionicons name="location-outline" size={24} color="#004d40" style={styles.icon} />
            <View style={{ flex: 1 }}>
                <Text style={[styles.addressTitle, styles.montserratBold]}>{item.title}</Text>
                <Text style={[styles.addressDetails, styles.montserratText]}>{item.details}</Text>
            </View>
            <TouchableOpacity onPress={() => openEditModal(item)}>
                <Feather name="edit" size={24} color="#004d40" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                <Feather name="trash" size={24} color="#C62828" style={styles.actionIcon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#004d40" />
            </TouchableOpacity>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.title, styles.montserratBold]}>Adreslerim</Text>
            </View>

            <FlatList
                style={{ marginTop: 20 }}
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={renderAddressItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, styles.montserratText]}>
                        Henüz kayıtlı adres yok.
                    </Text>
                }
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Feather name="plus" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Yeni Adres Ekleme Modalı */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, styles.montserratBold]}>Yeni Adres Ekle</Text>

                        <View style={styles.inputGroup}>
                            <Feather name="tag" size={20} color="#004d40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Adres Başlığı (Örn: Ev, İş)"
                                placeholderTextColor="#757575"
                                value={addressTitle}
                                onChangeText={setAddressTitle}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Adres (Sokak, Şehir, Posta Kodu)"
                                placeholderTextColor="#757575"
                                value={addressDetails}
                                onChangeText={setAddressDetails}
                                multiline
                            />
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={saveAddress}>
                                <Text style={[styles.saveButtonText, styles.montserratText]}>Kaydet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={[styles.saveButtonText, styles.montserratText]}>İptal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Adres Düzenleme Modalı */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, styles.montserratBold]}>Adresi Düzenle</Text>

                        <View style={styles.inputGroup}>
                            <Feather name="tag" size={20} color="#004d40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Adres Başlığı (Örn: Ev, İş)"
                                placeholderTextColor="#757575"
                                value={addressTitle}
                                onChangeText={setAddressTitle}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Adres (Sokak, Şehir, Posta Kodu)"
                                placeholderTextColor="#757575"
                                value={addressDetails}
                                onChangeText={setAddressDetails}
                                multiline
                            />
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={editAddress}>
                                <Text style={[styles.saveButtonText, styles.montserratText]}>Güncelle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <Text style={[styles.saveButtonText, styles.montserratText]}>İptal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#004d40',
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 100,
        width: "100%",
        alignItems: 'center',
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        width: width * 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    actionIcon: {
        marginLeft: 10,
    },
    addressTitle: {
        fontSize: 18,
        color: '#004d40',
    },
    addressDetails: {
        fontSize: 16,
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#757575',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#004d40',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        color: '#004d40',
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#004d40',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#C62828',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    saveButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    montserratText: {
        fontFamily: 'Montserrat-Regular',
    },
    montserratBold: {
        fontFamily: 'Montserrat-Bold',
    },
});

export default AdressScreen;
