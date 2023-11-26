import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity  ,Image} from "react-native";
import { firebase } from "../firebase/config";
import Icon from 'react-native-vector-icons/FontAwesome';
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
      {userEvents.map((event) => (
        <View key={event.id} >
         
            <View>
            <Image source={MyImage} style={styles.cardBackground} />
            <Text style={styles.organizerName}>
            We cordially invite you to participate in our upcoming Blood Donation Drive organized by '{event.organizerName}'.
            </Text>
            <Text style={styles.details}><Text style={styles.bold}>Date:</Text> {event.date}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Time:</Text> {event.startTime} to {event.endTime}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Location:</Text> {event.venue}</Text>
            <TouchableOpacity style={styles.delete}>
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
    borderRadius:10 ,// Set the desired height of the card background image,
    backgroundColor: "rgba(255, 70, 70, 1)",
    marginTop:20,

  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust opacity if needed
    width:350,
    borderRadius:10,
    marginTop:10
  },
  organizerName: {
    textAlign:'center',
    marginTop:-145,
    fontWeight:'600',
    fontSize:18,
    margin:10,
    color:"#FF1515",
    fontStyle: "italic",

  },
  header: {
    textAlign:'center',
    color:'white',
    marginTop:10,
    fontWeight:'bold',
    fontSize:22,
    fontStyle: "italic",

  },
  details: {
    marginBottom:5,
    marginLeft:10,
  },
  bold: {
    fontWeight:'bold'
  },
  delete: {
    marginLeft:'90%',
    marginTop:-35
  },
});

export default DisplayEvents;
