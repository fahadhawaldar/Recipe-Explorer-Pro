import { View, TouchableOpacity, Text } from "react-native";
import { signOut } from "../../src/utils/auth";

export default function Profile() {
  return (
    <View>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
