"use client";

import styles from "../dashboard.module.css";

import { collection, getDocs } from "firebase/firestore";
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
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const snapshots = await getDocs(collection(db, "notes"));
        setNotes(snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Note)));
      }
      catch (error) {
        console.error("Error fetching notes:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className={styles.noteList}>
      {loading ? (
        <div>Feching your notes...</div>
      ):
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
