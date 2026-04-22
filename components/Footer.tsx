import { string } from "@/constant/string";
import { Colors } from "@/theme/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsConatiner}>
        <View style={styles.iconTextConatiner}>
          <Ionicons name="images-outline" size={24} color={Colors.blackText} />
          <Text>{string.index.footer.library}</Text>
        </View>
        <View style={styles.iconTextConatiner}>
          <Ionicons name="folder-open-outline" size={24} color="blue" />
          <Text>{string.index.footer.collection}</Text>
        </View>
      </View>
      <View style={styles.searchIconConatiner}>
        <Ionicons name="search-outline" size={24} color={Colors.blackText} />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsConatiner: {
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Colors.text,
  },
  iconTextConatiner: {
    alignItems: "center",
  },
  searchIconConatiner: {
    padding: 15,
    backgroundColor: Colors.text,
    borderRadius: 50,
  },
});
