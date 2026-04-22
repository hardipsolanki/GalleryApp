import { Colors } from "@/theme/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SingleImage() {
  const { assetId } = useLocalSearchParams<{ assetId: string }>();
  const [asset, setAsset] = useState<MediaLibrary.Asset | null>(null);
  const router = useRouter();
  const getAsset = async () => {
    const result = await MediaLibrary.getAssetInfoAsync(assetId);
    setAsset(result);
  };

  useEffect(() => {
    getAsset();
  }, [assetId]);

  if (!asset) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={{ color: Colors.text }}>{asset.filename}</Text>
      </View>

      {/* Image */}
      <Image
        source={{ uri: asset.uri }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 50, // ← status bar thi niche
    paddingBottom: 10,
    zIndex: 10,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
