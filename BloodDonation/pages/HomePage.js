import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MyImage from "../assets/profile.png";
import image3 from "../assets/image4.jpg";
import image4 from "../assets/Image5.png";
import image5 from "../assets/day.jpg";
import image6 from "../assets/camp.jpeg";
import Icon from "react-native-vector-icons/FontAwesome";
import AllEvents from "../components/AllEvents";

const HomePage = ({ route, navigation }) => {
  const [name, setName] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
        fontSize: 23,
      },
      headerShown: true,
      title: "BloodUnity ",
    });
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("user doesn't exist");
        }
      });
  }, []);

  const handleImageClick = () => {
    navigation.navigate("Profile");
  };
  const AllDonar = () => {
    navigation.navigate("AllDonar");
  };
  const AllUsersEvents = () => {
    navigation.navigate("AllUsersEvents");
  };
  const DonarDay = () => {
    navigation.navigate("DonarDay");
  };
  const Requirements = () => {
    navigation.navigate("Requirements");
  };
  const Benefits = () => {
    navigation.navigate("Benefits");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.card}>
            <Text style={styles.HeaderHello}>Hello,</Text>
            <TouchableOpacity onPress={handleImageClick}>
              <Text onPress={handleImageClick} style={styles.image}>
                <Icon name="user" size={50} color="#FF1515" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.Headername}>{name.name}</Text>
        <Text style={styles.header1}>Donate Blood Save Life !</Text>
        <Image source={image3} style={styles.image3} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText} onPress={AllDonar}>
            Find Blood Donar
          </Text>
        </TouchableOpacity>
        <Text style={styles.header2}>Blood Donation Events</Text>
        <AllEvents />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText} onPress={AllUsersEvents}>
            See All Events
          </Text>
        </TouchableOpacity>

        <Image source={image5} style={styles.image3} />

        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText} onPress={DonarDay}>
            World Blood Donar Day
          </Text>
        </TouchableOpacity>

        <Image source={image6} style={styles.image6} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText} onPress={Requirements}>
            Requirements for Donors
          </Text>
        </TouchableOpacity>

        <Image source={image4} style={styles.image4} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText} onPress={Benefits}>
            Health Benefits of Blood Donation
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    minHeight: 2050,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    marginTop: 10,
  },
  HeaderHello: {
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "#FF1515",
    fontSize: 25,
  },
  Headername: {
    fontSize: 16,
    margin: 15,
    marginTop: -40,
  },
  image: {
    width: 65,
    height: 65,
    position: "absolute",
    right: -15,
    top: 0,
    marginTop: -35,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
  },
  text2: {
    fontSize: 14,
    lineHeight: 24,
  },
  accordion: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: "#FF1515",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image3: {
    width: "100%",
    height: "11%",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  image6: {
    width: "100%",
    height: "17%",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  image4: {
    width: "100%",
    height: "9%",
    borderRadius: 20,
    marginTop: 20,
  },
  header1: {
    fontSize: 25,
    margin: 10,
    marginTop: 30,
    color: "#FF1515",
  },
  header2: {
    fontSize: 20,
    marginTop: 30,
    color: "#FF1515",
  },
  headerACC: {
    backgroundColor: "#fff",
    padding: 5,
  },
  headerTextACC: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    marginTop: 30,
    borderColor: "#FF1515",
    borderWidth: 1,
    justifyContent: "center",
    color: "white",
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    borderColor: "#FF1515",
    borderWidth: 1,
    width: "100%",
    height: 90,
  },
});

export default HomePage;
