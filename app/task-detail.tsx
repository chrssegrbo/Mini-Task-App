import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskDetail() {
    const { id, title, description, status } = useLocalSearchParams<{
        id: string;
        title: string;
        description: string;
        status: string;
    }>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.replace("/tasks")} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#1E293B" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Task Detail</Text>
                    <View style={styles.headerSpacer} />
                </View>
                
                <View style={styles.detailsCard}>
                    <View style={styles.headerRow}>
                        <Text style={styles.taskNumber}>Task #{id}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>
                    <Text style={styles.label}>Title: {title}</Text>
                    
                    <View style={styles.descriptionSection}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                </View>
            </View>

            <Pressable 
                style={styles.editButton} 
                onPress={() => router.push({ 
                    pathname: "/update_task", 
                    params: { id, title, description, status } 
                })}
            >
                <Text style={styles.editButtonText}>Edit Task</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F8FAFC",
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
        marginTop: 40,
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
    detailsCard: {
        backgroundColor: "#FFFFFF",
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    taskNumber: {
        fontSize: 14,
        fontWeight: "800",
        color: "#FF9B51",
        backgroundColor: "#FFF7ED",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    label: {
        fontSize: 16,
        color: "#475569",
        marginBottom: 8,
        lineHeight: 24,
        fontWeight: "700",
    },
    descriptionSection: {
        marginTop: 8,
    },
    descriptionText: {
        fontSize: 15,
        color: "#64748B",
        lineHeight: 22,
        fontWeight: "400",
    },
    statusBadge: {
        backgroundColor: "transparent",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#FF9B51",
    },
    statusText: {
        color: "#FF9B51",
        fontWeight: "800",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    editButton: {
        backgroundColor: "#FF9B51",
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#FF9B51",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 20,
    },
    editButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
