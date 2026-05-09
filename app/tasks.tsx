import { deleteTask, getTask } from '@/lib/database';
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

// Define Task type
type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
};

export default function TaskScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const params = useLocalSearchParams<{ success?: string }>();

    const loadTask = () => {
        try {
            const data = getTask();
            setTasks(data);
        } catch (error) {
            Alert.alert("Load Error", "Failed to Load the Tasks");
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTask();
            if (params.success) {
                setShowSuccess(true);
                const timer = setTimeout(() => {
                    setShowSuccess(false);
                    router.setParams({ success: undefined });
                }, 2000);
                return () => clearTimeout(timer);
            }
        }, [params.success])
    );

    const handleDelete = (id: number) => {
        try {
            deleteTask(id);
            loadTask();
        } catch (error) {
            Alert.alert("Delete Error", "Failed to Delete Task");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSpacer} />
                <Text style={styles.headerTitle}>Task List</Text>
                <View style={styles.headerSpacer} />
            </View>

            {tasks.length === 0 ? (
                <View style={styles.emptyWrap}>
                    <Image
                        source={require("../assets/images/empty.png")}
                        style={styles.emptyImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.emptyText}>No Task Yet</Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.titleRow}>
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <Text style={styles.taskStatus}>{item.status}</Text>
                            </View>
                            <Text style={styles.taskDescription} numberOfLines={2}>{item.description}</Text>

                            <View style={styles.actions}>
                                <Pressable
                                    style={styles.detailButton}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/task-detail",
                                            params: {
                                                id: item.id,
                                                title: item.title,
                                                description: item.description,
                                                status: item.status
                                            }
                                        })
                                    }>
                                    <Text style={styles.detailButtonText}>View Task Details</Text>
                                </Pressable>

                                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}



            <Modal visible={showSuccess} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="checkmark" size={40} color="#FFFFFF" />
                        </View>
                        <Text style={styles.modalTitle}>Done!</Text>
                        <Text style={styles.modalSub}>
                            {params.success === "updated" ? "Task updated successfully." : "New task added to your list."}
                        </Text>
                    </View>
                </View>
            </Modal>
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
        marginBottom: 24,
        marginTop: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1E293B",
    },
    headerSpacer: {
        width: 40,
    },

    listContent: {
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
        textTransform: "capitalize",
        flex: 1,
        marginRight: 8,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    taskDescription: {
        fontSize: 15,
        color: "#64748B",
        marginBottom: 18,
        lineHeight: 22,
    },
    taskStatus: {
        fontSize: 12,
        fontWeight: "800",
        color: "#FF9B51",
        backgroundColor: "#FFF7ED",
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: "flex-start",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    emptyWrap: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 140,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 24,
        marginLeft: 20, // Nudge to the right
        opacity: 0.8,
    },
    emptyText: {
        fontSize: 18,
        color: "#94A3B8",
        textAlign: "center",
        fontWeight: "500",
    },
    detailButton: {
        backgroundColor: "#FF9B51",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flex: 1,
        alignItems: "center",
    },
    detailButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: "#FFF7ED",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FF9B51",
    },
    deleteButtonText: {
        color: "#FF9B51",
        fontWeight: "700",
        fontSize: 14,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(30, 41, 59, 0.4)", // Lighter overlay for auto-hide
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        width: "80%",
        borderRadius: 32,
        padding: 32,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FF9B51",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 12,
    },
    modalSub: {
        fontSize: 16,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 24,
    },
});