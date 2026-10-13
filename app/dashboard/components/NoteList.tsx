"use client";

import styles from "../dashboard.module.css";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

interface NoteData {
  title: string,
  content: string,
  userId: string
}
interface Note extends NoteData {
  id: string
}

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsub = onSnapshot(collection(db, "notes"), (snapshot) => {
      setNotes(snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Note;
      }));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className={styles.noteList}>
      {loading ? (
        <div>Feching your notes...</div>
      ) :
        notes?.map((note) => (
          <div key={note.id} className={styles.noteCard}>
            <h3 className={styles.noteCardTitle}>{note.title}</h3>
            <p className={styles.noteCardContent}>{note.content}</p>
          </div>
        ))
      }
    </div>
  )
}
