import { Pressable, StyleSheet, Text, View } from "react-native";
import { WeekDay } from "../types/calendar";

type WeekDaySelectorProps = {
  weekDays: WeekDay[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
};

export default function WeekDaySelector({
  weekDays,
  selectedDayId,
  onSelectDay,
}: WeekDaySelectorProps) {
  return (
    <View style={styles.weekRow}>
      {weekDays.map((day) => {
        const isSelected = day.id === selectedDayId;

        return (
          <Pressable
            key={day.id}
            style={[styles.dayButton, isSelected && styles.selectedDayButton]}
            onPress={() => onSelectDay(day.id)}
          >
            <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>
              {day.dayName}
            </Text>
            <Text
              style={[styles.dayNumber, isSelected && styles.selectedDayText]}
            >
              {day.dayNumber}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  dayButton: {
    flex: 1,
    minHeight: 78,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  selectedDayButton: {
    backgroundColor: "#fe7f2d",
  },
  dayName: {
    color: "#4b5a62",
    fontSize: 13,
    fontWeight: "700",
  },
  dayNumber: {
    color: "#172026",
    fontSize: 20,
    fontWeight: "800",
  },
  selectedDayText: {
    color: "#ffffff",
  },
});
