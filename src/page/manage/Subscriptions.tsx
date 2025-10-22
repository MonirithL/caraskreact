import { useUser, type User } from "../../context/UserContext";
import style from "./Subscription.module.css";

import { ChevronLeft, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { buyForGroup, buyForUser } from "../../service/Payment";
import { useEffect, useState } from "react";

export type Plan = {
  title: string;
  perks: string[];
};
export type PlanKey = "free" | "personal" | "group";
export const planMap: Record<PlanKey, Plan> = {
  free: {
    title: "Free Plan",
    perks: ["Explore in the app freely", "Save goal and progress!"],
  },
  personal: {
    title: "Personal Plan",
    perks: [
      "No Ads",
      "Your data persists longer",
      "Feel good for supporting us!",
    ],
  },
  group: {
    title: "Paid Group Plan",
    perks: [
      "No Ads",
      "Your data persists with your account",
      "Can share your plan with 3 other person!",
      "Feel good for supporting us!",
    ],
  },
};

export default function Subscriptions() {
  const [plan_key, setPlan_key] = useState<PlanKey>("free");
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  function back() {
    navigate("/account", { replace: true });
  }

  async function payPersonal() {
    if (user !== null) {
      const newUser = await buyForUser();
      if (newUser !== null) {
        setUser(newUser);
      }
    }
  }
  async function payGroup() {
    if (user !== null) {
      const newUser = await buyForGroup();
      if (newUser !== null) {
        setUser(newUser);
      }
    }
  }
  function getUserPlanKey(user: User | null): PlanKey {
    if (!user) return "free";
    if (user.paidPersonal) return "personal";
    if (user.paidGroup) return "group";
    return "free";
  }

  useEffect(() => {
    console.log("Effect: ", JSON.stringify(user));
    const planKeyg = getUserPlanKey(user);
    setPlan_key(planKeyg);
    console.log(planKeyg);
  }, [user]);

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.back}>
          <button className={style.backbtn} onClick={back}>
            <ChevronLeft />
          </button>
        </div>
        <div className={style.header}>
          <h2>Manage My Subscription</h2>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.curr}>
          <h4 className={style.currtext}>
            Current plan:&nbsp; {planMap[plan_key].title}
          </h4>
          <div className={style.indentCurr}>
            {planMap[plan_key].perks.map((perk, index) => (
              <p className={style.currIndent} key={`perkCurr${index}`}>
                &nbsp;- {perk}
              </p>
            ))}
          </div>
        </div>
        {user?.paidGroup === true ? (
          <></>
        ) : (
          <div>
            <h2>You can upgrade to:</h2>
          </div>
        )}
        {user?.paidPersonal || user?.paidGroup ? (
          <></>
        ) : (
          <motion.div
            className={style.promocard}
            style={{
              border: "2px solid transparent",
              borderRadius: "0.5rem",
              padding: "1rem",
              backgroundColor: "var(--white-bg)",
            }}
            whileHover={{
              scale: 1.03,
              borderColor: "var(--main-color)",
              backgroundColor: "#fff",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div>Personal Plan</div>
            <h3>For Just: $1.99</h3>
            <div>
              <h3>What you get:</h3>
              <p> - No Ads</p>
              <p> - Your data persists longer</p>
              <p> - Feel good for supporting us!</p>
            </div>
            <div className={style.center}>
              <motion.button
                className={style.purchase}
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
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                onClick={payPersonal}
              >
                <ShoppingCart />
                <h4>Purchase Plan</h4>
              </motion.button>
            </div>
          </motion.div>
        )}
        {user?.paidGroup !== true ? (
          <motion.div
            className={`${style.group}`}
            style={{
              border: "2px solid transparent",
              borderRadius: "0.5rem",
              padding: "1rem",
              backgroundColor: "var(--white-bg)",
            }}
            whileHover={{
              scale: 1.03,
              borderColor: "var(--main-color)",
              backgroundColor: "#fff",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div>Paid Group Plan</div>
            <div>
              <h3>For Just: $8.99</h3>
            </div>
            <div>
              <h3>What you get:</h3>
              <p> - No Ads</p>
              <p> - Your data persists with your account</p>
              <p> - Can share your plan with 3 other person!</p>
              <p> - Feel good for supporting us!</p>
            </div>
            <div className={style.center}>
              <motion.button
                className={style.purchase}
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
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                onClick={payGroup}
              >
                <ShoppingCart />
                <h4>Purchase Plan</h4>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
