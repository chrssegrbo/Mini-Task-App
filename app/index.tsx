import { initDatabase } from "@/lib/database";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  //useEffect
  useEffect (() => {
    try {
        initDatabase();
    } catch {
        Alert.alert("Database Error", "Failed to initialized Database")
    }
}, [])

    return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("@/assets/images/applogo.png")} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>TaskMates</Text>
        <Text style={styles.subtitle}>Because I'll do it later never works.</Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={() => router.push("/tasks")}>
          <Text style={styles.buttonText}>Open Task</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        </Pressable>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC", 
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 40,
      paddingHorizontal: 24,
    },
    logoContainer: {
      marginBottom: 40,
    },
    logoImage: {
      width: 220,
      height: 220,
      resizeMode: "contain",
      marginLeft: -20,
    },
    title: {
      fontSize: 56,
      fontWeight: "800",
      color: "#1E293B", // Updated to theme Slate
      marginBottom: 4,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#64748B", // Updated to theme Light Slate
      marginBottom: 32,
      textAlign: "center",
      lineHeight: 20,
    },
    footer: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    button: {
      backgroundColor: "#FF9B51", // Updated to theme Orange
      paddingHorizontal: 48,
      paddingVertical: 18,
      borderRadius: 16, // Changed to match other buttons
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 20,
      shadowColor: "#FF9B51",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 18,
    },
    buttonIcon: {
      marginLeft: 4,
    },
});