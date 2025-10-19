import GoogleLogo from "../assets/logo_google.png";
import style from "./Register.module.css";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { supabase } from "../service/SupabaseClient";
import { API_BASE_AUTH, CLIENT_BASE_AUTH } from "../service/APIBaseUrl";
import AppbarLogo from "../component/AppbarLogo";
import { useToast } from "../context/ToastContext";
export default function Register() {
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  //setup for func
  const navigate = useNavigate();

  const API_BASE = API_BASE_AUTH;
  function validate() {
    if (email.trim().length === 0) {
      showToast("Please Enter an Email Address!");
      return false;
    }
    if (!email.trim().endsWith("@gmail.com")) {
      showToast("Invalid Email Address!");
      return false;
    }
    if (password.length === 0) {
      showToast("Please Enter a Password!");
      return false;
    }
    if (password.length > 30) {
      showToast("Password too long");
      return false;
    }
    if (password.length > 0 && password.length < 6) {
      showToast("Password must be at least 6 characters!");
      return false;
    }
    if (!/[a-z]/.test(password.trim())) {
      showToast("Password must contain at least one letter!");
      return false;
    }
    if (!/[A-Z]/.test(password.trim())) {
      showToast("Password must contain at least one Capital letter!");
      return false;
    }
    if (!/\d/.test(password.trim())) {
      showToast("Password must contain at least one number!");
      return false;
    }
    if (password.trim() !== conPassword.trim()) {
      showToast("Both Passwords must be the same!");
      setConPassword("");
      return false;
    }
    return true;
  }
  async function register() {
    if (!validate()) {
      return;
    }
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      showToast("Register Failed");
    } else {
      navigate("/home", { replace: true });
    }
    //res is okay, sign user in
  }
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${CLIENT_BASE_AUTH}/callback`,
      },
    });
  }
  // async function loginAsGuest() {
  //   const res = await fetch(`${API_BASE}/guest`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });

  //   if (!res.ok) {
  //     throw new Error("Login failed");
  //   }
  //   navigate("/home", { replace: true });
  // }

  return (
    <div className={`main ${style.main}`}>
      <div className={style.logo_cont}>
        <AppbarLogo />
      </div>
      <div className={style.purpose_card}>
        <h2>SIGN UP</h2>
        <p>
          Looks like you are new to this, no worries! Let’s get started in a
          jiffy!
        </p>
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
          type={`${showPassword ? "text" : "password"}`}
          value={password}
          placeholder="Password"
          className={style.inputs}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <input
          type={`${showPassword ? "text" : "password"}`}
          value={conPassword}
          placeholder="Confirm Password"
          className={style.inputs}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConPassword(e.target.value)
          }
        />
        <div className={style.showpwdbox}>
          <input
            type="checkbox"
            id="showpwd"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showpwd">Show Password</label>
        </div>
        <p className={style.signinTos}>
          By selecting Create Account below, I agree to the Terms of Services of
          Condition and Privacy Policy.
        </p>
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
          onClick={register}
        >
          <h3>CREATE ACCOUNT</h3>
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
        <button className={style.guestbtn} onClick={() => navigate("/login")}>
          <h5>BACK TO LOGIN</h5>
        </button>
      </div>
    </div>
  );
}
