import { ChevronDown, X } from "lucide-react";
import style from "./Explore.module.css";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import NotSignIn from "../component/NoSignedIn";
import type { ExploreCareer } from "../type/Explore";
import { getExploreResultGEMINI } from "../service/ExploreFetch";
import nothing from "../assets/cat_s.png";
import loadingImg from "../assets/loading.gif";

export default function Explore() {
  const exploreCache = new Map<
    string,
    { careers: ExploreCareer[]; prompter: string }
  >();
  const location = useLocation();
  const termsFromState = location.state as { terms?: string } | undefined;
  const termsString = termsFromState?.terms ?? "";

  const { user } = useUser();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);

  const [input, setInput] = useState("");
  const [prompter, setPrompter] = useState(
    " - try putting something about your self"
  );
  const [searchTerms, setSearchTerms] = useState<string[]>(
    stringToArr(termsString)
  );

  const [resultCareers, setResultCareers] = useState<ExploreCareer[] | null>(
    null
  );

  function stringToArr(str: string) {
    console.log("str ", str);
    return str
      .split(",") // split by comma
      .map((s) => s.trim()) // remove extra spaces
      .filter((s) => s);
  }

  function addSearchTerm() {
    if (!input.trim()) return;
    const newTerms = input
      .split(",") // split by comma
      .map((term) => term.trim()) // trim spaces
      .filter((term) => term.length > 0);
    setSearchTerms([...searchTerms, ...newTerms]);
    setInput("");
  }
  function removeTerm(term: string) {
    const newArray = searchTerms.filter((item) => item !== term);
    setSearchTerms(newArray);
  }

  useEffect(() => {
    if (searchTerms.length === 0) {
      // Clear results if all removed
      setResultCareers(null);
      return;
    }

    let cancelled = false;

    async function runFetch() {
      console.log("Fetching for:", searchTerms);
      setResultLoading(true);

      const exploreResult = await getExploreResultGEMINI(searchTerms);

      if (cancelled) return;

      if (exploreResult !== null) {
        if (exploreResult.careers) setResultCareers(exploreResult.careers);
        if (exploreResult.prompter) setPrompter(exploreResult.prompter);
        setResultLoading(false);
      }
      console.log("Result is null");
    }

    runFetch();

    return () => {
      cancelled = true;
    };
  }, [searchTerms]);

  useEffect(() => {
    console.log(`result loading: ${resultLoading}`);
  }, [resultLoading]);

  function toggleTerms() {
    setShowTerms(!showTerms);
  }

  function seeMore(route: string, data: string) {
    //data can be obj type
    navigate(route, { state: { title: data, terms: searchTerms.join(",") } });
  }

  if (user === null) {
    return <NotSignIn />;
  }
  return (
    <div className={style.main}>
      <div className={style.input_header}>
        <h4>Start exploring&nbsp;</h4>
        <p>{prompter}</p>
      </div>

      <div className={style.searchbox}>
        <input
          type="text"
          placeholder="type to search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={style.searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSearchTerm();
            }
          }}
        />
        <div>
          <motion.button
            whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
            onClick={addSearchTerm}
            className={style.searchbtn}
          >
            search
          </motion.button>
        </div>
      </div>

      {searchTerms.length > 0 ? (
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
      ) : (
        <></>
      )}

      <motion.div
        className={`${style.terms} ${showTerms ? style.open : ""}`}
        animate={{
          maxHeight: showTerms ? "50rem" : "6rem",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        style={{
          flexWrap: showTerms ? "wrap" : "nowrap",
          overflowX: showTerms ? "hidden" : "scroll",
        }}
      >
        {searchTerms.map((term, index) => (
          <motion.div
            key={`${index}term${index}`}
            className={style.term}
            whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
          >
            <p>{term}</p>
            <button
              onClick={() => {
                removeTerm(term);
              }}
            >
              <X className={style.remove_btn} />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {(resultCareers?.length === 0 && !resultLoading) ||
      (resultCareers === null && !resultLoading) ||
      searchTerms.length === 0 ? (
        <div className={style.unsearch}>
          <img src={nothing} alt="" />
          <h4>Try searching something</h4>
        </div>
      ) : resultLoading ? (
        <div className={style.loading}>
          {user.paidGroup || user.paidPersonal ? (
            <img src={loadingImg} alt="" className={style.loadingImg} />
          ) : (
            <div className="spinner"></div>
          )}
          <p>Getting your result at light speed!</p>
        </div>
      ) : (
        <div className={style.result_wrapper}>
          <h5>Results:</h5>
          <div className={style.results}>
            {resultCareers?.map((rc, i) => (
              <button key={i} className={style.result}>
                <div className={style.left}>
                  <h5>{rc.title}</h5>
                  <p>{rc.description}</p>
                </div>
                <div
                  className={style.right}
                  onClick={() => {
                    seeMore("/seemore", rc.title);
                  }}
                >
                  see more
                </div>
              </button>
            ))}
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <button key={i} className={style.result}>
                <div className={style.left}>
                  <h5>Career {i}</h5>
                  <p>Why is it match the career thingy</p>
                </div>
                <div
                  className={style.right}
                  onClick={() => {
                    seeMore("/", "hello");
                  }}
                >
                  see more
                </div>
              </button>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
}
