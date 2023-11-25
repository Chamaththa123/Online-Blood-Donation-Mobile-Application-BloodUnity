import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { firebase } from "../firebase/config";

import MyImage from '../assets/event.jpg';

const DisplayEvents = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    const unsubscribe = firebase
      .firestore()
      .collection("events")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        setUserEvents(events);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Events</Text>
      {userEvents.map((event) => (
        <View key={event.id} >
         
            <View style={styles.card}>
            <ImageBackground source={MyImage} style={styles.cardBackground}>
              </ImageBackground>
            </View>
          
          <Text>Organizer: {event.organizerName}</Text>
          <Text>Venue: {event.venue}</Text>
          <Text>Date: {event.date}</Text>
          <Text>District: {event.district}</Text>
          <Text>Start Time: {event.startTime}</Text>
          <Text>End Time: {event.endTime}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#CCCCCC",
  },
  cardBackground: {
    width: "100%",
    height: 220,
    borderRadius:20 // Set the desired height of the card background image,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust opacity if needed
    borderRadius: 10,
    width:350,
    borderRadius:50
  },
  detailText: {
    // Your styles for detail text
  },
});

export default DisplayEvents;
