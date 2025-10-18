import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import style from "./AccountInfo.module.css";
import unsetProfile from "../../assets/anon_profile.png";
import { ChevronLeft, Pen } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { API_BASE } from "../../service/APIBaseUrl";
export default function AccountInfo() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { user, setUser } = useUser();
  const [newImage, setNewImage] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [isDiff, setDiff] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Please select a valid image file");

      return;
    }
    setFileError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setNewImage(result);
      console.log(result);
    };
    reader.readAsDataURL(file);
  }
  async function calllUpdate() {
    const res = await fetch(`${API_BASE}/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, profile_img: newImage }),
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user[0]);
      setEdit(false);
      setDiff(false);
      setNewImage("");
    } else {
      console.log("FAILED TO UPDATE");
    }
  }
  function toggleEdit() {
    if (user?.name && edit) {
      setUsername(user.name);
    }
    setEdit(!edit);
  }

  function back() {
    navigate("/account", { replace: true });
  }

  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    const hasNameChanged = user && username !== user.name;
    const hasImageChanged = newImage !== "";
    setDiff(hasNameChanged || hasImageChanged);
  }, [username, newImage, user]);

  return (
    <div className={style.main}>
      <div className={style.back}>
        <button className={style.backbtn} onClick={back}>
          <ChevronLeft />
        </button>
      </div>
      <div className={style.header}>
        <h2>Edit Account Info</h2>
        <button onClick={toggleEdit}>
          <Pen />
        </button>
      </div>
      <div className={style.img_wrapper}>
        <label className={style.img_holder}>
          <input
            type="file"
            accept="image/*"
            className={style.file_I}
            onChange={handleFile}
          />
          <img
            src={
              newImage !== ""
                ? newImage
                : user?.profile_img
                ? user?.profile_img
                : unsetProfile
            }
            alt=""
            className={style.profile}
          />
          <h5>{fileError ? fileError : "Tap to change profile"}</h5>
        </label>
      </div>
      <div className={style.field}>
        <h4>Username:&nbsp;</h4>
        {edit ? (
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        ) : (
          <p>{user?.name}</p>
        )}
        <h4>Email:&nbsp;</h4>
        <p>{user?.email} (unchangeable)</p>
      </div>
      {isDiff ? (
        <div className={style.action}>
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
            onClick={calllUpdate}
          >
            <h5>Save Changes</h5>
          </motion.button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
