import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image, SafeAreaView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {useUser} from "@/app/auth/UserContext";
import {User} from "@/constants";

const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState<string | null>(null);

    const { user, setUser } = useUser();

    const [form, setForm] = useState<User>({
        created_at: "",
        deleted_at: "",
        updated_at: "",
        id: user?.id || 0,
        username: user?.username || "",
        name: user?.name || "",
        surname: user?.surname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        profile_photo_url: user?.profile_photo_url || "",
        email_verified_at: ""
    });

    const handleInputChange = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const renderInput = (
        placeholder: string,
        icon: string,
        key: keyof typeof form,
        value: string,
        secureTextEntry: boolean = false
    ) => (
        <View style={styles.inputGroup} key={key}>
            <Text style={styles.label}>{placeholder}</Text>
            <View style={styles.inputRow}>
                <FeatherIcon name={icon} size={20} color="#004d40" />
                <TextInput
                    style={[styles.input, styles.montserratText]}
                    placeholder={placeholder}
                    placeholderTextColor="#004d40"
                    value={value}
                    onChangeText={(text) => handleInputChange(key, text)}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FeatherIcon name="arrow-left" size={24} color="#004d40" />
                    </TouchableOpacity>

                    <Text style={[styles.title, styles.montserratText]}>Profil Düzenle</Text>

                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <View style={styles.imageContainer}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.profileImage} />
                            ) : (
                                <Image
                                    source={{ uri: user?.profile_photo_url }}
                                    style={styles.profileImage}
                                />
                            )}
                        </View>
                        <Text style={[styles.imageText, styles.montserratText]}>
                            Profil Resmi Seç
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.formContainer}>
                        {renderInput('Kullanıcı Adı', 'at-sign', 'username', form.username)}
                        {renderInput('İsim Soyisim', 'user', 'name', form.name)}
                        {renderInput('Telefon Numarası', 'phone', 'phone', form.phone)}
                        {renderInput('E-posta', 'mail', 'email', form.email)}


                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => Alert.alert('Profil Güncellendi')}
                        >
                            <Text style={[styles.saveButtonText, styles.montserratText]}>Kaydet</Text>
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
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 28,
        color: '#004d40',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#004d40',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageText: {
        fontSize: 16,
        color: '#004d40',
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#004d40',
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#004d40',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#004d40',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    montserratText: {
        fontFamily: 'Montserrat-regular',
    },
});

export default EditProfileScreen;
