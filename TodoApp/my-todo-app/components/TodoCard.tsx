import { Pressable, StyleSheet, Text, View } from "react-native";
import { ITask } from "../types/tasks";

type TodoCardProps = {
  task: ITask;
  onToggleComplete: (task: ITask) => void;
  onDelete: (id: number) => void;
};

export default function TodoCard({
  task,
  onToggleComplete,
  onDelete,
}: TodoCardProps) {
  return (
    <View style={styles.taskCard}>
      <Pressable
        style={[styles.checkbox, task.completed && styles.checkedCheckbox]}
        onPress={() => onToggleComplete(task)}
      >
        {task.completed && <Text style={styles.checkMark}>✓</Text>}
      </Pressable>

      <View style={styles.taskContent}>
        <Text
          style={[styles.taskTitle, task.completed && styles.completedTaskText]}
        >
          {task.title}
        </Text>
        <Text
          style={[
            styles.taskDescription,
            task.completed && styles.completedTaskText,
          ]}
        >
          {task.description}
        </Text>
      </View>

      <Pressable style={styles.deleteButton} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#f6f7f2",
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fe7f2d",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  checkedCheckbox: {
    backgroundColor: "#fe7f2d",
  },
  checkMark: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },
  taskContent: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    color: "#172026",
    fontSize: 17,
    fontWeight: "800",
  },
  taskDescription: {
    color: "#4b5a62",
    fontSize: 15,
    lineHeight: 22,
  },
  completedTaskText: {
    color: "#8a969c",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fee4df",
  },
  deleteButtonText: {
    color: "#b42318",
    fontSize: 13,
    fontWeight: "800",
  },
});
