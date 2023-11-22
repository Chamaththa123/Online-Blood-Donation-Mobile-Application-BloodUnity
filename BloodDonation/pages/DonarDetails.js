import React from "react";
import { View, Text } from "react-native";

const DonorDetails = ({ route }) => {
  const { donorDetails } = route.params;

  // Display donor details
  return (
    <View>
      <Text>Donor Name: {donorDetails.dname}</Text>
      <Text>Blood Type: {donorDetails.Btype}</Text>
      {/* Display other donor details */}
    </View>
  );
};

export default DonorDetails;
