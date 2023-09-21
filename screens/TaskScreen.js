import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTaskContext } from "../Context/TaskContext";

export default function Tasks() {
  const { tasks, addTask, deleteTask, markTaskCompleted, unmarkTaskCompleted } =
    useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => {
        if (item.completed) {
          unmarkTaskCompleted(item.id);
        } else {
          markTaskCompleted(item.id);
        }
      }}
      style={[styles.taskItem, item.completed && styles.completedTask]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.deletebutton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.buttondeleteText}>Delete Task</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        onChangeText={(text) => setNewTaskTitle(text)}
        value={newTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        onChangeText={(text) => setNewTaskDescription(text)}
        value={newTaskDescription}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (newTaskTitle) {
            addTask({
              title: newTaskTitle,
              description: newTaskDescription,
              completed: false,
            });
            setNewTaskTitle("");
            setNewTaskDescription("");
          }
        }}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <Text style={styles.completedHeader}>Active Tasks</Text>
      <FlatList
        data={activeTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.activeTasks}
      />
      {completedTasks.length > 0 && (
        <View>
          <Text style={styles.completedHeader}>Completed Tasks</Text>
          <FlatList
            data={completedTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.finishTasks}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  completedHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  deletebutton: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttondeleteText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "lightyellow",
  },
  completedTask: {
    backgroundColor: "lightgreen",
  },
  activeTasks: {
    minHeight: 200,
  },
  finishTasks: {
    maxHeight: 200,
  },
});
