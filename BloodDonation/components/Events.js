import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";
import Accordion from "react-native-collapsible/Accordion";

const Events = () => {
  const [name, setName] = useState({});
  const [Venue, setVenue] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [District, setDistrict] = useState("");
  const [Date, setDate] = useState("");

  const [activeSections, setActiveSections] = useState([]);
  const [activeSections2, setActiveSections2] = useState([]);

  const [userEvent, setuserEvent] = useState([]);

  const handleAddEvents = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef
      .update({
        event: firebase.firestore.FieldValue.arrayUnion({
          Venue: Venue,
          StartTime: StartTime,
          EndTime: EndTime,
          District: District,
          Date: Date,
        }),
      })
      .then(() => {
        console.log("Event added successfully");
        setVenue("");
        setStartTime("");
        setEndTime("");
        setDistrict("");
        setDate("");
        loadUserEvents();
      })
      .catch((error) => {
        console.error("Error adding Event:", error);
      });
  };

  const loadUserEvents = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData.userEvent) {
          setuserEvent(userData.userEvent);
        }
      } else {
        console.log("User doesn't exist");
      }
    });
  };

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        loadUserEvents();
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  const SECTIONS = [
    {
      title: "Add Your Blood Donation Event",
    },
  ];

  const renderHeader = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text style={styles.inputDetails}>Your Blood Group</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={District}
          onValueChange={(itemValue1) => setDistrict(itemValue1)}
          style={styles.picker}
        >
          <Picker.Item label="Select Your Distric" value="" />
          <Picker.Item label="Colombo" value="Colombo" />
          <Picker.Item label="Gampaha" value="Gampaha" />
          <Picker.Item label="Kalutara" value="Kalutara" />
          <Picker.Item label="Kandy" value="Kandy" />
          <Picker.Item label="Matale" value="Matale" />
          <Picker.Item label="Nuwara Eliya" value="Nuwara Eliya" />
          <Picker.Item label="Galle" value="Galle" />
          <Picker.Item label="Matara" value="Matara" />
          <Picker.Item label="Hambantota" value="Hambantota" />
          <Picker.Item label="Jaffna" value="Jaffna" />
          <Picker.Item label="Kilinochchi" value="Kilinochchi" />
          <Picker.Item label="Mannar" value="Mannar" />
          <Picker.Item label="Vavuniya" value="Vavuniya" />
          <Picker.Item label="Mullaitivu" value="Mullaitivu" />
          <Picker.Item label="Batticaloa" value="Batticaloa" />
          <Picker.Item label="Ampara" value="Ampara" />
          <Picker.Item label="Trincomalee" value="Trincomalee" />
          <Picker.Item label="Kurunegala" value="Kurunegala" />
          <Picker.Item label="Puttalam" value="Puttalam" />
          <Picker.Item label="Kurunegala" value="Kurunegala" />
          <Picker.Item label="Anuradhapura" value="Anuradhapura" />
          <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
          <Picker.Item label="Badulla" value="Badulla" />
          <Picker.Item label="Moneragala" value="Moneragala" />
          <Picker.Item label="Ratnapura" value="Ratnapura" />
          <Picker.Item label="Kegalle" value="Kegalle" />
        </Picker>
      </View>
      <Text style={styles.inputDetails}>Enter Event Venue</Text>
      <TextInput
        placeholder="Enter Event Venue"
        style={styles.textBoxes}
        value={Venue}
        onChangeText={(text) => setVenue(text)}
      />

      <Text style={styles.inputDetails}>Enter Event Date</Text>
      <TextInput
        placeholder="Enter Event Date"
        style={styles.textBoxes}
        value={Date}
        onChangeText={(text) => setDate(text)}
      />

      <Text style={styles.inputDetails}>Enter Event Start Time</Text>
      <TextInput
        placeholder="Enter Event Start Time"
        style={styles.textBoxes}
        value={StartTime}
        onChangeText={(text) => setStartTime(text)}
      />

      <Text style={styles.inputDetails}>Enter Event End Time</Text>
      <TextInput
        placeholder="Enter Event End Time"
        style={styles.textBoxes}
        value={EndTime}
        onChangeText={(text) => setEndTime(text)}
      />

      <TouchableOpacity style={styles.buttonStyle2} onPress={handleAddEvents}>
        <Text style={styles.buttonText2}>Submit Event Details</Text>
      </TouchableOpacity>
    </View>
  );

  const SECTIONS2 = [
    {
      title: "Blood Donation Events",
    },
  ];

  const renderHeader2 = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent2 = (section) => (
    <View style={styles.content}>
      <Text style={styles.text}>
        World Blood Donor Day is observed every year on June 14th. It's a day
        dedicated to raising awareness about the importance of blood donation
        and expressing gratitude to voluntary blood donors for their life-saving
        contributions. The event serves as a reminder of the critical need for
        safe blood and blood products and encourages more people to donate blood
        regularly to save lives. The theme for each year's celebration often
        focuses on specific aspects of blood donation or the importance of
        access to safe blood. It's an opportunity to recognize the invaluable
        contribution of blood donors worldwide and encourage others to join in
        this noble cause.
      </Text>
    </View>
  );

  return (
    <View style={styles.cantainer}>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
        />
      </View>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS2}
          activeSections={activeSections2}
          renderHeader={renderHeader2}
          renderContent={renderContent2}
          onChange={setActiveSections2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cantainer: {
    marginTop: 20,
  },
  inputDetails: {
    fontSize: 15,
    marginBottom: "0%",
    margin: 10,
  },
  textBoxes: {
    width: "94%",
    fontSize: 16,
    padding: 12,
    borderColor: "#F76363",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    margin: 10,
  },
  buttonStyle2: {
    backgroundColor: "#FF1515",
    padding: 13,
    borderRadius: 10,
    width: "94%",
    height: 50,
    margin: 10,
    marginBottom: 20,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  buttonText2: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#F76363",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  picker: {
    width: "100%",
  },
  accordion: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: "#FF1515",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  headerACC: {
    backgroundColor: "#fff",
    padding: 5,
  },
  headerTextACC: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 20,
    backgroundColor: "#fff",
  },
});

export default Events;
