import AppLogo from "../assets/logo_career_ask.png";
import style from "./AppbarLogo.module.css";
interface AppbarLogoProps {
  min?: boolean;
  alter?: boolean;
  smaller?: boolean;
}
export default function AppbarLogo({
  min = false,
  alter = false,
}: AppbarLogoProps) {
  return (
    <div className={style.appbarlogo}>
      {min ? <></> : <img src={AppLogo} alt="" className={style.logo} />}
      <div className={alter ? style.alter : style.title}>
        <h1>Career&nbsp;</h1>
        <h1>Ask</h1>
      </div>
    </div>
  );
}
