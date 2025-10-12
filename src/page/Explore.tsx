import { ChevronDown, X } from "lucide-react";
import style from "./Explore.module.css";
import {useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import NotSignIn from "../component/NoSignedIn";

export default function Explore() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  function toggleTerms() {
    setShowTerms(!showTerms);
  }

  // function search() {
  //   //send fetch with the terms and current text(remove duplicates): express send back
  //   //put results []careers
  // }
  // function teleprompter() {
  //   //prompt users to add something
  //   //uses gemini, send the current prompters to gemini after a search and returns a suggestion
  // }

  // function removeTerm(index: number) {
  //   //remove a term from the terms list
  // }
  function seeMore(route: string, data: string) {
    //data can be obj type
    navigate(route, { state: data });

    // const location = useLocation();
    // const data = location.state as MyDataType;

    // console.log(data);
    // return <div>{data?.title}</div>;
  }

  if (user === null) {
    return <NotSignIn />;
  }
  return (
    <div className={style.main}>
      <div className={style.input_header}>
        <h4>Start exploring</h4>
        <p>- try putting a career or something about your self</p>
      </div>

      <div className={style.searchbox}>
        <input type="text" placeholder="type to search..." />
        <div>
          <button>search</button>
        </div>
      </div>

      <div className={style.term_header}>
        <p>View all terms searching</p>
        <button onClick={toggleTerms}>
          <ChevronDown
            className={style.term_minmax}
            style={{
              transform: `rotateX(${showTerms ? "180" : "0"}deg)`,
            }}
          />
        </button>
      </div>

      <motion.div
        className={`${style.terms} ${showTerms ? style.open : ""}`}
        animate={{
          maxHeight: showTerms ? "50rem" : "5rem",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        style={{
          flexWrap: showTerms ? "wrap" : "nowrap",
          overflowX: showTerms ? "hidden" : "scroll",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={`term${i}`} className={style.term}>
            <p>Search term {i}</p>
            <button>
              <X className={style.remove_btn} />
            </button>
          </div>
        ))}
      </motion.div>

      <div className={style.result_wrapper}>
        <h5>Results:</h5>

        {/* <button className={style.result}>
            <div className={style.left}>
              <h5>Career 1</h5>
              <p>Why is it match the career thingy</p>
            </div>
            <div className={style.right}>see more</div>
          </button> */}
        <div className={style.results}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <button key={i} className={style.result}>
              <div className={style.left}>
                <h5>Career {i}</h5>
                <p>Why is it match the career thingy</p>
              </div>
              <div className={style.right} onClick={()=>{seeMore("/","hello")}}>see more</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
