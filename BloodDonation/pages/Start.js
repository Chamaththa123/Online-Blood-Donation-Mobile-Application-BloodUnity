import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import MyImage from "../assets/logo.png";

const Start = ({ route, navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={MyImage} style={styles.image} />

      <TouchableOpacity onPress={handleLoginPress} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleRegisterPress}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "40%",
    height: "20%",
    marginBottom: "30%",
    marginTop: "70%",
  },
  buttonText: {
    color: "#FF2C2C",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    width: "90%",
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 30,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  }
});

export default Start;
