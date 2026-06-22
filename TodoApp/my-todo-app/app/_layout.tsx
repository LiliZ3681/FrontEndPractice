import { Stack } from "expo-router";
import Providers from "./providers";

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen
          name="calendarPage"
          options={{
            title: "My Todo",
          }}
        />
      </Stack>
    </Providers>
  );
}
