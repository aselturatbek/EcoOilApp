import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/app/auth/UserContext';
import { User } from '@/constants';
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'http://localhost:8000';


const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const [editUsername, setEditUsername] = useState(user?.username);
    const [editName, setEditName] = useState(user?.name);
    const [editSurname, setEditSurname] = useState(user?.surname);
    const [editEmail, setEditEmail] = useState(user?.email);
    const [editPhone, setEditPhone] = useState(user?.phone);
    const [role, setRole] = useState(user?.role);
    const [editProfilePhoto, setEditProfilePhoto] = useState(user?.profile_photo_url);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // const handleSave = async () => {
    //     setLoading(true);
    //     try {
    //         if (user) {
    //             const updatedUser = {
    //                 ...user,
    //                 ...form,
    //                 profile_photo_url: image || user.profile_photo_url,
    //             };
    //             setUser(updatedUser);
    //         }
    //
    //         Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
    //         navigation.goBack();
    //     } catch (error) {
    //         Alert.alert('Hata', 'Güncelleme sırasında bir hata oluştu');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // save function to /api/user/ url
    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/updateUser/${user?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: editUsername,
                    name: editName,
                    surname: editSurname,
                    email: editEmail,
                    phone: editPhone,
                    role: role,
                    profile_photo_url: image || user?.profile_photo_url,
                }),
            });
            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Hata');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FeatherIcon name="arrow-left" size={24} color="#004d40" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Profil Düzenle</Text>

                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={pickImage}
                    >
                        <Image
                            source={{
                                uri: image || user?.profile_photo_url || '',
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraIcon}>
                            <FeatherIcon name="camera" size={20} color="white" />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ad</Text>
                            <View style={styles.inputWrapper}>
                                <FeatherIcon name="user" size={20} color="#004d40" />
                                <TextInput
                                    style={styles.input}
                                    value={editName}
                                    onChangeText={e => setEditName(e)}
                                    placeholder="Adınız"
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Soyad</Text>
                            <View style={styles.inputWrapper}>
                                <FeatherIcon name="user" size={20} color="#004d40" />
                                <TextInput
                                    style={styles.input}
                                    value={editSurname}
                                    onChangeText={setEditSurname}
                                    placeholder="Soyadınız"
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>E-posta</Text>
                            <View style={styles.inputWrapper}>
                                <FeatherIcon name="mail" size={20} color="#004d40" />
                                <TextInput
                                    style={styles.input}
                                    value={user?.email}
                                    keyboardType="email-address"
                                    editable={false} // E-posta değiştirilemez
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Telefon</Text>
                            <View style={styles.inputWrapper}>
                                <FeatherIcon name="phone" size={20} color="#004d40" />
                                <TextInput
                                    style={styles.input}
                                    value={user?.phone}
                                    keyboardType="phone-pad"
                                    placeholder="Telefon numaranız"
                                    editable={false}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.disabledButton]}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Kaydet</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        paddingHorizontal: 20
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004d40',
        textAlign: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 30,
        backgroundColor: "#E0E0E0",
        borderRadius: 100,
        padding: 10,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#004d40',
        borderRadius: 20,
        padding: 8,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#004d40',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingBottom: 8,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#004d40',
    },
    button: {
        backgroundColor: '#004d40',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default EditProfileScreen;
