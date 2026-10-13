"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

import styles from "./dashboard.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/auth/login");
    }
  }, [user, isLoading]);

  const handleLogout = async () => {
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
          {user && <span>{user.email}</span>} { }
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </aside>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <section className={styles.content}>{children}</section>
        )
      }
    </main>
  );
}
