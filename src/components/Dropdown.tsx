import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { accentColor } from "../utils/color";
import { useSelector } from "react-redux";

interface DropdownProps<T> {
  data: any[];
  value?: T;
  onSelect: (item: T) => void;
  placeholder?: string;
  style: ViewStyle;
}

const Dropdown = <T extends { id: string; label: string }>({
  data,
  value,
  onSelect,
  placeholder = "Select an option",
  style,
}: DropdownProps<T>) => {
  const [visible, setVisible] = useState(false);
  const isDark = useSelector((state: any) => state.appSettings.darkMode);

  const renderItem = ({ item }: { item: T }) => (
    <TouchableOpacity
      style={[styles.option]}
      onPress={() => {
        onSelect(item);
        setVisible(false);
      }}
    >
      <Text style={[styles.optionText, { color: isDark ? "#fff" : "#000" }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          //   { backgroundColor: isDark ? "#333" : "#fff" },
        ]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}>
          {value ? value.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        style={{ justifyContent: "flex-end" }}
      >
        <TouchableOpacity
          style={[
            styles.overlay,
            {
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.5)",
            },
          ]}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <SafeAreaView
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? "#333" : "#fff" },
            ]}
          >
            <View style={styles.header}>
              <Text
                style={[styles.headerText, { color: isDark ? "#fff" : "#000" }]}
              >
                Select an Option
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text
                  style={[
                    styles.closeButton,
                    { color: isDark ? "#fff" : "#999" },
                  ]}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    // padding: 12,
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 20,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
