import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image5 from "../assets/camp.jpeg";

const Requirements = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "Blood Donation Requirements",
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={image5} style={styles.image} />
        <Text style={styles.text}>Blood donation requirements are put in place to ensure the safety of both the donor and the recipient of the blood. While specific guidelines may slightly vary depending on the country and blood bank, there are some common criteria that donors generally need to meet:</Text>
        <Text style={styles.text}><Text style={styles.text2}>1.Age:</Text>Donors are typically required to be within a certain age range, often between 18 to 65 years old. Some places may have variations in this range.</Text>
        <Text style={styles.text}><Text style={styles.text2}>2.Weight:</Text>Donors usually need to weigh at least a certain amount to ensure they can safely donate without adversely affecting their health. This criterion helps prevent adverse effects like dizziness or weakness after donation.</Text>
        <Text style={styles.text}><Text style={styles.text2}>3.Health:</Text>Donors must be in good health on the day of donation. They should not have any acute or chronic illnesses, infections, or conditions that might pose a risk to either the donor or the recipient.</Text>
        <Text style={styles.text}><Text style={styles.text2}>4.Travel History:</Text>Some locations have restrictions based on recent travel history to certain regions or countries known for diseases like malaria or other infections. Travel to areas with endemic diseases might lead to temporary deferral from donating blood.</Text>
        <Text style={styles.text}><Text style={styles.text2}>5.Medications:</Text>Certain medications may also affect eligibility for blood donation. Some medications might require a waiting period before a person can donate blood.</Text>
        <Text style={styles.text}><Text style={styles.text2}>6.Lifestyle Factors:</Text>Individuals engaging in high-risk behaviors like intravenous drug use or unprotected sex may have restrictions or deferrals from donating blood due to an increased risk of infections like HIV or hepatitis.</Text>
        <Text style={styles.text}><Text style={styles.text2}>7.Previous Donations:</Text>There is usually a specific interval required between donations to ensure the donor’s body has adequate time to replenish the lost blood components. This interval typically ranges from 8 to 12 weeks between whole blood donations.</Text>
      <Text style={styles.text}>Before donating blood, potential donors usually undergo a screening process that involves a brief health questionnaire and sometimes a mini-physical examination to ensure they meet these criteria. It’s important to be honest during the screening process to ensure the safety of both the donor and the recipient.</Text>
      <Text style={styles.text}>These requirements are set to maintain the safety and integrity of the blood supply and to protect the health of both donors and recipients. If someone is interested in donating blood, it’s advisable to check with local blood donation centers or organizations to understand specific eligibility criteria and ensure they meet the necessary requirements.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // Center content vertically if needed
  },
  image: {
    width: '95%', // Adjust width as needed
    height: 350, // Adjust height as needed
    resizeMode: "cover", // or "contain" or "stretch"
    borderWidth: 0.8,
    borderRadius: 10,
    margin: 10,
    borderColor: "#FF1515",
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginTop: 15,
    margin: 10,
    lineHeight: 24
  },
  text2: {
    fontSize: 15,
    color: "#333",
    fontWeight:'bold'
  },
});
export default Requirements