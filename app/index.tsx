import Filters from "@/components/Filters";
import Folder from "@/components/Folder";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Colors } from "@/theme/color";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AlbumWithCover = {
  album: MediaLibrary.Album;
  coverImage: string | null;
};

export default function Index() {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState<AlbumWithCover[]>([]);

  const getAlbums = async () => {
    if (permissionResponse?.status !== "granted") {
      const { status } = await requestPermission();
      if (status !== "granted") return;
    }

    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    console.log("fetchAlbums: ", fetchedAlbums);

    const albumsWithCover = await Promise.all(
      fetchedAlbums.map(async (album) => {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: album,
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
          sortBy: "creationTime",
        });

        console.log("accest: ", assets);

        return {
          album,
          coverImage: assets[0]?.uri ?? "",
          hasPhotos: assets.length > 0,
        };
      }),
    );

    setAlbums(() => albumsWithCover.filter((album) => album.hasPhotos));
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={albums}
        ListHeaderComponent={
          <>
            <Header />
            <Filters />
          </>
        }
        ListFooterComponent={<Footer />}
        renderItem={({ item }) => (
          <Folder url={item.coverImage || ""} name={item.album.title} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.album.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
