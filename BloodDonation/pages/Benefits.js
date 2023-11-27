import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image5 from "../assets/Image5.png";
const Benefits = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "Health Benefits of Blood Donation",
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={image5} style={styles.image} />
        <Text style={styles.text}>
          Blood donation not only helps save lives but also offers several
          health benefits for the donor:
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text2}>1.Reduces Iron Levels:</Text>Regular blood
          donation helps reduce the amount of iron stored in the body. High iron
          levels can be linked to certain health issues, and donating blood
          periodically can help maintain healthy iron levels.{" "}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text2}>2.Cardiovascular Health:</Text> Donating
          blood is associated with a reduced risk of cardiovascular diseases.
          Lowering iron levels through donation may decrease the risk of heart
          attacks and strokes.{" "}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text2}>3.Stimulates Blood Cell Production:</Text>
          After donating blood, the body works to replenish the lost blood
          cells. This process can stimulate the production of new blood cells,
          promoting the maintenance of a healthy blood count.{" "}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text2}>4.Health Check-Up:</Text>Donors receive a
          basic health check-up before donating blood. This includes checking
          blood pressure, pulse, hemoglobin levels, and screening for certain
          infectious diseases. It can provide donors with insights into their
          health status.{" "}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.text2}>5.Reduces Cancer Risk:</Text>Some studies
          suggest that regular blood donation might reduce the risk of certain
          cancers, such as liver, lung, colon, and throat cancers. Lower iron
          levels could contribute to this risk reduction.{" "}
        </Text>
        <Text style={styles.text}>
          It's important to note that while these health benefits exist,
          donating blood should primarily be driven by the intention to help
          others rather than solely for personal health gains. Donors should
          always ensure they meet the eligibility criteria and donate blood at
          recommended intervals to maintain their own health while contributing
          to the well-being of others.
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
    height: 200, // Adjust height as needed
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
  text2: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
  },
});

export default Benefits;
