import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import globals from "styles/globals.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, set_showPassword] = useState(false);
  const [login, set_login] = useState("");
  const [password, set_password] = useState("");

  async function handleLogin() {
    const res = await signIn("credentials", {
      redirect: false,
      email: login,
      password: password,
    });
    if (res?.error) {
      console.warn("Error: ");
      console.warn(res.error);
    } else {
      router.push("/app");
    }
  }

  return (
    <div className={globals.container}>
      <h1>LOGIN</h1>
      <div>
        <input
          className={globals.inputLine}
          type="text"
          value={login}
          onChange={(e) => set_login(e.target.value)}
        />
        <input
          className={globals.inputLine}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => set_password(e.target.value)}
        />
        <p
          onClick={() => {
            set_showPassword(!showPassword);
          }}
        >
          [{showPassword ? "x" : " "}] Show Password
        </p>
        <button onClick={handleLogin} className={globals.buttonFg}>
          Login
        </button>
      </div>
    </div>
  );
}
