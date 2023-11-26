import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../assets/logo.png";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerShown: true,
      title: "",
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container1}>
      <Image source={MyImage} style={styles.image} />

      <Text style={styles.header2}>Welcome to Blood Unity !</Text>
      <Text style={styles.header1}>Sign In</Text>
      <Text style={styles.inputDetails}>Email</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.textBoxes}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.inputDetails}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        style={styles.textBoxes}
        value={password}
        onChangeText={(password) => setPassword(password)}
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.eyeIcon}
      >
        <Icon
          name={showPassword ? "eye" : "eye-slash"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.show}>Forgot Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.show2}>Don't have account ? Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "25%",
    height: "14%",
    alignSelf: "center",
    marginBottom: "15%",
  },
  container1: {
    flexGrow: 1, // Allows the content to expand within the ScrollView
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "left",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  inputDetails: {
    fontSize: 17,
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "-3%",
    textAlign: "left",
  },
  textBoxes: {
    width: "90%",
    fontSize: 16,
    padding: 12,
    borderColor: "#F76363",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonStyle: {
    backgroundColor: "#FF1515",
    padding: 13,
    borderRadius: 10,
    width: "90%",
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: "-28%",
    marginBottom: "30%",
    color: "#E90505",
    textAlign: "center",
  },
  header1: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "5%",
    marginBottom: "7%",
    color: "#FF1515",
    alignSelf: "center",
  },
  header2: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: "5%",
    marginBottom: "2%",
    color: "#FF1515",
    alignSelf: "center",
  },
  show: {
    textAlign: "left",
    margin: 25,
  },
  show2: {
    textAlign: "center",
    margin: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginLeft: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderColor: "#F76363",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  eyeIcon: {
    paddingRight: "8%",
    marginTop: "-13%",
    alignItems: "flex-end",
  },
});

export default Login;
