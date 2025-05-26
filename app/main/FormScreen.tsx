import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";

const { width, height } = Dimensions.get("window");

function FormScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = () => {
        // İşlemler burada yapılır, örneğin form verilerini göndermek
        alert('Form gönderildi');
        alert('Form gönderildi');
    };

    return (
        <ImageBackground style={styles.container} source={require('../assets/images/bgheader.jpg')}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Atık Yağ Teslim Formu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Adınız"
                    placeholderTextColor="#888"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-posta"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Yağ Miktarı (litre)"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Gönder</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.05,
    },
    innerContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 21,
        padding: 20,
        elevation: 5, // Android için
        shadowColor: "#000", // iOS için
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        color: '#121212',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 20,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#6fdb64',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 20,
        elevation: 5, // Android için
        shadowColor: "#000", // iOS için
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 18,
    },
});

export default FormScreen;
