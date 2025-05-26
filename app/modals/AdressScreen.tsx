import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Dimensions, SafeAreaView, ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useUser} from "@/app/auth/UserContext";
import Constants from "expo-constants";
import { Address } from '@/constants';
import {Picker} from "@react-native-picker/picker";
import {Dropdown} from "react-native-element-dropdown";


const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';

const { width, height } = Dimensions.get('window');

const AdressScreen: React.FC = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [addressName, setAddressName] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [mahalle, setMahalle] = useState('');
    const [ilce, setIlce] = useState('');
    const [il, setIl] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    const openEditModal = (address: Address) => {
        setSelectedAddress(address);
        setAddressName(address.address_name);
        setAddressDetails(address.address_line_1);
        setEditModalVisible(true);
    };

    const { user } = useUser();
    const [userAddresses, setUserAddresses] = useState<Address[]>([]);

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user_addresses/${user?.id}`);
            const data = await response.json();
            setUserAddresses(data);
        } catch (error) {
            console.error('Adresler alınamadı.', error);
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleDelete = async (address: Address) => {
        try {
            await fetch(`${API_URL}/api/addresses/${address.id}`, {
                method: 'DELETE',
            });
            fetchAddresses();
        } catch (error) {
            console.error('Adres silinemedi.', error);
        }
    }

    // const handleAddAddress = async () => {
    //     if (!addressDetails.trim()) {
    //         Alert.alert('Uyarı', 'Lütfen tam adres bilgisi giriniz (Cadde, Sokak, Bina No, İlçe, Şehir)');
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch(`${API_URL}/api/addresses`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 address_name: addressName,
    //                 address_line_1: addressDetails,
    //                 user_id: user?.id,
    //             }),
    //         });
    //
    //         const data = await response.json();
    //
    //         if (!response.ok) {
    //             throw new Error(data.message || 'Adres eklenemedi');
    //         }
    //
    //         setUserAddresses([...userAddresses, data.data]);
    //         setModalVisible(false);
    //         Alert.alert('Başarılı', 'Adres başarıyla eklendi');
    //     } catch (error) {
    //         Alert.alert('Hata', (error instanceof Error ? error.message : 'Adres eklenirken bir hata oluştu'));
    //     }
    // }

    const handleAddAddress = async () => {
        // example request body
        //        {
        //            "address_name": "Ev Adresi",
        //            "Mahalle": "Kocatepe Mahallesi",
        //            "İlçe": "Kocasinan",
        //            "İl": "Kayseri",
        //        }

        if (!addressName.trim() || !mahalle.trim() || !ilce.trim() || !il.trim()) {
            Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
            return;
        }
        // mahalle, ilce, il bilgilerini tek bir string olarak birleştiriyoruz
        const fullAddress = `${mahalle}, ${ilce}/${il}`;

        try {
            const response = await fetch(`${API_URL}/api/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address_name: addressName,
                    address_line_1: fullAddress,
                    user_id: user?.id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Adres eklenemedi');
            }

            setUserAddresses([...userAddresses, data.data]);
            setModalVisible(false);
            Alert.alert('Başarılı', 'Adres başarıyla eklendi');
        } catch (error) {
            Alert.alert('Hata', (error instanceof Error ? error.message : 'Adres eklenirken bir hata oluştu'));
        }
    }

    const renderAddressItem = ({ item }: { item: Address }) => (
        <View style={styles.addressItem}>
            <Ionicons name="location-outline" size={24} color="#004d40" style={styles.icon} />
            <View style={{ flex: 1 }}>
                <Text style={[styles.addressTitle, styles.montserratBold]}>{item.address_name}</Text>
                <Text style={[styles.addressDetails, styles.montserratText]}>{item.address_line_1}</Text>
            </View>
            <TouchableOpacity onPress={() => openEditModal(item)}>
                <Feather name="edit" size={24} color="#004d40" style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="trash" size={24} color="#C62828" style={styles.actionIcon} />
            </TouchableOpacity>
        </View>
    );

    const cities = [
        { label: 'Adana', value: 'Adana' },
        { label: 'Adıyaman', value: 'Adıyaman' },
        { label: 'Afyonkarahisar', value: 'Afyonkarahisar' },
        { label: 'Ağrı', value: 'Ağrı' },
        { label: 'Aksaray', value: 'Aksaray' },
        { label: 'Amasya', value: 'Amasya' },
        { label: 'Ankara', value: 'Ankara' },
        { label: 'Antalya', value: 'Antalya' },
        { label: 'Ardahan', value: 'Ardahan' },
        { label: 'Artvin', value: 'Artvin' },
        { label: 'Aydın', value: 'Aydın' },
        { label: 'Balıkesir', value: 'Balıkesir' },
        { label: 'Bartın', value: 'Bartın' },
        { label: 'Batman', value: 'Batman' },
        { label: 'Bayburt', value: 'Bayburt' },
        { label: 'Bilecik', value: 'Bilecik' },
        { label: 'Bingöl', value: 'Bingöl' },
        { label: 'Bitlis', value: 'Bitlis' },
        { label: 'Bolu', value: 'Bolu' },
        { label: 'Burdur', value: 'Burdur' },
        { label: 'Bursa', value: 'Bursa' },
        { label: 'Çanakkale', value: 'Çanakkale' },
        { label: 'Çankırı', value: 'Çankırı' },
        { label: 'Çorum', value: 'Çorum' },
        { label: 'Denizli', value: 'Denizli' },
        { label: 'Diyarbakır', value: 'Diyarbakır' },
        { label: 'Düzce', value: 'Düzce' },
        { label: 'Edirne', value: 'Edirne' },
        { label: 'Elazığ', value: 'Elazığ' },
        { label: 'Erzincan', value: 'Erzincan' },
        { label: 'Erzurum', value: 'Erzurum' },
        { label: 'Eskişehir', value: 'Eskişehir' },
        { label: 'Gaziantep', value: 'Gaziantep' },
        { label: 'Giresun', value: 'Giresun' },
        { label: 'Gümüşhane', value: 'Gümüşhane' },
        { label: 'Hakkari', value: 'Hakkari' },
        { label: 'Hatay', value: 'Hatay' },
        { label: 'Iğdır', value: 'Iğdır' },
        { label: 'Isparta', value: 'Isparta' },
        { label: "İstanbul", value:"İstanbul"},
    ];



    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#004d40" />
            </TouchableOpacity>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 24 }}>
                <Text style={[styles.title, styles.montserratBold]}>Adreslerim</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 42, gap: 10, display: "flex" }}
                showsVerticalScrollIndicator={false}
            >
                {userAddresses.map((userAddress) => (
                    <View style={styles.addressItem} key={userAddress.id}>
                        <Ionicons name="location-outline" size={24} color="#004d40" style={styles.icon} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.addressTitle, styles.montserratBold]}>{userAddress.address_name}</Text>
                            <Text
                                style={[styles.addressDetails, styles.montserratText]}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >{userAddress.address_line_1}</Text>
                        </View>
                        {/*<TouchableOpacity onPress={() => openEditModal(userAddress)}>*/}
                        {/*    <Feather name="edit" size={24} color="#004d40" style={styles.actionIcon} />*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity onPress={() => handleDelete(userAddress)}>
                            <Feather name="trash" size={24} color="#C62828" style={styles.actionIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

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
                    <View style={{
                        width: '90%',
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 26,
                        alignItems: 'center',
                        display: 'flex',
                        gap: 10,
                    }}>
                        <Text style={[styles.modalTitle, styles.montserratBold]}>Yeni Adres Ekle</Text>

                        <View style={{
                            display: 'flex',
                            width: '100%',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Montserrat-Bold',
                                color: '#004d40',
                                marginBottom: 4,
                                marginHorizontal: 4
                            }}>
                                Adres Başlığı
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 6,
                                paddingHorizontal: 16,
                                marginBottom: 10
                            }}>
                                <Feather name="tag" size={20} color="#004d40" style={styles.inputIcon} />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: 50,
                                        fontSize: 16,
                                    }}
                                    placeholder="Adres Başlığı (Örn: Ev, İş)"
                                    placeholderTextColor="#757575"
                                    value={addressName}
                                    onChangeText={setAddressName}
                                />
                            </View>

                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Montserrat-Bold',
                                color: '#004d40',
                                marginBottom: 4,
                                marginHorizontal: 4
                            }}>
                                Mahalle
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 6,
                                paddingHorizontal: 16,
                                marginBottom: 10
                            }}>
                                <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: 50,
                                        fontSize: 16,
                                    }}
                                    placeholder="Mahalle (Örn: Bartın Merkez Mahallesi)"
                                    placeholderTextColor="#757575"
                                    value={mahalle}
                                    onChangeText={setMahalle}
                                />
                            </View>

                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Montserrat-Bold',
                                color: '#004d40',
                                marginBottom: 4,
                                marginHorizontal: 4
                            }}>
                                İlçe
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 6,
                                paddingHorizontal: 16,
                                marginBottom: 10
                            }}>
                                <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: 50,
                                        fontSize: 16,
                                    }}
                                    placeholder="İlçe (Örn: Cumhuriyet Mahallesi)"
                                    placeholderTextColor="#757575"
                                    value={ilce}
                                    onChangeText={setIlce}
                                />
                            </View>

                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'Montserrat-Bold',
                                color: '#004d40',
                                marginBottom: 4,
                                marginHorizontal: 4
                            }}>
                                İl
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 6,
                                paddingHorizontal: 16,
                                marginBottom: 10
                            }}>
                                <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={cities}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Şehir' : '...'}
                                    searchPlaceholder="Arama..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIl(item.value);
                                        setValue(item.value)
                                        setIsFocus(false);
                                        console.log(`Seçilen şehir: ${il}`);
                                    }}
                                />
                            </View>
                        </View>


                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={() => {handleAddAddress()}}>
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
            {/*<Modal*/}
            {/*    visible={editModalVisible}*/}
            {/*    animationType="slide"*/}
            {/*    transparent={true}*/}
            {/*    onRequestClose={() => setEditModalVisible(false)}*/}
            {/*>*/}
            {/*    <KeyboardAvoidingView*/}
            {/*        behavior={Platform.OS === 'ios' ? 'padding' : undefined}*/}
            {/*        style={styles.modalContainer}*/}
            {/*    >*/}
            {/*        <View style={styles.modalContent}>*/}
            {/*            <Text style={[styles.modalTitle, styles.montserratBold]}>Adresi Düzenle</Text>*/}

            {/*            <View style={styles.inputGroup}>*/}
            {/*                <Feather name="tag" size={20} color="#004d40" style={styles.inputIcon} />*/}
            {/*                <TextInput*/}
            {/*                    style={styles.input}*/}
            {/*                    placeholder="Adres Başlığı (Örn: Ev, İş)"*/}
            {/*                    placeholderTextColor="#757575"*/}
            {/*                    value={addressName}*/}
            {/*                    onChangeText={setAddressName}*/}
            {/*                />*/}
            {/*            </View>*/}

            {/*            <View style={styles.inputGroup}>*/}
            {/*                <Feather name="map-pin" size={20} color="#004d40" style={styles.inputIcon} />*/}
            {/*                <TextInput*/}
            {/*                    style={styles.input}*/}
            {/*                    placeholder="Adres (Sokak, Şehir, Posta Kodu)"*/}
            {/*                    placeholderTextColor="#757575"*/}
            {/*                    value={addressDetails}*/}
            {/*                    onChangeText={setAddressDetails}*/}
            {/*                    multiline*/}
            {/*                />*/}
            {/*            </View>*/}

            {/*            <View style={styles.modalButtonContainer}>*/}
            {/*                <TouchableOpacity style={styles.saveButton}>*/}
            {/*                    <Text style={[styles.saveButtonText, styles.montserratText]}>Güncelle</Text>*/}
            {/*                </TouchableOpacity>*/}
            {/*                <TouchableOpacity*/}
            {/*                    style={styles.cancelButton}*/}
            {/*                    onPress={() => setEditModalVisible(false)}*/}
            {/*                >*/}
            {/*                    <Text style={[styles.saveButtonText, styles.montserratText]}>İptal</Text>*/}
            {/*                </TouchableOpacity>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </KeyboardAvoidingView>*/}
            {/*</Modal>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderRadius: 6,
        paddingHorizontal: 8,
        width: '90%'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#757575',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    container: {
        alignItems: "center",
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        height: height,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginHorizontal: 20
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
        width: width * 0.9,
        height: 102,
        borderWidth: 0.17,
        borderColor: '#c5c5c5',
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
    inputMulti: {
      flex: 1,
      height: 120,
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
