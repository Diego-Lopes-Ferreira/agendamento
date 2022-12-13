import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import globals from "styles/globals.module.css";
import { form } from "styles/blocks/form.module.css";
import cssutils from "styles/utility.module.css";
import clsx from "clsx";

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
      <div className={form}>
        <input
          type="text"
          value={login}
          onChange={(e) => set_login(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => set_password(e.target.value)}
        />
        <p
          className={clsx(cssutils.font_highlight, cssutils.font_200)}
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
