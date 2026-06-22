import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusFilter } from "../types/calendar";

const statusFilters: StatusFilter[] = ["all", "active", "completed"];

type TodoStatusFilterProps = {
  value: StatusFilter;
  onChange: (filter: StatusFilter) => void;
};

export default function TodoStatusFilter({
  value,
  onChange,
}: TodoStatusFilterProps) {
  return (
    <View style={styles.filterRow}>
      {statusFilters.map((filter) => {
        const isSelected = filter === value;

        return (
          <Pressable
            key={filter}
            style={[styles.filterButton, isSelected && styles.selectedButton]}
            onPress={() => onChange(filter)}
          >
            <Text style={[styles.filterText, isSelected && styles.selectedText]}>
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#f6f7f2",
  },
  selectedButton: {
    backgroundColor: "#233d4d",
  },
  filterText: {
    color: "#4b5a62",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  selectedText: {
    color: "#ffffff",
  },
});
