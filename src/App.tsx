import "./App.css";
import { Outlet, useLocation } from "react-router";
import Navbar from "./component/Navbar";
import AppbarLogo from "./component/AppbarLogo";
import AdBanner from "./component/AdComponent";

const noAuthLayoutRoutes = [
  "/manage",
  "/qna",
  "/testing",
  "/result",
  "/history",
  "/seemore",
];
export default function App() {
  const location = useLocation();
  const hideLayout = noAuthLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || "";

  // capitalize first letter
  const capitalized =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <div className="base">
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
      <div className="app">
        <div className="topAd">
          <AdBanner />
        </div>
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
