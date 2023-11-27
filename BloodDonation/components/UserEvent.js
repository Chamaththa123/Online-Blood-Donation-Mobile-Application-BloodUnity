import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { firebase } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../assets/event.jpg";

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

  const handleDelete = (eventId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            firebase
              .firestore()
              .collection("events")
              .doc(eventId)
              .delete()
              .then(() => {
                setUserEvents((prevEvents) =>
                  prevEvents.filter((event) => event.id !== eventId)
                );
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      {userEvents.map((event) => (
        <View key={event.id}>
          <View>
            <Image source={MyImage} style={styles.cardBackground} />
            <Text style={styles.district}>{event.district}</Text>
            <Icon
              name="thumb-tack"
              size={30}
              color="#FF1515"
              style={styles.pin}
            />
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
            <TouchableOpacity
              style={styles.delete}
              onPress={() => handleDelete(event.id)}
            >
              <Icon name="trash-o" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  pin: {
    margin: 20,
    marginTop: -20,
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
    height: 260,
    borderRadius: 10,
    backgroundColor: "rgba(255, 70, 70, 1)",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF1515",
    marginBottom: 20,
  },
  district: {
    marginTop: -265,
    fontWeight: "bold",
    alignSelf: "flex-end",
    color: "#FF1515",
    marginRight: 20,
  },
  organizerName: {
    textAlign: "center",
    marginTop: 50,
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
    fontStyle: "italic",
  },
  details: {
    marginBottom: 5,
    marginLeft: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  delete: {
    marginLeft: "90%",
    marginTop: -35,
  },
});

export default DisplayEvents;
