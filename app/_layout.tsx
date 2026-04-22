import { ROUTES } from "@/constant/routesName";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name={ROUTES.INDEX} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.ALBUM} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.ASSET} options={{ headerShown: false }} />
    </Stack>
  );
}
