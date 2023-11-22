import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

const AllDonors = () => {
  const [allDonors, setAllDonors] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "Find Blood Donor",
    });
  }, []);

  useEffect(() => {
    const fetchAllDonors = async () => {
      const donorsCollection = firebase.firestore().collection("users");
      const snapshot = await donorsCollection.where("donar", "!=", null).get();

      const donorsData = [];
      snapshot.forEach((doc) => {
        const userData = doc.data();
        const donorDetails = userData.donar;

        donorDetails.forEach((detail) => {
          donorsData.push(detail);
        });
      });

      setAllDonors(donorsData);
    };

    fetchAllDonors();
  }, []);

  const filteredDonors = allDonors.filter((donor) => {
    return (
      (!selectedBloodType || donor.Btype === selectedBloodType) &&
      (!selectedDistrict || donor.distric === selectedDistrict)
    );
  });

  const sortedDonors = filteredDonors.sort((a, b) => {
    if (a.distric !== b.distric) {
      return a.distric.localeCompare(b.distric);
    } else {
      return a.Btype.localeCompare(b.Btype);
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Text style={{ fontSize: 17 }}>Select District: </Text>
          <View style={styles.select1}>
            <Picker
              selectedValue={selectedDistrict}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
            >
              <Picker.Item label="Select District" value="" />
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
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={{ fontSize: 17 }}>Select Blood Type: </Text>
          <View style={styles.select2}>
            <Picker
              selectedValue={selectedBloodType}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => setSelectedBloodType(itemValue)}
            >
              <Picker.Item label="Select Blood Type" value="" />
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
        </View>
        <Text style={styles.header}>All Available Blood Donors</Text>

        {sortedDonors.map((donor, index) => (
          <View key={index}>
            <View style={styles.donorContainer}>
              <View style={styles.donorContainer2}>
                <Text style={styles.btype}>{donor.Btype}</Text>
              </View>
              <Text style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {donor.dname}
                </Text>
                {"\n"}
                <Text>{donor.distric}</Text>
                {"\n"}
                <Text>{donor.area}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate("DonorDetails", { donorDetails: donor })
              }
            >
              <Text style={styles.text}>Ask for Help</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 20,
    color: "#FF1515",
  },
  donorContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  donorContainer2: {
    borderWidth: 1,
    width: 70,
    height: 70,
    borderColor: "red",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FF1515",
    justifyContent: "center",
  },
  btype: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  select1: {
    borderWidth: 1,
    borderColor: "#FF1515",
    borderRadius: 10,
    marginLeft: 45,
  },
  select2: {
    borderWidth: 1,
    borderColor: "#FF1515",
    borderRadius: 10,
    marginLeft: 20,
  },
  touchable: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF1515",
    height: 45,
    width: 120,
    marginTop: -70,
    marginLeft: "66%",
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default AllDonors;
