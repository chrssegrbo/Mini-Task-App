import { updateTask } from "@/lib/database";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function UpdateTaskScreen() {
    const { id, title, description, status } = useLocalSearchParams<{
        id: string;
        title: string;
        description: string;
        status: string;
    }>();

    const [taskTitle, setTaskTitle] = useState(title ?? "");
    const [taskDescription, setTaskDescription] = useState(description ?? "");
    const [taskStatus, setTaskStatus] = useState(status ?? "Pending");

    const handleUpdate = () => {
        if (!taskTitle.trim()) {
            return;
        }
        try {
            updateTask(Number(id), taskTitle.trim(), taskDescription, taskStatus);
            router.replace({ pathname: "/tasks", params: { success: "updated" } });
        } catch (error) {
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerTitle}>Update Task</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Task Title</Text>
                    <TextInput
                        style={styles.input}
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        placeholder="Enter task name"
                        placeholderTextColor="#94A3B8"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        placeholder="Describe the task..."
                        placeholderTextColor="#94A3B8"
                        multiline
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusRow}>
                        {["Pending", "Ongoing", "Finished"].map((opt) => {
                            let iconName: "time-outline" | "sync-outline" | "checkmark-done-outline" = "time-outline";
                            if (opt === "Ongoing") iconName = "sync-outline";
                            if (opt === "Finished") iconName = "checkmark-done-outline";

                            return (
                                <Pressable
                                    key={opt}
                                    style={[
                                        styles.statusOption, 
                                        taskStatus === opt && styles.statusSelected
                                    ]}
                                    onPress={() => setTaskStatus(opt)}
                                >
                                    <Ionicons 
                                        name={iconName} 
                                        size={22} 
                                        color={taskStatus === opt ? "#FF9B51" : "#64748B"} 
                                        style={{ marginBottom: 4 }}
                                    />
                                    <Text style={[
                                        styles.statusOptionText, 
                                        taskStatus === opt && styles.statusTextSelected
                                    ]}>
                                        {opt}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.saveButton} onPress={handleUpdate}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
                
                <Pressable 
                    style={styles.cancelButton} 
                    onPress={() => router.push({ 
                        pathname: "/task-detail", 
                        params: { id, title, description, status } 
                    })}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F8FAFC",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
        marginTop: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSpacer: {
        width: 40,
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#64748B",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        padding: 16,
        fontSize: 16,
        color: "#1E293B",
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
    },
    statusRow: {
        flexDirection: "row",
        gap: 8,
    },
    statusOption: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
    },
    statusSelected: {
        backgroundColor: "#FFF7ED",
        borderColor: "#FF9B51",
    },
    statusOptionText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748B",
    },
    statusTextSelected: {
        color: "#FF9B51",
    },
    footer: {
        gap: 12,
        marginTop: 40,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: "#FF9B51",
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#FF9B51",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    cancelButton: {
        paddingVertical: 16,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#94A3B8",
        fontSize: 15,
        fontWeight: "600",
    },
});
