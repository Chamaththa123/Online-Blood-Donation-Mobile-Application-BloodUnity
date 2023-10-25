import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';


const Register = ({ navigation }) => {

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

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.header}>Create Profile</Text>
                <Text style={styles.inputDetails}>Full Name</Text>
                <TextInput
                    placeholder="Enter Full Name"
                    style={styles.textBoxes}
                />
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
                <Text style={styles.inputDetails}>Re-Enter Password</Text>
                <TextInput
                    placeholder="Enter Occupation" secureTextEntry={!showPassword}
                    style={styles.textBoxes}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Text style={styles.show}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} >
                    <Text style={styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },
    inputDetails: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '-3%',
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
        color: 'white'
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: '10%',
        marginLeft: '5%',
        marginBottom: '8%',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        margin: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    picker: {
        width: '100%',
    },
    show:{
        textAlign:'right',
        marginRight:25,
        marginTop:10,
        marginBottom:10
    }
});

export default Register;
