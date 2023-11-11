import { View, Image, StyleSheet, ImageBackground } from "react-native";
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
    <View style={styles.card}>
      <ImageBackground
        source={require("../assets/home.jpg")} // Replace with the actual path to your image
        style={styles.backgroundImage}
      >
        <View style={styles.rowContainer1}>
          <View style={styles.card1}></View>
          <View style={styles.card3}></View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.card2}>
            <Image source={MyImage} style={styles.image} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  image: {
    width: 120,
    height: 120,
    alignItems: "center",
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
    height: 300,
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
    backgroundColor: "#CB0303",
    borderRadius: 80,
    shadowRadius: 4,
    elevation: 5,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#fff",
    marginLeft: 90,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
