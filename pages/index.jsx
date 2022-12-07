import Link from "next/link";
import React from "react";
import globals from "styles/globals.module.css";

export default function MainPage() {
  return (
    <div className={globals.containerCenterPage}>
      <h1>This is an app</h1>
      <p>Created for you ... whatever.</p>
      <Link href={"/auth/login"}>Click here to login</Link>
      <Link href={"/auth/register"}>Click here to register</Link>
    </div>
  );
}
