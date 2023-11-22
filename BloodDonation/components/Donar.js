import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
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
          <Text style={styles.label}>Registered Name</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.dname}</Text>
          </View>
          <Text style={styles.label}>Blood Type</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.Btype}</Text>
          </View>
          <Text style={styles.label}>District</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.distric}</Text>
          </View>
          <Text style={styles.label}>Area</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.area}</Text>
          </View>
          <Text style={styles.label}>Contact No</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.number}</Text>
          </View>
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
            onChangeText={(text) => setnumber(text)}
          />
          <Text style={styles.inputDetails}>Your Distric</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={distric}
              onValueChange={(itemValue) => setdistric(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Your Distric" value="" />
              <Picker.Item label="Kegalle" value="Kegalle" />
              <Picker.Item label="Rathnapura" value="Rathnapura" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>

          <Text style={styles.inputDetails}>Enter Your Area</Text>
          <TextInput
            placeholder="Enter Contact No"
            style={styles.textBoxes}
            value={area}
            onChangeText={(text) => setarea(text)}
          />

          <TouchableOpacity style={styles.buttonStyle} onPress={handleAddMarks}>
            <Text style={styles.buttonText}>Submit Details</Text>
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
  buttonStyle: {
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
  buttonText: {
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
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default Donar;
