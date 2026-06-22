import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { addTodo, deleteTodo, editTodo, getAllTodos } from "../api";
import AddTodoModal from "../components/AddTodoModal";
import { ITask, NewTask } from "../types/tasks";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekDays() {
  const today = new Date();
  const monday = new Date(today);
  const daysSinceMonday = (today.getDay() + 6) % 7; //day of the week
  monday.setDate(today.getDate() - daysSinceMonday); // found Monday

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      id: date.toISOString(),
      dateString: date.toISOString().split("T")[0],
      dayName: dayNames[date.getDay()],
      dayNumber: date.getDate(),
      fullDate: date.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    };
  });
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<ITask[]>([]); // store todos
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const weekDays = useMemo(() => getWeekDays(), []);
  // useMemo: cache result of weekDays between re-renders

  // make the defualt date to "today"
  const todayId = new Date().toDateString();
  const defaultSelectedDay = weekDays.find(
    (day) => new Date(day.id).toDateString() === todayId,
  );
  const [selectedDayId, setSelectedDayId] = useState(
    defaultSelectedDay?.id ?? weekDays[0].id,
  );
  const selectedDay = weekDays.find((day) => day.id === selectedDayId);
  const selectedDayTasks = tasks.filter(
    (task) => task.date === selectedDay?.dateString,
  );

  const saveTodo = async (todo: NewTask) => {
    const newTodo = await addTodo(todo);
    setTasks((currentTasks) => [...currentTasks, newTodo]);
  };

  const toggleTodoComplete = async (task: ITask) => {
    const updatedTodo = await editTodo({
      ...task,
      completed: !task.completed,
    });

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === updatedTodo.id ? updatedTodo : currentTask,
      ),
    );
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    setTasks((currentTasks) =>
      currentTasks.filter((currentTask) => currentTask.id !== id),
    );
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const todos = await getAllTodos();
        setTasks(todos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo</Text>
        <Text style={styles.subtitle}>Choose a day and plan what matters.</Text>
      </View>

      <View style={styles.weekRow}>
        {weekDays.map((day) => {
          const isSelected = day.id === selectedDayId;

          return (
            <Pressable
              key={day.id}
              style={[styles.dayButton, isSelected && styles.selectedDayButton]}
              onPress={() => setSelectedDayId(day.id)}
            >
              <Text
                style={[styles.dayName, isSelected && styles.selectedDayText]}
              >
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

      <View style={styles.todoPanel}>
        <View style={styles.todoPanelHeader}>
          <Text style={styles.selectedDate}>{selectedDay?.fullDate}</Text>
        </View>
        {isLoading && <Text style={styles.emptyText}>Loading todos...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!isLoading &&
          !error &&
          selectedDayTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Pressable
                style={[
                  styles.checkbox,
                  task.completed && styles.checkedCheckbox,
                ]}
                onPress={() => toggleTodoComplete(task)}
              >
                {task.completed && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTaskText,
                  ]}
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
              <Pressable
                style={styles.deleteButton}
                onPress={() => removeTodo(task.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          ))}
        {!isLoading && !error && selectedDayTasks.length === 0 && (
          <Text style={styles.emptyText}>No todos yet.</Text>
        )}
      </View>
      <Pressable
        style={styles.addButton}
        onPress={() => setIsAddModalOpen(true)}
      >
        <Text style={styles.addButtonText}>Add Todo</Text>
      </Pressable>
      {selectedDay && (
        <AddTodoModal
          visible={isAddModalOpen}
          selectedDate={selectedDay.dateString}
          onClose={() => setIsAddModalOpen(false)}
          onSave={saveTodo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 64,
    backgroundColor: "#f6f7f2",
  },
  header: {
    gap: 8,
    marginBottom: 28,
  },
  title: {
    color: "#172026",
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42,
  },
  subtitle: {
    color: "#4b5a62",
    fontSize: 16,
    lineHeight: 24,
  },
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
  todoPanel: {
    flex: 1,
    borderRadius: 22,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  todoPanelHeader: {
    gap: 12,
    marginBottom: 16,
  },
  selectedDate: {
    color: "#172026",
    fontSize: 22,
    fontWeight: "800",
  },
  addButton: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#fe7f2d",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyText: {
    color: "#6a767d",
    fontSize: 16,
  },
  errorText: {
    color: "#b42318",
    fontSize: 16,
  },
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
