import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Accordion from "react-native-collapsible/Accordion";
import Donar from "../components/Donar";
import Events from "../components/Events";

const Profile = () => {
  const [name, setName] = useState({});
  const [activeSections2, setActiveSections2] = useState([]);
  const [activeSections4, setActiveSections4] = useState([]);


  const SECTIONS2 = [
    {
      title: "Become a Blood Donar",
    },
  ];

  const renderHeader2 = (section, _, isActive) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  const renderContent2 = (section) => <Donar />;

  const SECTIONS4 = [
    {
      title: "Blood Donation Events",
      content: `Welcome ${name.name} ${name.number}`,
    },
  ];

  const renderHeader4 = (section, _, isActive) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  const renderContent4 = (section) => (
    <View>
      <Events/>
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
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS2}
          activeSections={activeSections2}
          renderHeader={renderHeader2}
          renderContent={renderContent2}
          onChange={setActiveSections2}
        />
      </View>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS4}
          activeSections={activeSections4}
          renderHeader={renderHeader4}
          renderContent={renderContent4}
          onChange={setActiveSections4}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  cardHeader: {
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    padding: 16,
    width: "100%",
    borderRadius: 7,
    borderColor: "#FF1515",
    borderWidth: 1,
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
    marginTop: 20,
    margin: 10,
    borderWidth: 0.8,
    borderColor: "#FF1515",
    borderRadius: 10,
    padding: 10,
  },
});

export default Profile;
