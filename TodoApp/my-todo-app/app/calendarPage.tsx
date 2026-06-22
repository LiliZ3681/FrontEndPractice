import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { addTodo, deleteTodo, editTodo, getAllTodos } from "../api";
import AddTodoModal from "../components/AddTodoModal";
import TodoCard from "../components/TodoCard";
import TodoStatusFilter from "../components/TodoStatusFilter";
import WeekDaySelector from "../components/WeekDaySelector";
import { StatusFilter, WeekDay } from "../types/calendar";
import { ITask, NewTask } from "../types/tasks";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekDays(): WeekDay[] {
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
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
  const filteredTasks = selectedDayTasks.filter((task) => {
    if (statusFilter === "active") return !task.completed;
    if (statusFilter === "completed") return task.completed;
    return true;
  });

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

      <WeekDaySelector
        weekDays={weekDays}
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
      />

      <View style={styles.todoPanel}>
        <View style={styles.todoPanelHeader}>
          <Text style={styles.selectedDate}>{selectedDay?.fullDate}</Text>
          <TodoStatusFilter value={statusFilter} onChange={setStatusFilter} />
        </View>
        {isLoading && <Text style={styles.emptyText}>Loading todos...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!isLoading &&
          !error &&
          filteredTasks.map((task) => (
            <TodoCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTodoComplete}
              onDelete={removeTodo}
            />
          ))}
        {!isLoading && !error && filteredTasks.length === 0 && (
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
});
