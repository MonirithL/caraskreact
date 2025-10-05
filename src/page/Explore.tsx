import { ChevronDown, X } from "lucide-react";
import style from "./Explore.module.css";

export default function Explore() {
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
        <button>
          <ChevronDown className={style.term_minmax} />
        </button>
      </div>

      <div className={style.terms}>
        <div className={style.term}>
          <p>Search term 1</p>
          <button>
            <X className={style.remove_btn} />
          </button>
        </div>
      </div>

      <div className={style.result_wrapper}>
        <h5>Results:</h5>
        <div className={style.results}>
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
                <div className={style.right}>see more</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
