import { addTask } from '@/lib/database';
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    // Clears the form when you enter the page
    useFocusEffect(
        useCallback(() => {
            setTitle("");
            setDescription("");
            setStatus("Pending");
        }, [])
    );

    const handleSave = async () => {
        if (!title.trim()) return;
        try {
            addTask(title.trim(), description, status);
            router.replace({ pathname: "/tasks", params: { success: "added" } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerTitle}>Add Task</Text>
                <View style={styles.headerSpacer} />
            </View>

        
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Task Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter task name"
                        placeholderTextColor="#94A3B8"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe the task..."
                        placeholderTextColor="#94A3B8"
                        multiline
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Select Status</Text>
                    <View style={styles.statusRow}>
                        {statusOptions.map((opt) => {
                            let iconName: "time" | "sync" | "checkmark-done" = "time";
                            if (opt === "Ongoing") iconName = "sync";
                            if (opt === "Finished") iconName = "checkmark-done";

                            return (
                                <Pressable
                                    key={opt}
                                    style={[styles.statusOption, status === opt && styles.statusSelected]}
                                    onPress={() => setStatus(opt)}
                                >
                                    <Ionicons 
                                        name={iconName} 
                                        size={22} 
                                        color={status === opt ? "#FF9B51" : "#64748B"} 
                                        style={{ marginBottom: 4 }}
                                    />
                                    <Text style={[styles.statusOptionText, status === opt && styles.statusTextSelected]}>
                                        {opt}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </View>

            {/* Bottom Button */}
            <View style={styles.fixedFooter}>
                <Pressable style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Task</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 60,
        marginBottom: 32,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
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
        marginBottom: 12,
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
        gap: 10,
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
        fontSize: 13,
        fontWeight: "600",
        color: "#64748B",
    },
    statusTextSelected: {
        color: "#FF9B51",
    },
    fixedFooter: {
        paddingBottom: 40,
        paddingTop: 10,
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
});
