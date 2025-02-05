import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams(); // Get dynamic route param

  return (
    <View>
      <Text>Details Page for ID: {id}</Text>
    </View>
  );
};

export default DetailsScreen; // ✅ Ensure this is exported as default
