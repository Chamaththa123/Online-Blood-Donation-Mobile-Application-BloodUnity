import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { firebase } from "../firebase/config";

const AllDonor = () => {
  const [allDonors, setAllDonors] = useState([]);

  useEffect(() => {
    // Fetch all donor details from Firestore
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>All Donors Details</Text>
        {allDonors.map((donor, index) => (
          <View key={index} style={styles.donorContainer}>
            <Text>Name: {donor.dname}</Text>
            <Text>Blood Type: {donor.Btype}</Text>
            <Text>Contact Number: {donor.number}</Text>
            <Text>District: {donor.distric}</Text>
            <Text>Area: {donor.area}</Text>
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
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF1515",
  },
  donorContainer: {
    borderWidth: 1,
    borderColor: "#F76363",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default AllDonor;
