import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Todo App</Text>
        </View>
        <Text style={styles.title}>Organize your day with less noise.</Text>
        <Text style={styles.subtitle}>
          Add tasks, track what matters, and keep your list calm and clear.
        </Text>
      </View>

      <Pressable style={styles.button}>
        <Link style={styles.buttonText} rel="stylesheet" href="/calendarPage">
          Get started
        </Link>
      </Pressable>
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
