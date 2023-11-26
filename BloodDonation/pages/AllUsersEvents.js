import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView, // Import ScrollView
} from "react-native";
import { firebase } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../assets/event.jpg";
import { useNavigation } from "@react-navigation/native";


const AllUsersEvents = () => {
  const [userEvents, setUserEvents] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "Blood Donation Events",
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("events")
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
    <ScrollView style={styles.container}>
      {userEvents.map((event) => (
        <View key={event.id} style={styles.eventContainer}>
          <View>
            <Image source={MyImage} style={styles.cardBackground} />
            <Text style={styles.organizerName}>
              We cordially invite you to participate in our upcoming Blood
              Donation Drive organized by '{event.organizerName}'.
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Date:</Text> {event.date}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Time:</Text> {event.startTime} to{" "}
              {event.endTime}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Location:</Text> {event.venue}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
    paddingBottom: 10,
  },
  cardBackground: {
    width: "95%",
    height: 260,
    borderRadius: 10,
    backgroundColor: "rgba(255, 70, 70, 1)",
    marginTop: 10,
    margin:10,
    borderWidth:1,
    borderColor:'#FF1515',
  },
  organizerName: {
    textAlign: "center",
    marginTop: -145,
    fontWeight: "600",
    fontSize: 18,
    margin: 10,
    color: "#FF1515",
    fontStyle: "italic",
  },
  header: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 22,
    margin: 20,
    fontStyle: "italic",
  },
  details: {
    marginBottom: 5,
    marginLeft: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default AllUsersEvents;
