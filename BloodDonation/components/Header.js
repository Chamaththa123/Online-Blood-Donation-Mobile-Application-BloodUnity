import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import MyImage from "../assets/profile.png";

const Header = () => {
  const [name, setName] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "My Profile",
    });
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        navigation.navigate("Start");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card3}>
          <View style={styles.headerContainer}>
            <Image source={MyImage} style={styles.image} />
            <Text style={styles.HeaderHello}>{name.name}</Text>
          </View>
          <Text style={styles.Headername}>{name.email}</Text>
          <Text style={styles.header1}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}> Sign Out</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    marginTop: 10,
  },
  HeaderHello: {
    marginTop: -40,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 27,
  },
  Headername: {
    fontSize: 15,
    margin: 10,
    marginTop: -43,
    marginLeft: 120,
  },
  header1: {
    fontSize: 25,
    margin: 10,
    marginTop: 10,
    color: "#FF1515",
    marginLeft: 120,
  },
  image: {
    width: 80,
    height: 80,
    alignItems: "center",
    marginLeft: 13,
  },
  card3: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF1515",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#FF1515",
    borderRadius: 10,
    borderColor: "#FF1515",
    borderWidth: 1,
    justifyContent: "center",
    padding: 10,
  },
});

export default Header;
