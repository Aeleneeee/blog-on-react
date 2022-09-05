import "./Header.css";
import LoginIcon from '@mui/icons-material/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

const activeClass = ({isActive}) => isActive? 'activeLink' : '';


export const Header = () => {
  return (
    <header>
      <nav className="headerMenu">
        <NavLink to="/" className={activeClass}> Home </NavLink>
        <a href="#second">About</a>
        <a href="#third">Contact</a>
      </nav>

      <NavLink to="/login" className={({isActive}) => isActive? 'activeLink headerLink' : 'headerLink'}>
        <LoginIcon/>
      </NavLink>
    </header>
  );
};
