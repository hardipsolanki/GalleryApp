import * as MediaLibrary from "expo-media-library";

export const getPhotos = async (album: MediaLibrary.Album) => {
    const result = await MediaLibrary.getAssetsAsync({
        album: album,
        mediaType: MediaLibrary.MediaType.photo,
        first: 50,
        sortBy: "creationTime",
    });

    return result.assets;
};
