"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

import styles from "../dashboard.module.css";
import { useAuth } from "@/context/AuthContext";

export default function NewNote() {
    const {user} = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const doc = await addDoc(collection(db, "notes"), {
                title,
                content,
                userId: user?.uid
            });
            console.log("Note added with ID:", doc.id);

            // reset state
            setTitle("")
            setContent("")
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    return (
        <div className={styles.newNote}>
            <h2 className={styles.newNoteTitle}>New Note</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={styles.textarea}
                        rows={6}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Add Note
                </button>
            </form>
        </div>
    );
}