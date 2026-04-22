import { string } from "@/constant/string";
import { Colors } from "@/theme/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateFolderModal from "./CreateFolderModal";

const Header = ({ getAlbums }: { getAlbums: () => void }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateFolder = async (folderName: string) => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 1,
      });

      if (assets.length === 0) return;

      // ✅ Album banavo
      await MediaLibrary.createAlbumAsync(folderName, assets[0], false);

      getAlbums();
    } catch (error) {
      console.log("Error creating folder:", error);
    }
  };
  return (
    <View style={styles.conatiner}>
      <View>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.blackText} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerText}>{string.index.header}</Text>
      </View>
      <View style={styles.iconsConatiner}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color={Colors.blackText} />
        </TouchableOpacity>

        <CreateFolderModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={handleCreateFolder}
        />
        <Ionicons name="hammer" size={24} color={Colors.blackText} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backArrow: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: Colors.text,
    elevation: 2,
    shadowColor: Colors.muted,
  },
  iconsConatiner: {
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Colors.text,
    elevation: 2,
    shadowColor: Colors.muted,
  },
  headerText: {
    fontWeight: "bold",
  },
});
