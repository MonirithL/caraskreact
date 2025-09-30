import { ChevronRight, type LucideIcon } from "lucide-react";
import style from "./AccountItemCard.module.css";
import { useNavigate } from "react-router";

interface AICProps {
  menu_name: string;
  menu_sub: string;
  menu_route: string;
  Menu_icon: LucideIcon;
}
export default function AccountItemCard({
  menu_name,
  menu_sub,
  menu_route,
  Menu_icon,
}: AICProps) {
  const navigate = useNavigate();
  return (
    <button className={style.main} onClick={() => navigate(menu_route)}>
      <div className={style.left}>
        <div className={style.icon}>
          <Menu_icon size={32} className={style.lcIcon} />
        </div>
        <div className={style.text_col}>
          <h4>{menu_name}</h4>
          <p>{menu_sub}</p>
        </div>
      </div>
      <ChevronRight />
    </button>
  );
}
