import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
};

export default function Button({ label, theme }: Props) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, styles.primaryButtonContainer]}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={() => alert("Pressed")}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={styles.primaryButtonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert("Pressed")}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  primaryButtonLabel: {
    color: "#25292e",
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#fff",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  primaryButtonContainer: {
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 18,
  },
});
