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
import Accordion from "react-native-collapsible/Accordion";
import MyImage from "../assets/profile.png";
import image3 from "../assets/image4.jpg";
import image4 from "../assets/Image5.png";
import image5 from "../assets/day.jpg";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AllEvents from "../components/AllEvents";

const HomePage = ({ route, navigation }) => {
  // const navigation = useNavigation();

  const [name, setName] = useState({});
  const [activeSections, setActiveSections] = useState([]);
  const [activeSections2, setActiveSections2] = useState([]);

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

  const SECTIONS = [
    {
      title: "Benifits of Blood Donation",
      content: `Welcome ${name.name} ${name.number}`,
    },
  ];

  const renderHeader = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text style={styles.text2}>
        <Text>
          Blood donation is a selfless act that can have numerous benefits for
          both the donor and the recipient.
        </Text>

        <Text>
          Saving Lives: Perhaps the most significant benefit of blood donation
          is the opportunity to save lives. Blood transfusions are crucial for
          various medical procedures, surgeries, and for treating patients with
          certain medical conditions such as cancer, anemia, and trauma.
        </Text>

        <Text>
          Community Health: Blood donation contributes to the overall health and
          well-being of the community. By donating blood, individuals help
          ensure that an adequate and safe blood supply is available for those
          in need.
        </Text>

        <Text>
          Reduces the Risk of Certain Health Issues: Regular blood donation may
          help reduce the risk of certain health issues. For example, it can
          help lower the risk of cardiovascular diseases by reducing iron levels
          in the body. High iron levels have been linked to an increased risk of
          heart disease.
        </Text>
      </Text>
    </View>
  );
  const SECTIONS2 = [
    {
      title: "World Blood Donar Day",
    },
  ];

  const renderHeader2 = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent2 = (section) => (
    <View style={styles.content}>
      <Text style={styles.text}>
        World Blood Donor Day is observed every year on June 14th. It's a day
        dedicated to raising awareness about the importance of blood donation
        and expressing gratitude to voluntary blood donors for their life-saving
        contributions. The event serves as a reminder of the critical need for
        safe blood and blood products and encourages more people to donate blood
        regularly to save lives. The theme for each year's celebration often
        focuses on specific aspects of blood donation or the importance of
        access to safe blood. It's an opportunity to recognize the invaluable
        contribution of blood donors worldwide and encourage others to join in
        this noble cause.
      </Text>
    </View>
  );
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

        <AllEvents/>

        <Image source={image5} style={styles.image3} />

        <View style={styles.accordion}>
          <Accordion
            sections={SECTIONS2}
            activeSections={activeSections2}
            renderHeader={renderHeader2}
            renderContent={renderContent2}
            onChange={setActiveSections2}
          />
        </View>

        

        <Image source={image4} style={styles.image4} />
        <View style={styles.accordion}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    minHeight: 4800,
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
    height: "4%",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  image4: {
    width: "100%",
    height: "4%",
    borderRadius: 20,
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
