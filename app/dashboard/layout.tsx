"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

import styles from "./dashboard.module.css";
import error from "next/dist/api/error";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleLogout = async() => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>Write Club</p>
        <div className={styles.userBlock}>
           {/* output user dets here later */}
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </aside>
      <section className={styles.content}>{children}</section>
    </main>
  );
}
