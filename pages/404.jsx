import Link from "next/link";
import React from "react";
import styles from "styles/globals.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.containerCenterPage}>
      <h1>404 kk</h1>
      <Link href={"/"}>Click here to go back home</Link>
    </div>
  );
}
