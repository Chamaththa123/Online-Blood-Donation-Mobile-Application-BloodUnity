import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import { View, Image, Text, TouchableOpacity, StyleSheet ,ScrollView } from 'react-native';

import MyImage from '../assets/home.jpg';

const HomePage = ({ route, navigation }) => {

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false,
    //     });
    // }, []);

    const [name, setName] = useState({});

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("user doesn't exist");
        }
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View  style={styles.container}>
      <Text style={styles.Headername}>Hello,</Text>
      <Text style={styles.Headername}>{name.name}</Text>
            <Text style={styles.header}>Donate Blood Save Life !</Text>
            
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Headername: {
        margin:20,
        fontSize:18
    },
    image: {
        width: '100%',
        height: '50%',
    },
    buttonText: {
        color: '#FF2C2C',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 10,
        width: '90%',
        height: 60,
        margin: 10,
        marginLeft: 20,
        marginBottom: 30,
        borderColor: '#FF1515',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    header: {
      fontSize: 25,
      marginTop: '5%',
      marginLeft: '5%',
      marginBottom: '2%',
  },
  scrollViewContent: {
    flexGrow: 1,
},
});

export default HomePage;
