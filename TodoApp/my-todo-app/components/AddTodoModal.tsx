import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { TaskFormValues } from "../types/tasks";

const addTodoSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
});

type AddTodoFormValues = z.infer<typeof addTodoSchema>;

type AddTodoModalProps = {
  visible: boolean;
  selectedDate: string;
  onClose: () => void;
  onSave: (todo: TaskFormValues) => Promise<void>;
};

export default function AddTodoModal({
  visible,
  selectedDate,
  onClose,
  onSave,
}: AddTodoModalProps) {
  const titleInputRef = useRef<TextInput>(null); //opens the keyboard automatically
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoFormValues>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // for keyboard effect: focus on title input
  useEffect(() => {
    if (!visible) return;

    const focusTimer = setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
    // Why wait? Because the modal has a slide animation.
    // If we focus immediately, the input may not be ready yet.
    return () => clearTimeout(focusTimer);
  }, [visible]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async (data: AddTodoFormValues) => {
    await onSave({
      title: data.title,
      description: data.description ?? "",
      completed: false,
      date: selectedDate,
    });
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Add Todo</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  ref={titleInputRef}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur} // can be removed
                  placeholder="Todo title"
                  style={styles.input}
                />
              )}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title.message}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Todo description"
                  multiline
                  style={[styles.input, styles.textArea]}
                />
              )}
            />
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.saveButton}
              onPress={handleSubmit(handleSave)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 72,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  sheet: {
    gap: 16,
    marginHorizontal: 18,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
    borderRadius: 28,
    backgroundColor: "#ffffff",
  },
  title: {
    color: "#172026",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#6a767d",
    fontSize: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#172026",
    fontSize: 14,
    fontWeight: "800",
  },
  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#d6ddd8",
    borderRadius: 14,
    color: "#172026",
    backgroundColor: "#f6f7f2",
  },
  textArea: {
    minHeight: 96,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#b42318",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#eef1ed",
  },
  cancelButtonText: {
    color: "#172026",
    fontWeight: "800",
  },
  saveButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#fe7f2d",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
});
