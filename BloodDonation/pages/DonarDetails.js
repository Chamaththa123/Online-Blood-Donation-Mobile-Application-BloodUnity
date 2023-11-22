import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const DonorDetails = ({ route }) => {
  const navigation = useNavigation();
  const { donorDetails } = route.params;

  useEffect(() => {
    const name = donorDetails.dname;
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: name,
    });
  }, [donorDetails, navigation]);

  const handleCall = () => {
    const phoneNumber = donorDetails.number;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Donor Name</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{donorDetails.dname}</Text>
        </View>
        <Text style={styles.label}>Blood Type</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{donorDetails.Btype}</Text>
        </View>
        <Text style={styles.label}>District </Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{donorDetails.distric}</Text>
        </View>
        <Text style={styles.label}>Area</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{donorDetails.area}</Text>
        </View>
        <Text style={styles.label}>Contact No</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>{donorDetails.number}</Text>
        </View>
        <TouchableOpacity style={styles.touchable} onPress={handleCall}>
          <Text style={styles.text}>
            <Icon name="phone" size={40} />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#FF1515",
    borderWidth: 1,
    width: "100%",
  },
  userIcon: {
    textAlign: "center",
    color: "#FF1515",
  },
  detailText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  touchable: {
    padding: 10,
    backgroundColor: "#FF1515",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF1515",
    height: 80,
    width: 80,
    marginTop: 70,
    alignSelf: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
  },
});

export default DonorDetails;
