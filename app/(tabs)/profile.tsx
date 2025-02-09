import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { signOut } from "../../src/utils/auth";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import { useSelector } from "react-redux";
import { accentColor } from "@/src/utils/color";

export default function Profile() {
  const user = useSelector((state: any) => state.auth.user);
  // const PhotoUri =
  //   ;

  // console.log(PhotoUri);

  return (
    <StyledView style={styles.container}>
      <StyledText style={styles.title}>Profile</StyledText>
      {user && (
        <View style={styles.profileInfo}>
          <Image
            // resizeMode="cover"
            source={{
              uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            }}
            style={styles.avatar}
          />
          <StyledText style={styles.name}>{user.displayName}</StyledText>
          <StyledText style={styles.email}>{user.email}</StyledText>
        </View>
      )}
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#28a745",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 30,
    // backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#28a745",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: accentColor,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
