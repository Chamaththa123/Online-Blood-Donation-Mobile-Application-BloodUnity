import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import MyImage from "../assets/profile.png";

import image3 from "../assets/image4.jpg";

const HomePage = ({ route, navigation }) => {
  const [name, setName] = useState({});
  const [activeSections, setActiveSections] = useState([]);

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

  const SECTIONS = [
    {
      title: "Benifits of Blood Donation",
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
      <Text>
        Blood donation is a selfless act that can have numerous benefits for
        both the donor and the recipient.{" "}
      </Text>

      <Text>
        Saving Lives: Perhaps the most significant benefit of blood donation is
        the opportunity to save lives. Blood transfusions are crucial for
        various medical procedures, surgeries, and for treating patients with
        certain medical conditions such as cancer, anemia, and trauma.
      </Text>

      <Text>
        Community Health: Blood donation contributes to the overall health and
        well-being of the community. By donating blood, individuals help ensure
        that an adequate and safe blood supply is available for those in need.
      </Text>

      <Text>
        Reduces the Risk of Certain Health Issues: Regular blood donation may
        help reduce the risk of certain health issues. For example, it can help
        lower the risk of cardiovascular diseases by reducing iron levels in the
        body. High iron levels have been linked to an increased risk of heart
        disease.
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.HeaderHello}>Hello,</Text>
          <Image source={MyImage} style={styles.image} />
        </View>
        <Text style={styles.Headername}>{name.name}</Text>
        <Text style={styles.header1}>Donate Blood Save Life !</Text>
        <Image source={image3} style={styles.image3} />
        <View style={styles.accordion}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        </View>
        <Image source={image3} style={styles.image3} />
        <Image source={image3} style={styles.image3} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    marginTop: 10,
  },
  HeaderHello: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    color: "#FF1515",
    fontSize: 25,
  },
  Headername: {
    fontSize: 18,
    margin: 10,
    marginTop: -5,
  },
  image: {
    width: 50,
    height: 50,
    position: "absolute",
    right: 1,
    top: 0,
    margin: 10,
  },
  image3: {
    width: "95%",
    height: "28%",
    margin: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#FF2C2C",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "white",
    padding: 13,
    borderRadius: 10,
    width: "90%",
    height: 60,
    margin: 10,
    marginLeft: 20,
    marginBottom: 30,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  header1: {
    fontSize: 25,
    margin: 10,
    marginTop: 30,
    color: "#FF1515",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#fff",
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 20,
    backgroundColor: "#fff",
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

export default HomePage;
