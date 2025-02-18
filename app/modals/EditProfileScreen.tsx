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

const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const [form, setForm] = useState<Partial<User>>({
        name: user?.name || '',
        surname: user?.surname || '',
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const handleInputChange = (key: keyof User, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

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

    const handleSave = async () => {
        setLoading(true);
        try {
            // Burada API çağrısı yapılacak
            // Örnek: await updateUserProfile({ ...form, profilePhoto: image });

            // Geçici olarak context'i güncelle
            if (user) {
                const updatedUser = {
                    ...user,
                    ...form,
                    profile_photo_url: image || user.profile_photo_url,
                };
                setUser(updatedUser);
            }

            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Hata', 'Güncelleme sırasında bir hata oluştu');
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
                                uri: image || user?.profile_photo_url || 'https://via.placeholder.com/150',
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
                                    value={form.name}
                                    onChangeText={text => handleInputChange('name', text)}
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
                                    value={form.surname}
                                    onChangeText={text => handleInputChange('surname', text)}
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
                                    value={form.email}
                                    onChangeText={text => handleInputChange('email', text)}
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
                                    value={form.phone}
                                    onChangeText={text => handleInputChange('phone', text)}
                                    keyboardType="phone-pad"
                                    placeholder="Telefon numaranız"
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
        padding: 20,
        paddingTop: 40,
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
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
