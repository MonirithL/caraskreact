import "./App.css";
import { Outlet, useLocation } from "react-router";
import Navbar from "./component/Navbar";
import AppbarLogo from "./component/AppbarLogo";
import AdBanner from "./component/AdComponent";
import { useUser } from "./context/UserContext";
import pattern from "./assets/pat2.jpg";
const noAuthLayoutRoutes = [
  "/manage",
  "/qna",
  "/testing",
  "/result",
  "/history",
  "/seemore",
];
const haveBgRoute = ["/seemore", "/result"];
export default function App() {
  const { user } = useUser();

  const location = useLocation();
  const hideLayout = noAuthLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const showBgLayout = haveBgRoute.some((route) =>
    location.pathname.startsWith(route)
  );
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || "";
  // capitalize first letter
  const capitalized =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  console.log("User info for AdBanner condition:", {
    paidPersonal: user?.paidPersonal,
    paidFor: user?.paidFor,
    paidGroup: user?.paidGroup,
    shouldShowAd: !user?.paidPersonal && !user?.paidFor && !user?.paidGroup,
  });
  return (
    <div className="base">
      {showBgLayout && (user?.paidPersonal || user?.paidGroup) ? (
        <div className="absFull">
          <div
            style={{
              backgroundImage: `url(${pattern})`,
              backgroundRepeat: "repeat",
            }}
            className="pattern"
          ></div>
        </div>
      ) : (
        <></>
      )}

      <div className="header">
        <div className={`appbar ${hideLayout ? "none" : ""}`}>
          <h1 className="appbar_mobile">{capitalized}</h1>
          <div className="appbar_pc">
            <AppbarLogo />
          </div>
        </div>
        <div className="navbar_pc">
          <Navbar></Navbar>
        </div>
      </div>
      {!user?.paidPersonal && !user?.paidFor && !user?.paidGroup && (
        <div className="topAd">
          <AdBanner />
        </div>
      )}
      <div className="app">
        <div className="body">
          <Outlet />
        </div>
      </div>
      {hideLayout ? (
        <></>
      ) : (
        <div className="navbar">
          <Navbar />
        </div>
      )}
    </div>
  );
}
