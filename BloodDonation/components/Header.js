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
import MyImage from "../assets/profile.png";

const Header = ({ title }) => {
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card3}>
        <View style={styles.headerContainer}>
          <Image source={MyImage} style={styles.image} />
          <Text style={styles.HeaderHello}>{name.name}</Text>
        </View>
        <Text style={styles.Headername}>{name.email}</Text>
        <Text style={styles.header1}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Edit Profile</Text>
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
    fontSize: 18,
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  image: {
    width: 80,
    height: 80,
    alignItems: "center",
    marginLeft: 13,
  },
  card: {
    backgroundColor: "#CB0303",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",

  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the cards
    marginTop: "-36%",
  },
  rowContainer1: {
    flexDirection: "row",
    justifyContent: "center", // Center the cards
    marginTop: 220,
  },
  card1: {
    backgroundColor: "#CB0303",
    borderRadius: 80,
    shadowRadius: 4,
    elevation: 5,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
  },
  card1Text: {
    marginLeft: 35,
    marginTop: 38,
    fontSize: 35,
    color: "#fff",
  },
  card2: {
    backgroundColor: "#CB0303",
    borderRadius: 80,
    shadowRadius: 4,
    elevation: 5,
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "#fff",
  },
  card3: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#FF1515",
    borderRadius: 10,
    width: "100%",
    borderColor: "#FF1515",
    borderWidth: 1,
    justifyContent: "center",
    color: "white",
    padding: 15,
  },
});

export default Header;
