import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProtectedRoute } from "@/src/components/ProtectRoute";

type Props = {};

const Home = (props: Props) => {
  return (
    <ProtectedRoute>
      <View>
        <Text>Home</Text>
      </View>
    </ProtectedRoute>
  );
};

export default Home;

const styles = StyleSheet.create({});
