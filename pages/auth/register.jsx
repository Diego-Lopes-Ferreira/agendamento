import React, { useState } from "react";
import { useRouter } from "next/router";
import globals from "styles/globals.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, set_showPassword] = useState(false);
  const [login, set_login] = useState("");
  const [password, set_password] = useState("");

  async function handleRegister() {
    const data = {
      email: login,
      password: password,
      name: "Diego",
      ra: "2267241",
    };
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status == "200") {
      router.push("/auth/login");
    }
  }

  return (
    <div className={globals.container}>
      <h1>REGISTER</h1>
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
        <button onClick={handleRegister} className={globals.buttonFg}>
          Register
        </button>
      </div>
    </div>
  );
}
