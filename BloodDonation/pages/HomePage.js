import React, { useEffect } from 'react'; // Import useEffect from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = ({ route, navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
  return (
    <View>
      <Text>This is the HomePage Screen</Text>
    </View>
  );
};

export default HomePage;
