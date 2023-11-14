import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

const Donar = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Become a Blood Donar</Text>
        <Text style={styles.note}>A blood donar can be found in the nearest area to the person who needs a blood donar by the distric and area.</Text>
        <Text style={styles.inputDetails}>Your Blood Group</Text>
        <View style={styles.pickerContainer}>
          <Picker
            // selectedValue={Btype}
            // onValueChange={(itemValue) => setBtype(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Your Blood Group" value='' />
            <Picker.Item label="AA" value='AA' />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>
        <Text style={styles.inputDetails}>Enter Your Contact No</Text>
        <TextInput
          placeholder="Enter Contact No"
          style={styles.textBoxes}
        //   onChangeText={(number) => setNumber(number)}
        //   autoCapitalize="none"
        //   autoCorrect={false}
        />
        <Text style={styles.inputDetails}>Your Distric</Text>
        <View style={styles.pickerContainer}>
          <Picker
            // selectedValue={Btype}
            // onValueChange={(itemValue) => setBtype(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Your Distric" value='' />
            <Picker.Item label="AA" value='AA' />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>

        <Text style={styles.inputDetails}>Enter Your Area</Text>
        <TextInput
          placeholder="Enter Contact No"
          style={styles.textBoxes}
        //   onChangeText={(number) => setNumber(number)}
        //   autoCapitalize="none"
        //   autoCorrect={false}
        />
        
        <TouchableOpacity
          style={styles.buttonStyle}
        //   onPress={() => registerUser(email, password, name, Btype, number)}
        >
          <Text style={styles.buttonText}>Submit Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      padding:10
    },
    inputDetails: {
      fontSize: 17,
      marginBottom: '0%',
    },
    textBoxes: {
      width: '94%',
      fontSize: 16,
      padding: 12,
      borderColor: '#F76363',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      margin:10
    },
    buttonStyle: {
      backgroundColor: '#FF1515',
      padding: 13,
      borderRadius: 10,
      width: '94%',
      height: 50,
      margin: 10,
      marginBottom: 20,
      borderColor: '#FF1515',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: '1%',
      color: '#FF1515',
    },
    note: {
        fontSize: 15,
        marginBottom: 10,
        marginTop:10
      },
    scrollViewContent: {
      flexGrow: 1,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#F76363',
      borderRadius: 10,
      margin: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    picker: {
      width: '100%',
    },
  });

export default Donar