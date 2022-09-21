import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSlotProps } from "@mui/base";

const activeClass = ({ isActive }) => (isActive ? "activeLink" : "");

export const Header = ({ isLog, setIsLog, userName}) => {
  const handleLogIn = () => {
    setIsLog(false);
  };

  const logOut = () =>
  {
    localStorage.setItem("setIsLog", "false");
    localStorage.removeItem("UserName")
  }

  return (
    <header>
      {isLog ? (
        <div className="userLog">
        <div className="userName">
          {userName}
        </div>
        <NavLink
          to="/login"
          onClick={handleLogIn}
          className={({ isActive }) =>
            isActive ? "activeLink headerLink" : "headerLink"
          }
        >

          <LogoutIcon className="LogoutIcon" onClick={logOut}/>
        </NavLink>
        </div>
      ) : (
        <>
          <nav className="headerMenu">
            <NavLink to="/" className={activeClass}>
              {" "}
              Home{" "}
            </NavLink>
            <a href="#second">About</a>
            <a href="#third">Contact</a>
          </nav>

          <NavLink
            to="/login"
            onClick={handleLogIn}
            className={({ isActive }) =>
              isActive ? "activeLink headerLink" : "headerLink"
            }
          >
            <LoginIcon />
          </NavLink>
        </>
      )}
    </header>
  );
};
