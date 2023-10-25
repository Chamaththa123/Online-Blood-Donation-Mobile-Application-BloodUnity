import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

import MyImage from '../assets/logo2.jpg';
const Start = ({ route, navigation }) => {

    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    <View style={styles.container}>
       <Image source={MyImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
    },
    image: {
      width: 400,
      height: 400,
    },
  });
  

export default Start;
