import React, { useEffect } from 'react'; // Import useEffect from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MyImage from '../assets/logo2.jpg';

const Start = ({ route, navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={styles.container}>
            <Image source={MyImage} style={styles.image} />

            <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegisterPress} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '80%',
        height: '50%',
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginTop: 40,
        borderColor: '#F76363',
        borderWidth: 1.5,
        width: '80%'
    },
    buttonText: {
        color: '#FF2C2C',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
});


export default Start;
