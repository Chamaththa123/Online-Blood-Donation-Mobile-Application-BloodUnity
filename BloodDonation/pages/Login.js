import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

import MyImage from '../assets/logo2.jpg';

const Login = ({ route, navigation }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerShown: true,
            title: "",
        });
    }, []);
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container1}>
            <View style={styles.container}>
                <Image source={MyImage} style={styles.image} />
            </View>
            <Text style={styles.header}>Welcome, Sign In</Text>
            <Text style={styles.inputDetails}>Email</Text>
            <TextInput
                placeholder="Enter Email"
                style={styles.textBoxes}
            />
            <Text style={styles.inputDetails}>Password</Text>
            <TextInput
                placeholder="Enter Password" secureTextEntry={!showPassword}
                style={styles.textBoxes}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={styles.show}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginPress} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container1: {
        flexGrow: 1, // Allows the content to expand within the ScrollView
        backgroundColor: 'white',
    },
    image: {
        width: '65%',
        height: '65%',
        marginTop: '-27%',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    inputDetails: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '-3%',
        textAlign: 'left',
    },
    textBoxes: {
        width: '90%',
        fontSize: 16,
        padding: 12,
        borderColor: '#F76363',
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    buttonStyle: {
        backgroundColor: '#FF1515',
        padding: 13,
        borderRadius: 10,
        width: '90%',
        height: 50,
        margin: 10,
        marginLeft: 20,
        marginBottom: 20,
        borderColor: '#FF1515',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: '-20%',
        marginLeft: '5%',
        marginBottom: '8%',
        color: '#FF1515',
    },
    show: {
        textAlign: 'right',
        marginRight: 25,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Login;
