import AlbumPhotosHeader from "@/components/album/Header";
import { ROUTES_PATH } from "@/constant/routesName";
import { Colors } from "@/theme/color";
import * as MediaLibrary from "expo-media-library";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AlbumPhotos = () => {
  const { width } = useWindowDimensions();
  const { albumId } = useLocalSearchParams<{ albumId: string }>();
  const [albumAssets, setAlbumAssets] = useState<MediaLibrary.Asset[]>([]);
  const [albumName, setAlbumName] = useState<string | null>(null);
  const getAlbumPhotos = async () => {
    const albums = await MediaLibrary.getAlbumsAsync();
    const album = albums.find((a) => a.id === albumId);
    if (!album) return;
    setAlbumName(album?.title);

    const result = await MediaLibrary.getAssetsAsync({
      album: album,
      mediaType: MediaLibrary.MediaType.photo,
      first: 50,
      sortBy: "creationTime",
    });

    setAlbumAssets(result.assets);
  };

  useEffect(() => {
    getAlbumPhotos();
  }, [albumId]);

  const numColumns = width >= 768 ? 6 : 4;

  return (
    <SafeAreaView style={styles.conatiner}>
      <FlatList
        data={albumAssets}
        ListHeaderComponent={
          <AlbumPhotosHeader
            albumName={albumName || ""}
            albumPhotos={albumAssets.length}
          />
        }
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: ROUTES_PATH.asset,
              params: { assetId: item.id },
            }}
          >
            <View
              style={[
                styles.listConatiner,
                albumAssets.length < 5 && {
                  width: width / albumAssets.length,
                  flexWrap: "wrap",
                },
              ]}
            >
              <Image
                style={styles.image}
                source={{
                  uri: item.uri,
                }}
              />
            </View>
          </Link>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        // contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
      />
    </SafeAreaView>
  );
};

export default AlbumPhotos;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },

  listConatiner: {
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 2,
  },

  image: {
    width: 85,
    height: 85,
    // borderRadius: 20,
  },
});
