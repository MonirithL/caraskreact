import {
  CircleCheckBig,
  Compass,
  House,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router";

type NavItem = {
  icon: LucideIcon;
  text: string;
  path: string;
};
const navItems: NavItem[] = [
  { icon: House, text: "Home", path: "/home" },
  { icon: Compass, text: "Discovery", path: "/discovery" },
  { icon: Search, text: "Explore", path: "/explore" },
  { icon: CircleCheckBig, text: "Progress", path: "/progress" },
  { icon: UserRound, text: "My Account", path: "/account" },
];
export default function Navbar() {
  return (
    <div className={style.navbar_inner}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${style.navItem} ${isActive ? style.selected : ""}`
            }
          >
            <Icon className={style.icon} />
            <h2 className={style.navText}>{item.text}</h2>
          </NavLink>
        );
      })}
    </div>
  );
}
