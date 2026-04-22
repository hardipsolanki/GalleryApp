import { Colors } from "@/theme/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlbumPhotosHeaderProps {
  albumName: string;
  albumPhotos: number;
}
const AlbumPhotosHeader = ({
  albumName,
  albumPhotos,
}: AlbumPhotosHeaderProps) => {
  const router = useRouter();
  return (
    <View style={styles.conatiner}>
      <View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.blackText} />
        </TouchableOpacity>
      </View>
      <View style={styles.albumDetails}>
        <Text style={styles.headerText}>{albumName}</Text>
        <Text style={styles.imageCount}>{albumPhotos}</Text>
      </View>
    </View>
  );
};

export default AlbumPhotosHeader;

const styles = StyleSheet.create({
  conatiner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },
  albumDetails: {
    gap: 3,
  },
  headerText: {
    fontWeight: "bold",
  },
  imageCount: {
    color: Colors.muted,
  },
});
