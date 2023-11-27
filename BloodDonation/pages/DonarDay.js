import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image5 from "../assets/day.jpg";

const DonorDay = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "World Donor Day - (June 14)",
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={image5} style={styles.image} />
        <Text style={styles.text}>
          World Blood Donor Day serves as a global recognition of the invaluable
          contribution made by blood donors worldwide. Observed on June 14th
          every year, it aims to raise awareness about the importance of
          voluntary blood donation and to acknowledge the selfless individuals
          who donate blood to save lives.
        </Text>
        <Text style={styles.text}>
          BThe event was established by the World Health Organization (WHO) to
          highlight the constant need for safe blood and blood products for
          transfusion and to express gratitude to blood donors for their
          life-saving gifts. The theme of World Blood Donor Day varies each
          year, focusing on different aspects related to blood donation,
          transfusion, and health.
        </Text>
        <Text style={styles.text}>
          The significance of blood donation cannot be overstated. Donated blood
          is vital for various medical procedures, including surgeries,
          childbirth, trauma care, and treating chronic illnesses such as anemia
          and cancer. It is also crucial for patients suffering from conditions
          like thalassemia and hemophilia who require regular transfusions to
          lead healthy lives.
        </Text>
        <Text style={styles.text}>
          The theme for World Blood Donor Day often emphasizes raising awareness
          and encouraging more people, especially young individuals, to become
          regular blood donors. Educating communities about the importance of
          safe blood donation practices, addressing misconceptions, and
          promoting voluntary, unpaid donations are essential components of
          these campaigns.
        </Text>
        <Text style={styles.text}>
          Donating blood is a simple yet impactful act that has the potential to
          save lives. It’s often said that a single donation can save up to
          three lives, as blood can be separated into its components – red blood
          cells, plasma, and platelets – and used for different patients in
          need.
        </Text>
        <Text style={styles.text}>
          However, despite the ongoing efforts to increase blood donations,
          there remains a constant need for more donors, especially in times of
          emergencies or natural disasters when the demand for blood rises
          significantly.
        </Text>
        <Text style={styles.text}>
          Various organizations, hospitals, and blood banks collaborate on World
          Blood Donor Day to organize events, blood drives, and campaigns to
          encourage more people to donate blood regularly. These initiatives aim
          to create a culture of voluntary blood donation and ensure a stable
          and sufficient blood supply to meet the healthcare needs of
          communities worldwide.
        </Text>
        <Text style={styles.text}>
          Ultimately, World Blood Donor Day serves as a reminder that every
          donation counts and has the power to make a difference in someone’s
          life. It celebrates the generosity of donors and highlights the
          ongoing need for their altruistic contributions to sustain a safe and
          adequate blood supply for all.
        </Text>
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
    backgroundColor: "white",
    alignItems: "center", // Center content vertically if needed
  },
  image: {
    width: "95%", // Adjust width as needed
    height: 250, // Adjust height as needed
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
    lineHeight: 24,
  },
});

export default DonorDay;
