import Filters from "@/components/Filters";
import Folder from "@/components/Folder";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ROUTES_PATH } from "@/constant/routesName";
import { Colors } from "@/theme/color";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AlbumWithCover = {
  album: MediaLibrary.Album;
  coverImage: string | null;
};

export default function Index() {
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

    const albumsWithCover = await Promise.all(
      fetchedAlbums.map(async (album) => {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: album,
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
          sortBy: "creationTime",
        });

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
      <View style={styles.listConatiner}>
        <FlatList
          data={albums}
          ListHeaderComponent={
            <>
              <Header getAlbums={getAlbums} />
              <Filters />
            </>
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: ROUTES_PATH.album,
                params: { albumId: item.album.id },
              }}
            >
              <Folder url={item.coverImage || ""} name={item.album.title} />
            </Link>
          )}
          numColumns={2}
          keyExtractor={(item) => item.album.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background,
  },
  listConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 0,
  },
});
