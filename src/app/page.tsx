"use client";
import Image from "next/image";
import styles from "./page.module.css";
import BasicTable from "./email-schecdule/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <BasicTable />
    </main>
  );
}
