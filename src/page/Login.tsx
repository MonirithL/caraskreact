import { ArrowLeft } from "lucide-react";
import GoogleLogo from "../assets/logo_google.png";
import style from "./Login.module.css";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {supabase} from "../service/SupabaseClient";
import { API_BASE_AUTH, CLIENT_BASE_AUTH } from "../service/APIBaseUrl";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //setup for func
  const navigate = useNavigate();

  const API_BASE = API_BASE_AUTH;
  

  async function login() {
    const res = await fetch(`${API_BASE}/login/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    navigate("/home", { replace: true });
  }
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${CLIENT_BASE_AUTH}/callback`,
      },
    });
  }
  async function loginAsGuest() {
    const res = await fetch(`${API_BASE}/guest`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    navigate("/home", { replace: true });
  }

  return (
    <div className={`main ${style.main}`}>
      <div className={style.logo_cont}>logo</div>
      <div className={style.purpose_card}>
        <h2>Login</h2>
        <p>Login to save and track progress Or to retore personal details!</p>
      </div>
      <div className={style.input_cont}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          className={style.inputs}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className={style.inputs}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <motion.button
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          className={style.loginbtn}
          onClick={login}
        >
          <h2>LOGIN</h2>
        </motion.button>
      </div>
      <div className={style.divider}>
        <div className={style.divider_abs}>OR</div>
        <div className={style.line}></div>
      </div>
      <div className={style.other_input_cont}>
        <motion.button
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          className={style.otherSigninbtn}
          onClick={loginWithGoogle}
        >
          <img src={GoogleLogo} alt="googleLogo" width={24} height={24} />
          <div>
            <p>Sign in with Google</p>
          </div>
        </motion.button>
        <motion.button
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          className={style.otherSigninbtn}
          onClick={() => navigate("/register")}
        >
          <div>
            <p>Register a Career Ask Account</p>
          </div>
        </motion.button>
        <button className={style.guestbtn} onClick={loginAsGuest}>
          <h5>CONTINUE AS GUEST</h5>
        </button>
      </div>
    </div>
  );
}
