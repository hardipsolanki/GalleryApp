export const ROUTES = {
    INDEX: "index",
    ALBUM: "albums/[albumId]",
    ASSET: "albums/asset/[assetId]"
}

export const ROUTES_PATH = {
    Index: "/index",
    album: "/albums/[albumId]",
    asset: "/albums/asset/[assetId]"
} as const