import * as SQLite from "expo-sqlite";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
}

// sync Method
const db = SQLite.openDatabaseSync("tasks.db");

export function initDatabase() {
    try {
        db.execSync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error("Database initialization error:", error);
    }
}

export function addTask(title: string, description: string, status: string) {
    try {
        db.runSync(
            "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?);",
            [title, description, status]
        );
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}

export function getTask(): Task[] {
    try {
        const result = db.getAllSync<Task>("SELECT * FROM tasks;");
        return result;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

export function deleteTask(id: number) {
    try {
        db.runSync("DELETE FROM tasks WHERE id = ?;", [id]);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

export function updateTask(id: number, title: string, description: string, status: string) {
    try {
        db.runSync(
            "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?;",
            [title, description, status, id]
        );
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}
