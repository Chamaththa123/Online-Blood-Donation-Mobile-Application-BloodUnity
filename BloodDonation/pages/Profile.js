import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from "react-native";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Accordion from "react-native-collapsible/Accordion";

const Profile = () => {
  const [name, setName] = useState({});
  const [activeSections, setActiveSections] = useState([]);
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

  const SECTIONS = [
    {
      title: "Personal Details",
      content: `Welcome ${name.name} ${name.number}`,
    },
  ];

  const renderHeader = (section, _, isActive) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text>{section.content}</Text>
      <View style={styles.card3}></View>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );

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
      <Text style={styles.headName}>{name.name}</Text>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headName: {
    margin: 10,
    marginTop: 90,
    textAlign: "center",
    fontSize: 20,
    fontWeight:'600'
  },
  header: {
    backgroundColor: "#fff",
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  card3: {
    backgroundColor: "#CB0303",
    borderRadius: 10,
    shadowRadius: 4,
    // elevation: 5,
    height: 120,
    borderWidth: 1,
    borderColor: "#fff",
    marginLeft: 90,
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
  accordion: {
    marginTop: 40,
    margin: 10,
    borderWidth: 0.8,
    borderColor: "#FF1515",
    borderRadius: 10,
    padding: 10,
  },
});

export default Profile;
