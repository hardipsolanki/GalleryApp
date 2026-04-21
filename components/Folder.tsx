import { Colors } from "@/theme/color";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type FolderProps = {
  url: string;
  name: string;
};
const Folder = ({ url, name }: FolderProps) => {
  return (
    <View style={styles.conatiner}>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Folder;

const styles = StyleSheet.create({
  conatiner: {
    gap: 3,
  },
  image: {
    width: 160,
    height: 170,
    borderRadius: 20,
  },
  imageCount: {
    color: Colors.muted,
  },
  name: {
    position: "absolute",
    bottom: "10%",
    left: "10%",
    color: Colors.text,
  },
});
