import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";

const Donar = () => {
  const [name, setName] = useState({});
  const [dname, setdname] = useState("");
  const [Btype, setBtype] = useState("");
  const [number, setnumber] = useState("");
  const [distric, setdistric] = useState("");
  const [area, setarea] = useState("");
  const [donarDetails, setdonarDetails] = useState([]);

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        setdname(name.name);
        loadDonarDetails();
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  useEffect(() => {
    if (donarDetails.length === 1) {
      const [detail] = donarDetails;

      setBtype(detail.Btype);
      setnumber(detail.number);
      setdistric(detail.distric);
      setarea(detail.area);
    }
  }, [donarDetails]);

  const loadDonarDetails = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData.donar) {
          setdonarDetails(userData.donar);
        }
      } else {
        console.log("User doesn't exist");
      }
    });
  };

  const removeDonarDetails = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove your donor details?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            userDocRef
              .update({
                donar: firebase.firestore.FieldValue.delete(),
              })
              .then(() => {
                console.log("Donor details removed successfully!");
                setdonarDetails([]);
              })
              .catch((error) => {
                console.error("Error removing donor details:", error);
              });
          },
        },
      ]
    );
  };

  const handleAddMarks = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    const dname = name.name;

    userDocRef
      .update({
        donar: firebase.firestore.FieldValue.arrayUnion({
          dname: dname,
          Btype: Btype,
          number: number,
          distric: distric,
          area: area,
        }),
      })
      .then(() => {
        console.log("You become Blood Donar Successfully!!");
        setdname("");
        setBtype("");
        setnumber("");
        setdistric("");
        setarea("");

        // Display an alert when data is added successfully
        Alert.alert("Success", "You have become a Blood Donor successfully!", [
          {
            text: "OK",
            onPress: () => console.log("Alert closed"),
          },
        ]);
      })
      .catch((error) => {
        console.error("Error become Blood Donar:", error);
      });
  };
  if (donarDetails.length === 1) {
    const [donorDetail] = donarDetails;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.detailText2}>
            You have become blood donar successfully!!!
          </Text>
          <Text style={styles.label}>Your Registered Name</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.dname}</Text>
          </View>
          <Text style={styles.label}>Your Blood Type</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.Btype}</Text>
          </View>
          <Text style={styles.label}>Your District</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.distric}</Text>
          </View>
          <Text style={styles.label}>Your City</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.area}</Text>
          </View>
          <Text style={styles.label}>Your Contact No</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.number}</Text>
          </View>
          <Text style={styles.detailText3}>
            Remove your donar details (When you remove your details, Members
            can't contact you.)
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={removeDonarDetails}
          >
            <Text style={styles.buttonText}> Remove</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Become a Blood Donar</Text>
          <Text style={styles.note}>
            A blood donar can be found in the nearest area to the person who
            needs a blood donar by the distric and area.
          </Text>
          <Text style={styles.inputDetails}>Your Blood Group</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Btype}
              onValueChange={(itemValue1) => setBtype(itemValue1)}
              style={styles.picker}
            >
              <Picker.Item label="Select Your Blood Group" value="" />
              <Picker.Item label="AA" value="AA" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
          <Text style={styles.inputDetails}>Enter Your Contact No</Text>
          <TextInput
            placeholder="Enter Contact No"
            style={styles.textBoxes}
            value={number}
            onChangeText={(text) => {
              // Regular expression to allow only numbers
              const validatedInput = text.replace(/[^0-9]/g, "");
              if (validatedInput.length <= 10) {
                setnumber(validatedInput);
              }
            }}
            keyboardType="numeric" // This restricts the keyboard to numeric input
            maxLength={10} // Restricts the maximum length of input to 10 characters
          />
          <Text style={styles.inputDetails}>Your Distric</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={distric}
              onValueChange={(itemValue) => setdistric(itemValue)}
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

          <Text style={styles.inputDetails}>Enter Your City</Text>
          <TextInput
            placeholder="Enter Contact No"
            style={styles.textBoxes}
            value={area}
            onChangeText={(text) => setarea(text)}
          />

          <TouchableOpacity
            style={styles.buttonStyle2}
            onPress={handleAddMarks}
          >
            <Text style={styles.buttonText2}>Submit Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  inputDetails: {
    fontSize: 17,
    marginBottom: "0%",
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "1%",
    color: "#FF1515",
  },
  note: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#FF1515",
    borderWidth: 1,
    width: "100%",
  },
  userIcon: {
    textAlign: "center",
    color: "#FF1515",
  },
  detailText: {
    fontSize: 14,
  },
  detailText2: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
    marginTop: 30,
    fontStyle: "italic",
  },
  detailText3: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
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
    width: 90,
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default Donar;
