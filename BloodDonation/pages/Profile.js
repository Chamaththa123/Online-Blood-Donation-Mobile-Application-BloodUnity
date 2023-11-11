import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const Profile = () => {
  const [name, setName] = useState({});
  const navigation = useNavigation();

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
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
     <View style={{marginTop:200}}>
     <Text>Dashboard</Text>
      <Text>
        Welcome {name.name} {name.number}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
