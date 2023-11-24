import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { firebase } from "../firebase/config";

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
        <View key={event.id} style={styles.eventContainer}>
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
    padding: 20,
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
});

export default DisplayEvents;
