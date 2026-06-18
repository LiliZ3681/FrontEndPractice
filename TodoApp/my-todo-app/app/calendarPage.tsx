import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CalendarPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>CalendarPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 64,
    backgroundColor: "#f6f7f2",
  },
  welcomeContent: {
    gap: 18,
    paddingTop: 56,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#233d4d",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    color: "#172026",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
  },
  subtitle: {
    color: "#4b5a62",
    fontSize: 18,
    lineHeight: 28,
  },
  button: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#fe7f2d",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
