import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  PanResponder,
} from "react-native";
import { firebase } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../assets/event.jpg";

const AllEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const scrollViewRef = useRef(null);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          const eventIndex =
            gestureState.dx > 0 ? Math.floor(gestureState.dx / 350) : Math.ceil(gestureState.dx / 350);
          scrollViewRef.current.scrollTo({
            x: eventIndex * 350,
            animated: true,
          });
        }
      },
      onShouldBlockNativeResponder: () => false,
    })
  ).current;

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
    <ScrollView
      {...panResponder.panHandlers}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
    >
      {userEvents.map((event) => (
        <View style={styles.eventContainer} key={event.id}>
          <ScrollView>
            <Image source={MyImage} style={styles.cardBackground} />
            <Text style={styles.district}>{event.district}</Text>
            <Text style={styles.organizerName}>
              We cordially invite you to participate in our upcoming Blood
              Donation Drive organized by '{event.organizerName}'.
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Date:</Text> {event.district}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Time:</Text> {event.startTime} to{" "}
              {event.endTime}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Location:</Text> {event.venue}
            </Text>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: 390,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#CCCCCC",
    height:380,
  },
  cardBackground: {
    width: "95%",
    height: 260,
    backgroundColor: "rgba(255, 70, 70, 1)",
    marginTop: 20,
    marginBottom: 10,
    marginLeft:10,
    margin:10,
    borderWidth:1,
    borderColor:'#FF1515',
    borderRadius:10
  },
  organizerName: {
    textAlign: "center",
    marginTop: 90,
    fontWeight: "600",
    fontSize: 18,
    margin: 10,
    color: "#FF1515",
    fontStyle: "italic",
  },
  details: {
    marginBottom: 5,
    marginLeft: 30,
  },
  bold: {
    fontWeight: "bold",
  }, 
  district: {
    marginTop: -255,
    fontWeight: "bold",
    alignSelf:'flex-end',
    color: "#FF1515",
    marginRight:20
  },
  delete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default AllEvents;
