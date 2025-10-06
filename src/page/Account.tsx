import {
  Bell,
  CircleUser,
  CreditCard,
  Info,
  LogOut,
  ShieldPlus,
} from "lucide-react";
import AccountItemCard from "../component/AccountItemCard";
import style from "./Account.module.css";
import UserBlock from "../component/UserBlock";
export default function Account() {
  return (
    <div className={style.main}>
      <UserBlock />
      <div className={style.body1}>
        <AccountItemCard
          menu_name="My Account"
          menu_sub="Manage Account(s)"
          Menu_icon={CircleUser}
          menu_route="/manage/account_info"
        />
        <AccountItemCard
          menu_name="Account Subscription Plan"
          menu_sub="Manage subscription plan"
          Menu_icon={CreditCard}
          menu_route="/manage/accounts"
        />
        <AccountItemCard
          menu_name="Two-Factor Authenication"
          menu_sub="Secure your account"
          Menu_icon={ShieldPlus}
          menu_route="/manage/accounts"
        />
        <AccountItemCard
          menu_name="Log out"
          menu_sub="Exit your account"
          Menu_icon={LogOut}
          menu_route="/logout"
        />
        <div className={style.divider}>
          <h4>More</h4>
        </div>
        <AccountItemCard
          menu_name="Help & Support"
          menu_sub=""
          Menu_icon={Bell}
          menu_route="/manage/accounts"
        />
        <AccountItemCard
          menu_name="About App"
          menu_sub=""
          Menu_icon={Info}
          menu_route="/manage/accounts"
        />
      </div>
    </div>
  );
}
