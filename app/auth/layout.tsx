"use client";

import Link from "next/link";
import styles from "./auth.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const { user, isLoading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (user && !isLoading) {
        router.replace("/dashboard");
      }
    }, [user, isLoading]);
    
  return (
    <main className={styles.shell}>
      <section className={styles.panel}>
        <Link href="/" className={styles.brand}>
          Write Club
        </Link>
        {
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <>{children}</>
          )
        }
      </section>
    </main>
  );
}
